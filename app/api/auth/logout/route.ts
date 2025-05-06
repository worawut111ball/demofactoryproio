import { type NextRequest, NextResponse } from "next/server"
import { removeAuthCookie } from "@/lib/auth"

// POST /api/auth/logout - ออกจากระบบ
export async function POST(_request: NextRequest) {
  try {
    removeAuthCookie()
    return NextResponse.json({ success: true, message: "Logout successful" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
