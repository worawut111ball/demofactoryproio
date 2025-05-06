"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ArrowLeft } from "lucide-react"
import Image from "next/image"
import NavBar from "@/components/nav-bar"

interface TestimonialData {
  id: string
  content: string
  author: string
  position: string
  company: string
  rating: number
  avatarUrl?: string
}

export default function TestimonialDetail() {
  const params = useParams()
  const router = useRouter()
  const [testimonial, setTestimonial] = useState<TestimonialData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTestimonial = async () => {
      try {
        const response = await fetch(`/api/testimonials/${params.id}`)

        if (response.ok) {
          const testimonial = await response.json()
          setTestimonial(testimonial)
        } else {
          // ถ้าไม่พบข้อมูลใน API ให้ใช้ข้อมูลตัวอย่าง
          const defaultTestimonials = [
            {
              id: "1",
              content:
                "Factory Pro ช่วยให้เราสามารถเพิ่มประสิทธิภาพการผลิตได้อย่างมาก เราสามารถติดตามและวิเคราะห์ข้อมูลได้แบบเรียลไทม์ ทำให้แก้ไขปัญหาได้ทันท่วงที\n\nหลังจากใช้งานมาเป็นเวลา 6 เดือน เราสามารถลดเวลาหยุดเครื่องจักรได้ถึง 15% และเพิ่มผลผลิตได้ 20% โดยไม่ต้องเพิ่มทรัพยากรใดๆ ระบบใช้งานง่าย ทีมงานเข้าใจได้เร็ว และการสนับสนุนจากทีมงาน Factory Pro ก็ยอดเยี่ยมมาก",
              author: "สมชาย ใจดี",
              position: "ผู้จัดการฝ่ายผลิต",
              company: "บริษัท อุตสาหกรรมไทย จำกัด",
              rating: 5,
              avatarUrl: "/thoughtful-portrait.png",
            },
            // เพิ่มข้อมูลตัวอย่างอื่นๆ ตามต้องการ
          ]

          const defaultTestimonial = defaultTestimonials.find((t) => t.id === params.id)
          if (defaultTestimonial) {
            setTestimonial(defaultTestimonial)
          } else {
            router.push("/")
          }
        }
      } catch (error) {
        console.error("Error loading testimonial:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTestimonial()
  }, [params.id, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-500">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  if (!testimonial) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700">ไม่พบข้อมูลรีวิว</p>
          <Button onClick={() => router.push("/")} className="mt-4">
            กลับสู่หน้าหลัก
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-12">
        <Button variant="outline" onClick={() => router.back()} className="mb-6 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับ
        </Button>

        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="relative h-64 sm:h-80 w-full">
            <Image
              src={
                testimonial.avatarUrl ||
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HuDmy3KyMHyfqQPMn0fPE58Rn36Z50.png" ||
                "/placeholder.svg"
              }
              alt={testimonial.author}
              fill
              className="object-cover"
            />
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">{testimonial.author}</CardTitle>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-gray-600">{testimonial.position}</p>
              <p className="text-gray-600 font-medium">{testimonial.company}</p>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              {testimonial.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center mt-8 pt-4 border-t border-gray-100">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage
                  src={
                    testimonial.avatarUrl ||
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HuDmy3KyMHyfqQPMn0fPE58Rn36Z50.png" ||
                    "/placeholder.svg"
                  }
                  alt={testimonial.author}
                />
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  {testimonial.author
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">ลูกค้าที่ยืนยันแล้ว</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
