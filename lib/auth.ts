import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")
const JWT_EXPIRATION = "24h"

// สร้าง JWT
export async function signJwtToken(payload: any): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET)
}

// ตรวจสอบ JWT
export async function verifyJwtToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

// ตั้งค่า auth cookie
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 ชั่วโมง
  });
}

// อ่าน token จาก cookie หรือ header
export async function getAuthToken(req?: NextRequest): Promise<string | null> {
  if (req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }

    const token = req.cookies.get("auth_token")?.value;
    return token || null;
  }

  // สำหรับ server component
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value || null;
}


// ลบ cookie
export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

// ตรวจสอบว่า login อยู่ไหม
export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = await getAuthToken(req)
  if (!token) return false
  const payload = await verifyJwtToken(token)
  return !!payload
}

// helper สร้าง response
export function createAuthResponse(data: any, status = 200): NextResponse {
  return NextResponse.json(data, { status })
}

// helper สำหรับ error
export function createErrorResponse(message: string, status = 400): NextResponse {
  return NextResponse.json({ error: message }, { status })
}
