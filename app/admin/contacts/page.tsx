"use client"

import { useEffect, useState } from "react"
import AdminNavbar from "@/components/admin/admin-navbar"
import AuthCheck from "@/components/admin/auth-check"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, Eye, EyeOff, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface ContactData {
  id: string
  name: string
  phone: string
  email: string
  company: string
  position: string
  date: string | Date
  isRead: boolean
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactData[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // ฟังก์ชันสำหรับโหลดข้อมูลการติดต่อ
  const loadContacts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/contacts")

      if (!response.ok) {
        throw new Error("Failed to fetch contacts")
      }

      const data = await response.json()

      // แปลงวันที่เป็นฟอร์แมตที่ต้องการ
      const formattedData = data.map((contact: ContactData) => ({
        ...contact,
        date: new Date(contact.date).toLocaleDateString("th-TH", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      }))

      // เรียงลำดับข้อมูลจากใหม่ไปเก่า
      const sortedData = [...formattedData].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })

      setContacts(sortedData)

      // นับจำนวนข้อมูลที่ยังไม่ได้อ่าน
      const unread = sortedData.filter((contact) => !contact.isRead).length
      setUnreadCount(unread)
    } catch (error) {
      console.error("Error loading contacts:", error)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลการติดต่อได้",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
      try {
        const response = await fetch(`/api/contacts/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete contact")
        }

        loadContacts()
        toast({
          title: "สำเร็จ",
          description: "ลบข้อมูลสำเร็จ",
        })
      } catch (error) {
        console.error("Error deleting contact:", error)
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถลบข้อมูลได้",
          variant: "destructive",
        })
      }
    }
  }

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isRead: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update contact")
      }

      loadContacts()
    } catch (error) {
      console.error("Error updating contact:", error)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัปเดตสถานะการอ่านได้",
        variant: "destructive",
      })
    }
  }

  const markAllAsRead = async () => {
    if (unreadCount === 0) return

    if (confirm("คุณต้องการทำเครื่องหมายว่าอ่านแล้วทั้งหมดใช่หรือไม่?")) {
      try {
        // ทำการอัปเดตทุกรายการที่ยังไม่ได้อ่าน
        const promises = contacts
          .filter((contact) => !contact.isRead)
          .map((contact) =>
            fetch(`/api/contacts/${contact.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ isRead: true }),
            }),
          )

        await Promise.all(promises)
        loadContacts()

        toast({
          title: "สำเร็จ",
          description: "ทำเครื่องหมายว่าอ่านแล้วทั้งหมดเรียบร้อยแล้ว",
        })
      } catch (error) {
        console.error("Error marking all as read:", error)
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถอัปเดตสถานะการอ่านได้",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">ข้อมูลการติดต่อ</h1>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-4 flex items-center">
                  <Bell className="h-3 w-3 mr-1" />
                  ยังไม่ได้อ่าน {unreadCount} รายการ
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <Eye className="mr-2 h-4 w-4" />
                ทำเครื่องหมายว่าอ่านแล้วทั้งหมด
              </Button>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>รายการข้อมูลการติดต่อ</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-600 border-r-transparent"></div>
                  <p className="mt-2 text-gray-500">กำลังโหลดข้อมูล...</p>
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">ไม่พบข้อมูลการติดต่อ</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>สถานะ</TableHead>
                        <TableHead>วันที่</TableHead>
                        <TableHead>ชื่อ</TableHead>
                        <TableHead>เบอร์โทร</TableHead>
                        <TableHead>อีเมล</TableHead>
                        <TableHead>บริษัท</TableHead>
                        <TableHead>ตำแหน่ง</TableHead>
                        <TableHead className="text-right">จัดการ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow key={contact.id} className={!contact.isRead ? "bg-blue-50" : ""}>
                          <TableCell>
                            <Badge variant={contact.isRead ? "outline" : "default"}>
                              {contact.isRead ? "อ่านแล้ว" : "ยังไม่ได้อ่าน"}
                            </Badge>
                          </TableCell>
                          <TableCell>{contact.date}</TableCell>
                          <TableCell>{contact.name}</TableCell>
                          <TableCell>{contact.phone}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.company}</TableCell>
                          <TableCell>{contact.position}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleReadStatus(contact.id, contact.isRead)}
                                className={contact.isRead ? "text-gray-500" : "text-blue-500"}
                                title={contact.isRead ? "ทำเครื่องหมายว่ายังไม่ได้อ่าน" : "ทำเครื่องหมายว่าอ่านแล้ว"}
                              >
                                {contact.isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(contact.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthCheck>
  )
}
