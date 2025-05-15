import { type NextRequest, NextResponse } from "next/server"
import { images } from "@/lib/db-utils"

// GET /api/images/[id] - ดึงข้อมูลรูปภาพตาม ID
export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  try {
    const image = await images.findById(id!)
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
export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  try {
    const body = await req.json()
    const updatedImage = await images.update(id!, body)

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
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  try {
    const success = await images.delete(id!)
    if (!success) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete image:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
