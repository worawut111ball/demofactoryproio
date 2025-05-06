import { type NextRequest, NextResponse } from "next/server"
import { images } from "@/lib/db-utils"

// GET /api/images - ดึงข้อมูลรูปภาพทั้งหมด
export async function GET() {
  try {
    const data = await images.findAll()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch images:", error)
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 })
  }
}

// POST /api/images - เพิ่มรูปภาพใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // สร้างข้อมูลใหม่
    const newImage = {
      url: body.url,
      title: body.title,
      description: body.description,
      date: new Date(), // ใช้วันที่ปัจจุบัน
    }

    // เพิ่มข้อมูลใหม่
    const image = await images.create(newImage)
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error("Failed to create image:", error)
    return NextResponse.json({ error: "Failed to create image" }, { status: 500 })
  }
}
