import { type NextRequest, NextResponse } from "next/server"
import { blogs } from "@/lib/db-utils"
import { writeFile } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { parseFormData } from "@/lib/parse-formdata"
import * as fs from "fs"
import { prisma } from "@/lib/prisma"

export const config = {
  api: {
    bodyParser: false,
  },
  runtime: "nodejs",
}

// GET /api/blogs/[id]

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PATCH /api/blogs/[id]
export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop()
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 })
  }

  function getField(val: string | string[] | undefined): string {
    if (Array.isArray(val)) return val[0]
    return val || ""
  }

  try {
    const formData = await parseFormData(req)

    const title = getField(formData.fields.title)
    const excerpt = getField(formData.fields.excerpt)
    const fullContent = getField(formData.fields.fullContent)
    const category = getField(formData.fields.category)
    const readTime = getField(formData.fields.readTime)
    const slug = getField(formData.fields.slug)
    const existingImages = formData.fields.existingImages || []

    const files = formData.files?.images || []
    const fileList = Array.isArray(files) ? files : [files]
    const savedImages: { url: string }[] = []

    for (const file of fileList) {
      const fileExt = path.extname(file.originalFilename || "")
      const fileName = `${uuidv4()}${fileExt}`
      const filePath = path.join(process.cwd(), "public/uploads", fileName)
      const fileBuffer = await fs.promises.readFile(file.filepath)
      await writeFile(filePath, fileBuffer)
      savedImages.push({ url: `/uploads/${fileName}` })
    }

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    const imagesToDelete = (existingBlog.images || []).filter(
      (img) => !existingImages.includes(img.url)
    )

    for (const img of imagesToDelete) {
      const filePath = path.join(process.cwd(), "public", img.url)
      await fs.promises.unlink(filePath).catch(() =>
        console.error(`Failed to delete ${filePath}`)
      )
    }

    const existingImageList = Array.isArray(existingImages)
      ? existingImages.map((url) => ({ url }))
      : [{ url: existingImages }]

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        excerpt,
        fullContent,
        category,
        readTime,
        slug,
        imageUrl: (existingImageList[0] || savedImages[0])?.url || "/placeholder.svg",
        images: {
          deleteMany: {},
          createMany: {
            data: [...existingImageList, ...savedImages],
          },
        },
      },
      include: { images: true },
    })

    console.log("🚀 Updated blog:", updatedBlog)
    return NextResponse.json(updatedBlog)
  } catch (error) {
    console.error("Failed to update blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

// DELETE /api/blogs/[id]
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    // ดึงข้อมูลบทความและรูปภาพ
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // ลบไฟล์รูปภาพจากระบบไฟล์
    for (const img of blog.images) {
      const filePath = path.join(process.cwd(), "public", img.url);
      await fs.promises.unlink(filePath).catch(() =>
        console.error(` Failed to delete image file: ${filePath}`)
      );
    }

    // ลบบทความออกจากฐานข้อมูล
    await prisma.blog.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
