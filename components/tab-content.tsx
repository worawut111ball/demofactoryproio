"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import AnimatedImage from "@/components/animated-image"
import FeatureSlider from "@/components/feature-slider"

interface TabContentProps {
  className?: string
  activeTab?: "OEE" | "FacScan" | "FacRobot"
  setActiveTab?: (tab: "OEE" | "FacScan" | "FacRobot") => void
}

export default function TabContent({
  className = "",
  activeTab: externalActiveTab,
  setActiveTab: externalSetActiveTab,
}: TabContentProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<"OEE" | "FacScan" | "FacRobot">("OEE")

  // ใช้ค่า activeTab จากภายนอกถ้ามี หรือใช้ค่าภายในถ้าไม่มี
  const activeTab = externalActiveTab || internalActiveTab
  const setActiveTab = externalSetActiveTab || setInternalActiveTab

  return (
    <div className={`w-full `}>
      {/* Tab Navigation - Only show active tab */}
      <div className="flex justify-center mb-8">
        <Button className={`px-6 py-2 rounded-full transition-all bg-blue-400 text-white shadow-md`}>
          {activeTab}
        </Button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "OEE" && (
          <motion.div
            key="oee"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Overall Equipment Effectiveness</h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  OEE คือการวัดประสิทธิภาพโดยรวมของเครื่องจักร โดยพิจารณาจากปัจจัยสำคัญ 3 ประการ: ความพร้อมใช้งาน (Availability),
                  ประสิทธิภาพ (Performance) และคุณภาพ (Quality)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0 mb-8">
                {[
                
                ].map((factor, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm border border-blue-100 rounded-lg p-6 text-center"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <span className="text-blue-600 text-xl sm:text-2xl font-bold">{factor.percentage}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">{factor.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{factor.description}</p>
                  </div>
                ))}
              </div>

              <FeatureSlider />

              <div className="mt-8 text-center">
                <AnimatedImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Full%20Reltime%20monitoring-bebdPZqWeP4WOf9ei4LqZauwXTZnmw.png"
                  alt="Full Realtime Monitoring System"
                  width={1200}
                  height={800}
                  animation="zoom"
                  className="w-full h-auto rounded-lg "
                />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "FacScan" && (
          <motion.div
            key="facscan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ระบบสแกนใบหน้าอัจฉริยะสำหรับโรงงาน</h3>
                  <p className="text-gray-600 mb-6">
                    FacScan คือระบบสแกนใบหน้าอัจฉริยะที่ช่วยเพิ่มความปลอดภัยและประสิทธิภาพในการบริหารจัดการบุคลากรในโรงงานอุตสาหกรรม
                  </p>
                  <ul className="space-y-3">
                    {[
                      "ระบบจดจำใบหน้าความแม่นยำสูงถึง 99.9%",
                      "บันทึกเวลาเข้า-ออกอัตโนมัติ ลดการปลอมแปลง",
                      "รองรับการสแกนแม้สวมหน้ากากอนามัยหรืออุปกรณ์ PPE",
                      "เชื่อมต่อกับระบบ HR และระบบความปลอดภัยได้ทันที",
                      "รายงานสรุปการเข้างานแบบเรียลไทม์",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">ทดลองใช้ฟรี</Button>
                  <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                    ดูข้อมูลเพิ่มเติม
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-30"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <AnimatedImage
                    src="/factory-access-control.png"
                    alt="FacScan - ระบบสแกนใบหน้าอัจฉริยะ"
                    width={600}
                    height={400}
                    animation="zoom"
                    delay={0.2}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "FacRobot" && (
          <motion.div
            key="facrobot"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-30"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <AnimatedImage
                    src="/automated-assembly-line.png"
                    alt="FacRobot - หุ่นยนต์อัตโนมัติสำหรับงานอุตสาหกรรม"
                    width={600}
                    height={400}
                    animation="zoom"
                    delay={0.2}
                  />
                </div>
              </div>
              <div className="space-y-8 order-1 lg:order-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">หุ่นยนต์อัตโนมัติสำหรับงานอุตสาหกรรม</h3>
                  <p className="text-gray-600 mb-6">
                    FacRobot คือระบบหุ่นยนต์อัตโนมัติที่ออกแบบมาเพื่อเพิ่มประสิทธิภาพในกระบวนการผลิต ลดต้นทุนแรงงาน
                    และเพิ่มความแม่นยำในการทำงาน
                  </p>
                  <ul className="space-y-3">
                    {[
                      "หุ่นยนต์อัตโนมัติที่สามารถทำงานได้ 24/7 ไม่มีเวลาพัก",
                      "ความแม่นยำสูงในการทำงานซ้ำๆ ลดของเสียในกระบวนการผลิต",
                      "ปรับตั้งค่าได้ง่ายผ่านแอปพลิเคชันบนมือถือหรือแท็บเล็ต",
                      "รองรับการเชื่อมต่อกับระบบ IoT และ Industry 4.0",
                      "ระบบความปลอดภัยขั้นสูง ป้องกันอุบัติเหตุในการทำงาน",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">ขอใบเสนอราคา</Button>
                  <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                    ดูวิดีโอสาธิต
                  </Button>
                </div>
              </div>
            </div>

            {/* สถิติการใช้งาน FacRobot */}
            <div className="mt-16">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-center mb-8">ผลลัพธ์ที่ลูกค้าได้รับจาก FacRobot</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
                    <p className="text-gray-700">เพิ่มประสิทธิภาพการผลิต</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
                    <p className="text-gray-700">ลดต้นทุนแรงงาน</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
                    <p className="text-gray-700">ความแม่นยำในการทำงาน</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
