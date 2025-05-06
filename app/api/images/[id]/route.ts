import { type NextRequest, NextResponse } from "next/server"
import { images } from "@/lib/db-utils"

// GET /api/images/[id] - ดึงข้อมูลรูปภาพตาม ID
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const image = await images.findById(params.id)

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    return NextResponse.json(image)
  } catch (error) {
    console.error("Failed to fetch image:", error)
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
  }
}

// PATCH /api/images/[id] - อัปเดตข้อมูลรูปภาพ
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedImage = await images.update(params.id, body)

    if (!updatedImage) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    return NextResponse.json(updatedImage)
  } catch (error) {
    console.error("Failed to update image:", error)
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 })
  }
}

// DELETE /api/images/[id] - ลบข้อมูลรูปภาพ
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await images.delete(params.id)

    if (!success) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete image:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
