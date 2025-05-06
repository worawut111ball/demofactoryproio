"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface FeatureSlide {
  id: number
  imageUrl: string
  title: string
  description: string
}

export default function FeatureSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const carouselRef = useRef<HTMLDivElement>(null)

  const features: FeatureSlide[] = [
    {
      id: 1,
      imageUrl: "/features/F4.png",
      title: "ระบบรายงานคุณภาพการผลิต",
      description: "ระบบสามารถคีย์จำนวนงานเสียแยกตามอาการเสีย แสดงเป็นอัตราข้อเสียหรือ PPM แสดงเป็นกราฟจำนวนงานเสียแยกเป็นอาการ",
    },
    {
      id: 2,
      imageUrl: "/features/F5.png",
      title: "ระบบรายงานประสิทธิภาพการผลิต",
      description: "ระบบสามารถคำนวณประสิทธิภาพเครื่องจักร ไลน์การผลิต พนักงานหรือค่าชี้วัดต่างๆ ที่กำหนดขึ้นมา",
    },
    {
      id: 3,
      imageUrl: "/features/F6.png",
      title: "ระบบวิเคราะห์ปัญหาการผลิต",
      description: "ระบบมีรายงานการผลิต งานเสีย เวลาเสียแยกเป็นรายวัน รายเดือน สามารถดูเพื่อนำไปวิเคราะห์แก้ปัญหาต่อได้",
    },
    {
      id: 4,
      imageUrl: "/features/F1.png",
      title: "เชื่อมต่อกับระบบ ERP เดิม",
      description: "ระบบสามารถ EXPORT และ IMPORT กับระบบเดิมที่ใช้งานอยู่อย่างไร้รอยต่อ",
    },
    {
      id: 5,
      imageUrl: "/features/F2.png",
      title: "ระบบวางแผนการผลิต",
      description: "ระบบสร้างระบบวางแผนการผลิตโดยสามารถดึงข้อมูลจากระบบเดิมหรือสร้างขึ้นมาเองก็ได้",
    },
    {
      id: 6,
      imageUrl: "/features/F3.png",
      title: "ระบบรายงานการผลิตแบบเรียลไทม์",
      description:
        "ระบบสามารถเทรคริ่น ล็อตหรืออื่นๆ แทคไทม์ เป้าหมาย ยอดการผลิต ผลต่างแสดงผลเป็นชั่วโมง เป็นวันแยกเป็นเครื่องจักร ไลน์การผลิต",
    },
  ]

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((current) => (current + 1) % features.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [features.length, isPaused])

  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((current) => (current - 1 + features.length) % features.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const handleNext = () => {
    setDirection(1)
    setActiveIndex((current) => (current + 1) % features.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  // Get the visible slides (3 at a time)
  const getVisibleSlides = () => {
    const result = []
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % features.length
      result.push(features[index])
    }
    return result
  }

  const visibleSlides = getVisibleSlides()

  // Variants for slide animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.85,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom ease curve for smoother animation
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.85,
      rotateY: direction > 0 ? -15 : 15,
      transition: {
        duration: 0.5,
      },
    }),
  }

  return (
    <div
      className="relative overflow-hidden py-12"
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* APQ Icons at the top with improved animation */}
      <div className="flex justify-center items-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/features/APQ.png"
            alt="Availability, Performance, Quality"
            width={800}
            height={100}
            className="w-auto h-32 sm:h-40 md:h-56 lg:h-64"
            priority
          />
        </motion.div>
      </div>

      {/* Features Heading with improved styling */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="inline-block"
        >
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-800 to-blue-700 bg-clip-text text-transparent">
            FEATURES
          </h3>
        </motion.div>
      </div>

      {/* Navigation Arrows - Moved to top */}
      <div className="flex justify-center mb-8 space-x-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-none shadow-md hover:shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={handleNext}
            aria-label="Next slide"
            className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-none shadow-md hover:shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>

      {/* Feature Cards Slider with improved layout */}
      <div className="relative px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Feature Cards Container with perspective for 3D effect */}
        <div className="perspective-1000 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {visibleSlides.map((feature, index) => (
                <motion.div
                  key={`${feature.id}-${index}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="overflow-hidden transform transition-all duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="relative overflow-hidden group">
                    <Image
                      src={feature.imageUrl || "/placeholder.svg"}
                      alt={feature.title}
                      width={500}
                      height={400}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold text-xl mb-2">{feature.title}</h3>
                      <p className="text-white/90 text-sm line-clamp-3">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Improved Dots Navigation */}
      <div className="flex justify-center mt-12 space-x-3">
        {features.map((_, index) => {
          const isActive = index === activeIndex
          return (
            <motion.button
              key={index}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 w-10 h-3"
                  : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            />
          )
        })}
      </div>

      {/* Feature Info with improved styling */}
      <motion.div
        className="mt-12 text-center max-w-3xl mx-auto px-4 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        key={activeIndex} // Re-render when activeIndex changes
      >
        <motion.h3
          className="text-2xl font-bold text-blue-800 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {features[activeIndex].title}
        </motion.h3>
        <motion.p
          className="text-gray-700 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {features[activeIndex].description}
        </motion.p>
      </motion.div>
    </div>
  )
}
