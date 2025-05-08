import { type NextRequest, NextResponse } from "next/server"
import { blogs } from "@/lib/db-utils"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { prisma } from "@/lib/prisma";

// GET: ดึง blog พร้อมภาพทั้งหมด
export async function GET() {
  try {
    const data = await prisma.blog.findMany({
      include: { images: true },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST: ใหม่ รองรับ multipart/form-data
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const images = formData.getAll("images") as File[];
    console.log(" Received images (raw):", images);

    images.forEach((img, i) => {
      console.log(`image[${i}]:`, {
        name: (img as File).name,
        type: (img as File).type,
        size: (img as File).size,
        isFunction: typeof (img as File).arrayBuffer === "function"
      });
    });


    console.log(" All formData entries:");
    for (const pair of formData.entries()) {
      console.log(`• ${pair[0]}:`, pair[1]);
    }

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const fullContent = (formData.get("fullContent") as string) || excerpt;
    const readTime = (formData.get("readTime") as string) || "5 นาที";
    const category = formData.get("category") as string;
    const slug =
      (formData.get("slug") as string) || title.toLowerCase().replace(/\s+/g, "-");

    if (!title || !excerpt) {
      return NextResponse.json(
        { error: "Title and excerpt are required" },
        { status: 400 }
      );
    }


    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "No images uploaded" },
        { status: 400 }
      );
    }
    const uploadedUrls: string[] = [];

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    // Create the upload directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true }).catch((error) => {
      console.error("Failed to create upload directory:", error);
      return NextResponse.json(
        { error: "Failed to create upload directory" },
        { status: 500 }
      );
    });

    for (const image of images) {
      if (typeof image.arrayBuffer !== "function") {
        console.error("Invalid file object:", image);
        return NextResponse.json(
          { error: "Invalid file object" },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = `${Date.now()}-${image.name}`;
      const filepath = path.join(uploadDir, filename);
      console.log("💾 กำลังบันทึกไฟล์:", filename, "→", filepath);
      console.log("✅ บันทึกไฟล์สำเร็จ:", filename);

      try {
        await writeFile(filepath, buffer);
        uploadedUrls.push(`/uploads/${filename}`);
      } catch (error) {
        console.error(`Failed to save image: ${filename}`, error);
        return NextResponse.json(
          { error: "Failed to save image" },
          { status: 500 }
        );
      }
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        excerpt,
        fullContent,
        readTime,
        category,
        slug,
        date: new Date(),
        imageUrl: uploadedUrls[0] || "/placeholder.svg",
        images: {
          createMany: {
            data: uploadedUrls.map((url) => ({ url })),
          },
        },
      },
      include: { images: true },
    });

    return NextResponse.json({
      id: blog.id,
      title: blog.title,
      images: blog.images,
      message: "Blog created successfully",
    }, { status: 201 });
  } catch (error) {
    console.error("Failed to create blog with images:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
