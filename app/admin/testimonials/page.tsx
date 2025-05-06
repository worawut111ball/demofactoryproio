"use client"

import type React from "react"

import { useEffect, useState } from "react"
import AdminNavbar from "@/components/admin/admin-navbar"
import AuthCheck from "@/components/admin/auth-check"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, Edit, Plus, Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

interface TestimonialData {
  id: string
  content: string
  author: string
  position: string
  company: string
  rating: number
  avatarUrl?: string
  fullContent?: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialData | null>(null)
  const [formData, setFormData] = useState({
    content: "",
    fullContent: "",
    author: "",
    position: "",
    company: "",
    rating: "5",
    avatarUrl: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // แก้ไขฟังก์ชัน loadTestimonials ให้ใช้ API แทน localStorage
  const loadTestimonials = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/testimonials")

      if (!response.ok) {
        throw new Error("Failed to fetch testimonials")
      }

      const data = await response.json()
      console.log("Loaded testimonials:", data)
      setTestimonials(data)
    } catch (error) {
      console.error("Error loading testimonials:", error)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลรีวิวได้",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // แก้ไขฟังก์ชัน handleAddTestimonial ให้ใช้ API แทน localStorage
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding testimonial with data:", formData)

    try {
      const newTestimonial = {
        content: formData.content,
        fullContent: formData.fullContent || formData.content,
        author: formData.author,
        position: formData.position,
        company: formData.company,
        rating: Number.parseInt(formData.rating, 10),
        avatarUrl:
          formData.avatarUrl ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HuDmy3KyMHyfqQPMn0fPE58Rn36Z50.png",
      }

      console.log("New testimonial object:", newTestimonial)

      // ส่งข้อมูลไปยัง API
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTestimonial),
      })

      if (!response.ok) {
        throw new Error("Failed to create testimonial")
      }

      // รีเซ็ตฟอร์ม
      setFormData({
        content: "",
        fullContent: "",
        author: "",
        position: "",
        company: "",
        rating: "5",
        avatarUrl: "",
      })

      setIsAddDialogOpen(false)
      loadTestimonials() // โหลดข้อมูลใหม่หลังจากเพิ่มข้อมูล

