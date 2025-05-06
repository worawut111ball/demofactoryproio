import { type NextRequest, NextResponse } from "next/server"
import { blogs } from "@/lib/db-utils"

// GET /api/blogs/[id] - ดึงข้อมูลบทความตาม ID
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const blog = await blogs.findById(params.id)

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Failed to fetch blog:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

// PATCH /api/blogs/[id] - อัปเดตข้อมูลบทความ
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedBlog = await blogs.update(params.id, body)

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(updatedBlog)
  } catch (error) {
    console.error("Failed to update blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

// DELETE /api/blogs/[id] - ลบข้อมูลบทความ
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await blogs.delete(params.id)

    if (!success) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
