import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"

// Secret key for JWT signing (ควรเก็บใน environment variables)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

// JWT expiration time
const JWT_EXPIRATION = "24h"

// Generate JWT token
export async function signJwtToken(payload: any): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET)
}

// Verify JWT token
export async function verifyJwtToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

// Set JWT token in cookies
export function setAuthCookie(token: string): void {
  cookies().set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 hours
  })
}

// Get JWT token from cookies or headers
export function getAuthToken(req?: NextRequest): string | null {
  // For API routes with NextRequest
  if (req) {
    const authHeader = req.headers.get("authorization")
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7)
    }

    // Try to get from cookies
    const token = req.cookies.get("auth_token")?.value
    return token || null
  }

  // For server components
  return cookies().get("auth_token")?.value || null
}

// Remove auth cookie
export function removeAuthCookie(): void {
  cookies().delete("auth_token")
}

// Middleware to check if user is authenticated
export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = getAuthToken(req)
  if (!token) return false

  const payload = await verifyJwtToken(token)
  return !!payload
}

// Helper function to create authenticated response
export function createAuthResponse(data: any, status = 200): NextResponse {
  return NextResponse.json(data, { status })
}

// Helper function to create error response
export function createErrorResponse(message: string, status = 400): NextResponse {
  return NextResponse.json({ error: message }, { status })
}
