"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// แก้ไข interface โดยเพิ่ม fullContent
interface BlogCardProps {
  title: string
  excerpt: string
  imageUrl: string
  date: string
  readTime: string
  category: string
  slug: string
  fullContent?: string
}

export default function BlogCard({
  title,
  excerpt,
  imageUrl,
  date,
  readTime,
  category,
  slug,
  fullContent,
}: BlogCardProps) {
  // เพิ่ม state สำหรับควบคุมการเปิด/ปิด Modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // ตรวจสอบว่า imageUrl มีค่าหรือไม่ และกำหนดค่าเริ่มต้นถ้าไม่มี
  const imageSrc = imageUrl || "/placeholder.svg?height=300&width=500"

  // ใช้ fullContent ถ้ามี หรือใช้ excerpt ถ้าไม่มี
  const displayFullContent = fullContent || excerpt

  console.log("Blog card image URL:", imageSrc)

  return (
    <>
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative h-40 sm:h-48 w-full">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              console.error("Error loading image:", imageSrc)
              // ถ้าโหลดรูปไม่สำเร็จ ให้ใช้รูป placeholder แทน
              e.currentTarget.src = "/placeholder.svg?height=300&width=500"
            }}
          />
        </div>
        <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs w-fit">{category}</Badge>
            <div className="flex items-center text-gray-500 text-xs">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>{date}</span>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3 flex-grow">{excerpt}</p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-gray-500 text-xs">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>{readTime}</span>
            </div>
            {/* เปลี่ยนจาก Link เป็น button ที่เปิด Modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              อ่านเพิ่มเติม
            </button>
          </div>
        </CardContent>
      </Card>

      {/* เพิ่ม Modal สำหรับแสดงเนื้อหาบทความเต็ม */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          </DialogHeader>

          <div className="relative h-64 sm:h-80 w-full mb-4">
            <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover rounded-md" />
          </div>

          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{category}</Badge>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{date}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            {displayFullContent.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
