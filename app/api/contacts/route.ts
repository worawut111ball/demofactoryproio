import { type NextRequest, NextResponse } from "next/server"
import { contacts } from "@/lib/db-utils"

// GET /api/contacts - ดึงข้อมูลการติดต่อทั้งหมด
export async function GET() {
  try {
    const data = await contacts.findAll()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

// POST /api/contacts - เพิ่มข้อมูลการติดต่อใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // สร้างข้อมูลใหม่
    const newContact = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      company: body.company,
      position: body.position,
      isRead: false,
      // ใช้วันที่ปัจจุบัน โดย Prisma จะแปลงเป็น UTC ให้เอง
      date: new Date(),
    }

    // เพิ่มข้อมูลใหม่
    const contact = await contacts.create(newContact)
    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error("Failed to create contact:", error)
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 })
  }
}