      toast({
        title: "สำเร็จ",
        description: "เพิ่มรีวิวเรียบร้อยแล้ว",
      })
    } catch (error) {
      console.error("Error adding testimonial:", error)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเพิ่มรีวิวได้: " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      })
    }
  }

  // แก้ไขฟังก์ชัน handleEditTestimonial ให้ใช้ API แทน localStorage
  const handleEditTestimonial = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentTestimonial) return

    try {
      const updatedTestimonial = {
        content: formData.content,
        fullContent: formData.fullContent || formData.content,
        author: formData.author,
        position: formData.position,
        company: formData.company,
        rating: Number.parseInt(formData.rating, 10),
        avatarUrl:
          formData.avatarUrl ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HuDmy3KyMHyfqQPMn0fPE58Rn36Z50.png",
      }

      // ส่งข้อมูลไปยัง API
      const response = await fetch(`/api/testimonials/${currentTestimonial.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTestimonial),
      })

      if (!response.ok) {
        throw new Error("Failed to update testimonial")
      }

      loadTestimonials()

      setIsEditDialogOpen(false)
      toast({
        title: "สำเร็จ",
        description: "แก้ไขรีวิวเรียบร้อยแล้ว",
      })
    } catch (error) {
      console.error("Error updating testimonial:", error)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถแก้ไขรีวิวได้",
        variant: "destructive",
      })
    }
  }

  // แก้ไขฟังก์ชัน handleDelete ให้ใช้ API แทน localStorage
  const handleDelete = async (id: string) => {
    if (confirm("คุณต้องการลบรีวิวนี้ใช่หรือไม่?")) {
      try {
        const response = await fetch(`/api/testimonials/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete testimonial")
        }

        loadTestimonials()
        toast({
          title: "สำเร็จ",
          description: "ลบรีวิวเรียบร้อยแล้ว",
        })
      } catch (error) {
        console.error("Error deleting testimonial:", error)
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถลบรีวิวได้",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (testimonial: TestimonialData) => {
    setCurrentTestimonial(testimonial)
    setFormData({
      content: testimonial.content,
      fullContent: testimonial.fullContent || testimonial.content,
      author: testimonial.author,
      position: testimonial.position,
      company: testimonial.company,
      rating: testimonial.rating.toString(),
      avatarUrl: testimonial.avatarUrl || "",
    })
    setIsEditDialogOpen(true)
  }

  const openAddDialog = () => {
    // รีเซ็ตฟอร์มก่อนเปิด dialog
    setFormData({
      content: "",
      fullContent: "",
      author: "",
      position: "",
      company: "",
      rating: "5",
      avatarUrl: "",
    })
    setIsAddDialogOpen(true)
  }

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">จัดการรีวิวจากลูกค้า</h1>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              เพิ่มรีวิวใหม่
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>รายการรีวิวจากลูกค้า</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-600 border-r-transparent"></div>
                  <p className="mt-2 text-gray-500">กำลังโหลดข้อมูล...</p>
                </div>
              ) : testimonials.length === 0 ? (
                <div className="text-center py-8 text-gray-500">ไม่พบรีวิวจากลูกค้า</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ลูกค้า</TableHead>
                        <TableHead>ตำแหน่ง</TableHead>
                        <TableHead>บริษัท</TableHead>
                        <TableHead>คะแนน</TableHead>
                        <TableHead>ข้อความรีวิว</TableHead>
                        <TableHead className="text-right">จัดการ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testimonials.map((testimonial) => (
                        <TableRow key={testimonial.id}>
                          <TableCell className="font-medium">{testimonial.author}</TableCell>
                          <TableCell>{testimonial.position}</TableCell>
                          <TableCell>{testimonial.company}</TableCell>
                          <TableCell>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{testimonial.content}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(testimonial)}
                                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(testimonial.id)}
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

      {/* Dialog สำหรับเพิ่มรีวิว */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>เพิ่มรีวิวใหม่</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddTestimonial} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="content">ข้อความรีวิว (แสดงในการ์ด)</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="กรอกข้อความรีวิวสั้นๆ สำหรับแสดงในการ์ด"
                required
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullContent">ข้อความรีวิวเต็ม (แสดงในโมดัล)</Label>
              <Textarea
                id="fullContent"
                name="fullContent"
                value={formData.fullContent}
                onChange={handleInputChange}
                placeholder="กรอกข้อความรีวิวเต็มสำหรับแสดงในโมดัล (ถ้าไม่กรอก จะใช้ข้อความเดียวกับด้านบน)"
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">ชื่อลูกค้า</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="กรอกชื่อลูกค้า"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">ตำแหน่ง</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="เช่น CEO, ผู้จัดการ"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">บริษัท</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="กรอกชื่อบริษัท"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>คะแนน</Label>
              <RadioGroup
                name="rating"
                value={formData.rating}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, rating: value }))}
                className="flex space-x-4"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex items-center space-x-1">
                    <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="flex items-center">
                      {rating} <Star className="h-4 w-4 ml-1 text-amber-400" />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">URL รูปภาพ (ถ้ามี)</Label>
              <Input
                id="avatarUrl"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleInputChange}
                placeholder="ใส่ URL รูปภาพ (ถ้าไม่ระบุจะใช้รูปตัวอย่าง)"
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

      {/* Dialog สำหรับแก้ไขรีวิว */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>แก้ไขรีวิว</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditTestimonial} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-content">ข้อความรีวิว (แสดงในการ์ด)</Label>
              <Textarea
                id="edit-content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="กรอกข้อความรีวิวสั้นๆ สำหรับแสดงในการ์ด"
                required
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-fullContent">ข้อความรีวิวเต็ม (แสดงในโมดัล)</Label>
              <Textarea
                id="edit-fullContent"
                name="fullContent"
                value={formData.fullContent}
                onChange={handleInputChange}
                placeholder="กรอกข้อความรีวิวเต็มสำหรับแสดงในโมดัล (ถ้าไม่กรอก จะใช้ข้อความเดียวกับด้านบน)"
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-author">ชื่อลูกค้า</Label>
              <Input
                id="edit-author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="กรอกชื่อลูกค้า"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-position">ตำแหน่ง</Label>
                <Input
                  id="edit-position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="เช่น CEO, ผู้จัดการ"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-company">บริษัท</Label>
                <Input
                  id="edit-company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="กรอกชื่อบริษัท"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>คะแนน</Label>
              <RadioGroup
                name="rating"
                value={formData.rating}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, rating: value }))}
                className="flex space-x-4"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex items-center space-x-1">
                    <RadioGroupItem value={rating.toString()} id={`edit-rating-${rating}`} />
                    <Label htmlFor={`edit-rating-${rating}`} className="flex items-center">
                      {rating} <Star className="h-4 w-4 ml-1 text-amber-400" />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-avatarUrl">URL รูปภาพ (ถ้ามี)</Label>
              <Input
                id="edit-avatarUrl"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleInputChange}
                placeholder="ใส่ URL รูปภาพ (ถ้าไม่ระบุจะใช้รูปตัวอย่าง)"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                ยกเลิก
              </Button>
              <Button type="submit">บันทึก</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AuthCheck>
  )
}
