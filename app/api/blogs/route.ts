import { type NextRequest, NextResponse } from "next/server"
import { blogs } from "@/lib/db-utils"

// GET /api/blogs - ดึงข้อมูลบทความทั้งหมด
export async function GET() {
  try {
    const data = await blogs.findAll()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

// POST /api/blogs - เพิ่มข้อมูลบทความใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // สร้างข้อมูลใหม่
    const newBlog = {
      title: body.title,
      excerpt: body.excerpt,
      fullContent: body.fullContent || body.excerpt,
      imageUrl: body.imageUrl || "/placeholder.svg?height=300&width=500",
      date: new Date(), // ใช้วันที่ปัจจุบัน
      readTime: body.readTime || "5 นาที",
      category: body.category,
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-"),
    }

    // เพิ่มข้อมูลใหม่
    const blog = await blogs.create(newBlog)
    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error("Failed to create blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
