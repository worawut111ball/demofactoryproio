"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import Image from "next/image"

// Import Dialog components
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

// Update the interface to include the full content
interface TestimonialCardProps {
  content: string
  author: string
  position: string
  company: string
  rating: number
  avatarUrl?: string
  id?: string
  fullContent?: string // Add this for the full content in the modal
}

// Replace the existing TestimonialCard function with this updated version
export default function TestimonialCard({
  content,
  author,
  position,
  company,
  rating,
  avatarUrl,
  id = "1",
  fullContent,
}: TestimonialCardProps) {
  // Add state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Use the fullContent if provided, otherwise use the regular content
  const displayFullContent = fullContent || content

  return (
    <>
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-[450px] flex flex-col overflow-hidden">
        {/* รูปภาพด้านบนเหมือนบทความ */}
        <div className="relative h-40 sm:h-48 w-full">
          <Image
            src={
              avatarUrl ||
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HuDmy3KyMHyfqQPMn0fPE58Rn36Z50.png" ||
              "/placeholder.svg"
            }
            alt={author}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
          {/* คะแนนดาวและข้อมูลอื่นๆ */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
              ))}
            </div>
            <div className="text-xs text-gray-500">{company}</div>
          </div>

          {/* ชื่อผู้รีวิว (เหมือนชื่อบทความ) */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{author}</h3>

          {/* ตำแหน่ง (เหมือน excerpt ใน บทความ) */}
          <p className="text-sm text-gray-600 mb-2">{position}</p>

          {/* เนื้อหารีวิว */}
          <p className="text-sm sm:text-base text-gray-700 mb-4 line-clamp-3 h-[80px] overflow-hidden">{content}</p>

          {/* ส่วนล่างเหมือนบทความ */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={author} />
                <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                  {author
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">ลูกค้าที่ยืนยันแล้ว</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              อ่านเพิ่มเติม
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Modal for displaying full testimonial */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{author}</DialogTitle>
          </DialogHeader>

          <div className="relative h-64 sm:h-80 w-full mb-4">
            <Image
              src={
                avatarUrl ||
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HuDmy3KyMHyfqQPMn0fPE58Rn36Z50.png" ||
                "/placeholder.svg"
              }
              alt={author}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-600">{position}</p>
              <span className="text-gray-400">|</span>
              <p className="text-gray-600 font-medium">{company}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            {displayFullContent.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex items-center mt-6 pt-4 border-t border-gray-100">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage
                src={
                  avatarUrl ||
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HuDmy3KyMHyfqQPMn0fPE58Rn36Z50.png" ||
                  "/placeholder.svg"
                }
                alt={author}
              />
              <AvatarFallback className="bg-blue-100 text-blue-700">
                {author
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">{author}</p>
              <p className="text-sm text-gray-600">ลูกค้าที่ยืนยันแล้ว</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
