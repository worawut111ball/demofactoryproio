import { type NextRequest, NextResponse } from "next/server"
import { blogs } from "@/lib/db-utils"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

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

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const fullContent = (formData.get("fullContent") as string) || excerpt;
    const readTime = (formData.get("readTime") as string) || "5 นาที";
    const category = formData.get("category") as string;
    const slug =
      (formData.get("slug") as string) || title.toLowerCase().replace(/\s+/g, "-");

    const images = formData.getAll("images") as File[];
    const uploadedUrls: string[] = [];

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    for (const image of images) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = `${Date.now()}-${image.name}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      uploadedUrls.push(`/uploads/${filename}`);
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

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Failed to create blog with images:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
