"use client"

import { useEffect, useState } from "react"
import AdminNavbar from "@/components/admin/admin-navbar"
import AuthCheck from "@/components/admin/auth-check"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, FileText, Users, ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ContactData {
  id: string
  isRead: boolean
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    unreadContacts: 0,
    blogs: 0,
    testimonials: 0,
    images: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // แก้ไขฟังก์ชันใน useEffect ให้ใช้ API แทน localStorage
    const loadStats = async () => {
      try {
        setIsLoading(true)

        // โหลดข้อมูลการติดต่อ
        const contactsResponse = await fetch("/api/contacts")
        const contacts = await contactsResponse.json()

        // โหลดข้อมูลบทความ
        const blogsResponse = await fetch("/api/blogs")
        const blogs = await blogsResponse.json()

        // โหลดข้อมูลรีวิว
        const testimonialsResponse = await fetch("/api/testimonials")
        const testimonials = await testimonialsResponse.json()

        // โหลดข้อมูลรูปภาพ
        const imagesResponse = await fetch("/api/images")
        const images = await imagesResponse.json()

        // นับจำนวนข้อมูลที่ยังไม่ได้อ่าน
        const unreadContacts = contacts.filter((contact: any) => !contact.isRead).length

        setStats({
          contacts: contacts.length,
          unreadContacts,
          blogs: blogs.length,
          testimonials: testimonials.length,
          images: images.length,
        })
      } catch (error) {
        console.error("Error loading stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">แดชบอร์ด</h1>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-2 text-gray-500">กำลังโหลดข้อมูล...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">ข้อมูลการติดต่อ</CardTitle>
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.contacts}</div>
                  <p className="text-xs text-gray-500">รายการ</p>
                  {stats.unreadContacts > 0 && (
                    <Badge variant="destructive" className="mt-2">
                      ยังไม่ได้อ่าน {stats.unreadContacts} รายการ
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">บทความ</CardTitle>
                  <FileText className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.blogs}</div>
                  <p className="text-xs text-gray-500">รายการ</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">รีวิวจากลูกค้า</CardTitle>
                  <Users className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.testimonials}</div>
                  <p className="text-xs text-gray-500">รายการ</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">รูปภาพ</CardTitle>
                  <ImageIcon className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.images}</div>
                  <p className="text-xs text-gray-500">รายการ</p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>คำแนะนำการใช้งาน</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    ใช้เมนู <strong>ข้อมูลการติดต่อ</strong> เพื่อดูข้อมูลที่ลูกค้าส่งมาจากฟอร์มติดต่อ
                  </li>
                  <li>
                    ใช้เมนู <strong>จัดการบทความ</strong> เพื่อเพิ่ม แก้ไข หรือลบบทความ
                  </li>
                  <li>
                    ใช้เมนู <strong>จัดการรีวิว</strong> เพื่อเพิ่ม แก้ไข หรือลบรีวิวจากลูกค้า
                  </li>
                  <li>
                    ใช้เมนู <strong>จัดการรูปภาพ</strong> เพื่อเพิ่ม แก้ไข หรือลบรูปภาพในเว็บไซต์
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}
