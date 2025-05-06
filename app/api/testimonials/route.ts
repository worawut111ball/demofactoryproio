import { type NextRequest, NextResponse } from "next/server"
import { testimonials } from "@/lib/db-utils"

// GET /api/testimonials - ดึงข้อมูลรีวิวทั้งหมด
export async function GET() {
  try {
    const data = await testimonials.findAll()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

// POST /api/testimonials - เพิ่มรีวิวใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // สร้างข้อมูลใหม่
    const newTestimonial = {
      content: body.content,
      fullContent: body.fullContent || body.content,
      author: body.author,
      position: body.position,
      company: body.company,
      rating: Number.parseInt(body.rating),
      avatarUrl: body.avatarUrl || "/placeholder.svg?height=50&width=50",
    }

    // เพิ่มข้อมูลใหม่
    const testimonial = await testimonials.create(newTestimonial)
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error("Failed to create testimonial:", error)
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
