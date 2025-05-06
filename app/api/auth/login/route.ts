import type { NextRequest } from "next/server"
import { signJwtToken, setAuthCookie, createAuthResponse, createErrorResponse } from "@/lib/auth"

// POST /api/auth/login - เข้าสู่ระบบ admin
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // ในตัวอย่างนี้ใช้รหัสผ่านง่ายๆ คือ "admin123"
    // ในระบบจริงควรใช้วิธีที่ปลอดภัยกว่านี้ เช่น เก็บ hash ของรหัสผ่านในฐานข้อมูล
    if (password === "admin123") {
      // สร้าง JWT token
      const token = await signJwtToken({ role: "admin" })

      // เก็บ token ใน cookie
      setAuthCookie(token)

      return createAuthResponse({ success: true, message: "Login successful" })
    } else {
      return createErrorResponse("Invalid password", 401)
    }
  } catch (error) {
    console.error("Login error:", error)
    return createErrorResponse("Login failed", 500)
  }
}
