import type { NextRequest } from "next/server"
import { isAuthenticated, createAuthResponse, createErrorResponse } from "@/lib/auth"

// GET /api/auth/check - ตรวจสอบสถานะการล็อกอิน
export async function GET(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated(request)

    if (authenticated) {
      return createAuthResponse({ authenticated: true })
    } else {
      return createErrorResponse("Not authenticated", 401)
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return createErrorResponse("Authentication check failed", 500)
  }
}
