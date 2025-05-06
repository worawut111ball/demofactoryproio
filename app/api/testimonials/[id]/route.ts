import { type NextRequest, NextResponse } from "next/server"
import { testimonials } from "@/lib/db-utils"

// GET /api/testimonials/[id] - ดึงข้อมูลรีวิวตาม ID
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const testimonial = await testimonials.findById(params.id)

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("Failed to fetch testimonial:", error)
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 })
  }
}

// PATCH /api/testimonials/[id] - อัปเดตข้อมูลรีวิว
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedTestimonial = await testimonials.update(params.id, body)

    if (!updatedTestimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json(updatedTestimonial)
  } catch (error) {
    console.error("Failed to update testimonial:", error)
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

// DELETE /api/testimonials/[id] - ลบข้อมูลรีวิว
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await testimonials.delete(params.id)

    if (!success) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete testimonial:", error)
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}
