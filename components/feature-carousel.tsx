"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      id: 1,
      title: "การติดตามแบบเรียลไทม์",
      description: "ติดตามข้อมูลการผลิตแบบเรียลไทม์ เห็นสถานะเครื่องจักรและประสิทธิภาพได้ทันที",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "การวิเคราะห์ขั้นสูง",
      description: "วิเคราะห์ข้อมูลเชิงลึกเพื่อค้นหาสาเหตุของปัญหาและโอกาสในการปรับปรุง",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "รายงานอัตโนมัติ",
      description: "สร้างรายงานอัตโนมัติที่แสดงข้อมูลสำคัญและแนวโน้มประสิทธิภาพการผลิต",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "การแจ้งเตือนอัจฉริยะ",
      description: "รับการแจ้งเตือนเมื่อมีปัญหาหรือเมื่อประสิทธิภาพต่ำกว่าเป้าหมาย",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 5,
      title: "การบำรุงรักษาเชิงป้องกัน",
      description: "วางแผนการบำรุงรักษาล่วงหน้าเพื่อลดเวลาหยุดทำงานและยืดอายุเครื่องจักร",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 6,
      title: "การเชื่อมต่อกับระบบอื่น",
      description: "เชื่อมต่อกับระบบ ERP, MES และระบบอื่นๆ เพื่อการทำงานที่ราบรื่น",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [features.length, isPaused])

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + features.length) % features.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % features.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const handleDotClick = (index: number) => {
    setActiveIndex(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  return (
    <div
      className="relative overflow-hidden py-8 px-4 bg-gray-50 rounded-2xl"
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gray-300 hover:bg-blue-50 hover:border-blue-400"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-blue-500 w-6" : "bg-gray-300"
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gray-300 hover:bg-blue-50 hover:border-blue-400"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{features[activeIndex].title}</h3>
          <p className="text-gray-600 text-lg">{features[activeIndex].description}</p>
          <div className="mt-6">
            <Button className="bg-blue-500 hover:bg-blue-600">เรียนรู้เพิ่มเติม</Button>
          </div>
        </div>
        <div>
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={features[activeIndex].image || "/placeholder.svg"}
                alt={features[activeIndex].title}
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
