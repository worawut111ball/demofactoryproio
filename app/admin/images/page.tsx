"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import AdminNavbar from "@/components/admin/admin-navbar"
import AuthCheck from "@/components/admin/auth-check"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Copy, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ImageData {
  id: string
  url: string
  title: string
  description: string
  date: string
}

export default function ImagesPage() {
  const [images, setImages] = useState<ImageData[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    description: "",
  })
  const [copied, setCopied] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // แก้ไขฟังก์ชัน loadImages ให้ใช้ API แทน localStorage
  const loadImages = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/images")

      if (!response.ok) {
        throw new Error("Failed to fetch images")
      }

      const data = await response.json()
      console.log("Loaded images:", data)
      setImages(data)
    } catch (error) {
      console.error("Error loading images:", error)
      alert("ไม่สามารถโหลดข้อมูลรูปภาพได้")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadImages()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // แก้ไขฟังก์ชัน handleAddImage ให้ใช้ API แทน localStorage
  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const newImage = {
        url: formData.url,
        title: formData.title,
        description: formData.description,
      }

      // ส่งข้อมูลไปยัง API
      const response = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newImage),
      })

      if (!response.ok) {
        throw new Error("Failed to create image")
      }

      // รีเซ็ตฟอร์ม
      setFormData({
        url: "",
        title: "",
        description: "",
      })

      setIsAddDialogOpen(false)
      loadImages() // โหลดข้อมูลใหม่หลังจากเพิ่มข้อมูล

      alert("เพิ่มรูปภาพสำเร็จ")
    } catch (error) {
      console.error("Error adding image:", error)
      alert("ไม่สามารถเพิ่มรูปภาพได้")
    }
  }

  // แก้ไขฟังก์ชัน handleDelete ให้ใช้ API แทน localStorage
  const handleDelete = async (id: string) => {
    if (confirm("คุณต้องการลบรูปภาพนี้ใช่หรือไม่?")) {
      try {
        const response = await fetch(`/api/images/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete image")
        }

        loadImages()
        alert("ลบรูปภาพสำเร็จ")
      } catch (error) {
        console.error("Error deleting image:", error)
        alert("ไม่สามารถลบรูปภาพได้")
      }
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">จัดการรูปภาพ</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  เพิ่มรูปภาพใหม่
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>เพิ่มรูปภาพใหม่</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddImage} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">URL รูปภาพ</Label>
                    <Input
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="ใส่ URL รูปภาพ"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">ชื่อรูปภาพ</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="กรอกชื่อรูปภาพ"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">คำอธิบาย</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="กรอกคำอธิบายรูปภาพ"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      ยกเลิก
                    </Button>
                    <Button type="submit">บันทึก</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>รายการรูปภาพ</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-600 border-r-transparent"></div>
                  <p className="mt-2 text-gray-500">กำลังโหลดข้อมูล...</p>
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-8 text-gray-500">ไม่พบรูปภาพ</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image) => (
                    <Card key={image.id} className="overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image src={image.url || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{image.date}</p>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{image.description}</p>
                        <div className="flex justify-between items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(image.url)}
                            className="text-blue-600"
                          >
                            {copied === image.url ? (
                              <>
                                <Check className="mr-1 h-4 w-4" /> คัดลอกแล้ว
                              </>
                            ) : (
                              <>
                                <Copy className="mr-1 h-4 w-4" /> คัดลอก URL
                              </>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(image.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="mr-1 h-4 w-4" /> ลบ
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthCheck>
  )
}
