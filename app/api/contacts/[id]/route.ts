import { type NextRequest, NextResponse } from "next/server"
import { contacts } from "@/lib/db-utils"

// GET /api/contacts/[id] - ดึงข้อมูลการติดต่อตาม ID
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contact = await contacts.findById(params.id)

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error("Failed to fetch contact:", error)
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 })
  }
}

// PATCH /api/contacts/[id] - อัปเดตข้อมูลการติดต่อ
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedContact = await contacts.update(params.id, body)

    if (!updatedContact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json(updatedContact)
  } catch (error) {
    console.error("Failed to update contact:", error)
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 })
  }
}

// DELETE /api/contacts/[id] - ลบข้อมูลการติดต่อ
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await contacts.delete(params.id)

    if (!success) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete contact:", error)
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 })
  }
}
