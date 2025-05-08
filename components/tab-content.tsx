"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowUpCircle,
  BarChart,
  BarChart3,
  CheckCircle,
  Clock,
  Cpu,
  Factory,
  Globe,
  Info,
  QrCode,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react";
import AnimatedImage from "@/components/animated-image";
import FeatureSlider from "@/components/feature-slider";
import AnimatedSection from "./animated-section";
import AnimatedText from "./animated-text";
import AnimatedCounter from "./animated-counter";
import ImageModal from "./image-modal";

interface TabContentProps {
  className?: string;
  activeTab?: "FacOEE" | "FacWMS" | "FacGreen";
  setActiveTab?: (tab: "FacOEE" | "FacWMS" | "FacGreen") => void;
}

export default function TabContent({
  className = "",
  activeTab: externalActiveTab,
  setActiveTab: externalSetActiveTab,
}: TabContentProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<
    "FacOEE" | "FacWMS" | "FacGreen"
  >("FacOEE");

  // ใช้ค่า activeTab จากภายนอกถ้ามี หรือใช้ค่าภายในถ้าไม่มี
  const activeTab = externalActiveTab || internalActiveTab;
  const setActiveTab = externalSetActiveTab || setInternalActiveTab;

  return (
    <div className={`w-full `}>
      {/* Tab Navigation - Only show active tab */}
      <div className="flex justify-center mb-8">
        <Button
          className={`px-6 py-2 rounded-full transition-all bg-gray-400  shadow-md`}
        >
          {activeTab}
        </Button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
      {activeTab === "FacOEE" && (
          <motion.div
            key="FacOEE"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 overflow-hidden">
              {/* ส่วนแนะนำ FacOEE */}
              <AnimatedSection>
                <div className="max-w-4xl mx-auto text-center mb-12">
                  <AnimatedText
                    text="แพลทฟอร์มการเชื่อมต่ออุตสาหกรรมอัจฉริยะสำหรับ SMEs"
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    type="words"
                    animation="fade"
                    delay={0.2}
                  />
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 rounded-full"></div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-lg text-gray-600"
                  >
                    แพลตฟอร์ม <span className="font-semibold text-blue-700">FacOEE</span> หรือ{" "}
                    <span className="font-semibold text-blue-700">Overall Equipment Effectiveness</span>{" "}
                    ที่ใช้สำหรับวัดและวิเคราะห์ประสิทธิภาพโดยรวมของเครื่องจักรในกระบวนการผลิต
                    ช่วยให้ผู้ผลิตสามารถระบุจุดอ่อนและโอกาสในการปรับปรุงประสิทธิภาพการผลิต
                  </motion.p>
                </div>
              </AnimatedSection>

              {/* FacOEE คืออะไร */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <AnimatedSection delay={0.2} direction="left">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">FacOEE คืออะไร?</h3>
                      <p className="text-gray-600 mb-6">
                        FacOEE (Overall Equipment Effectiveness)
                        คือระบบที่ใช้วัดและวิเคราะห์ประสิทธิภาพโดยรวมของเครื่องจักรในกระบวนการผลิต โดยพิจารณาจากปัจจัยสำคัญ 3 ประการ:
                        ความพร้อมใช้งาน (Availability), ประสิทธิภาพการทำงาน (Performance) และคุณภาพ (Quality)
                        ช่วยให้ผู้ผลิตสามารถระบุจุดอ่อนและโอกาสในการปรับปรุงประสิทธิภาพการผลิตได้อย่างแม่นยำ
                      </p>

                      <h4 className="text-xl font-semibold text-gray-800 mb-4">จุดเด่นของ FacOEE</h4>
                      <ul className="space-y-3">
                        {[
                          "ติดตามประสิทธิภาพแบบเรียลไทม์ – ข้อมูลเป็นปัจจุบัน ตรวจสอบได้ทันที",
                          "วิเคราะห์ข้อมูลเชิงลึก – ค้นหาสาเหตุของการสูญเสียในกระบวนการผลิต",
                          "แดชบอร์ดที่ใช้งานง่าย – เข้าใจง่าย ไม่ต้องมีความรู้ด้านเทคนิคมาก",
                          "เชื่อมต่อกับเครื่องจักรได้หลากหลาย – รองรับอุปกรณ์ IoT และเครื่องจักรหลายรุ่น",
                          "แจ้งเตือนอัตโนมัติ – แจ้งเตือนเมื่อประสิทธิภาพต่ำกว่าเป้าหมาย",
                        ].map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                          >
                            <CheckCircle className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4} direction="right">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-30"></div>
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      <ImageModal src="/pform.png" alt="Factory Pro Dashboard" width={600} height={400} />
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* ประโยชน์ของ FacOEE */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 mb-16">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">ประโยชน์ของ FacOEE ต่อโรงงาน</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      {
                        icon: <ArrowUpCircle className="h-8 w-8 text-blue-500" />,
                        title: "เพิ่มประสิทธิภาพการผลิต",
                        description: "เพิ่ม FacOEE ได้สูงสุด 15% ด้วยการระบุและแก้ไขจุดที่สูญเสียประสิทธิภาพ",
                      },
                      {
                        icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
                        title: "ลดต้นทุนการผลิต",
                        description: "ลดต้นทุนได้ 10% และเพิ่มผลกำไร 20% จากการปรับปรุงประสิทธิภาพ",
                      },
                      {
                        icon: <Clock className="h-8 w-8 text-blue-500" />,
                        title: "ลดเวลาหยุดเครื่อง",
                        description: "ลดเวลาที่เครื่องจักรหยุดทำงานโดยไม่จำเป็นด้วยการวิเคราะห์สาเหตุ",
                      },
                      {
                        icon: <Activity className="h-8 w-8 text-blue-500" />,
                        title: "ข้อมูลเรียลไทม์",
                        description: "ติดตามและตอบสนองต่อปัญหาได้ทันทีด้วยข้อมูลแบบเรียลไทม์",
                      },
                    ].map((benefit, i) => (
                      <motion.div
                        key={i}
                        className="bg-white rounded-xl p-6 shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex items-start">
                          <div className="bg-blue-100 p-3 rounded-full mr-4">{benefit.icon}</div>
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                            <p className="text-gray-600">{benefit.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>

              {/* องค์ประกอบของ OEE */}
              <div className="mb-16">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">องค์ประกอบของ OEE</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                      className="bg-white rounded-xl p-6 shadow-md border-t-4 border-blue-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Clock className="h-8 w-8 text-blue-500" />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                        Availability (ความพร้อมใช้งาน)
                      </h4>
                      <p className="text-gray-600 text-center">
                        วัดเวลาที่เครื่องจักรพร้อมใช้งานเทียบกับเวลาทั้งหมด ช่วยระบุการสูญเสียจากการหยุดเครื่อง การตั้งค่า และการปรับแต่ง
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white rounded-xl p-6 shadow-md border-t-4 border-green-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <TrendingUp className="h-8 w-8 text-green-500" />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center">Performance (ประสิทธิภาพ)</h4>
                      <p className="text-gray-600 text-center">
                        วัดความเร็วในการผลิตจริงเทียบกับความเร็วที่ออกแบบไว้ ช่วยระบุการสูญเสียจากการทำงานช้าหรือการหยุดชะงักเล็กๆ น้อยๆ
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-white rounded-xl p-6 shadow-md border-t-4 border-amber-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="bg-amber-100 p-3 rounded-full">
                          <CheckCircle className="h-8 w-8 text-amber-500" />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center">Quality (คุณภาพ)</h4>
                      <p className="text-gray-600 text-center">
                        วัดจำนวนชิ้นงานที่ได้คุณภาพเทียบกับจำนวนทั้งหมดที่ผลิต ช่วยระบุการสูญเสียจากของเสียและงานที่ต้องทำซ้ำ
                      </p>
                    </motion.div>
                  </div>
                </AnimatedSection>
              </div>

              {/* ฟังก์ชันการทำงาน */}
              <div className="mb-16">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">ฟังก์ชันการทำงาน</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "การเก็บข้อมูลอัตโนมัติ",
                        description: "เก็บข้อมูลจากเครื่องจักรโดยตรงผ่านเซ็นเซอร์และอุปกรณ์ IoT",
                      },
                      {
                        title: "การวิเคราะห์ข้อมูลเชิงลึก",
                        description: "วิเคราะห์สาเหตุของการสูญเสียประสิทธิภาพด้วย AI และอัลกอริทึมขั้นสูง",
                      },
                      {
                        title: "แดชบอร์ดแบบเรียลไทม์",
                        description: "แสดงผลข้อมูลแบบเรียลไทม์ผ่านแดชบอร์ดที่ใช้งานง่าย",
                      },
                      {
                        title: "การแจ้งเตือนอัตโนมัติ",
                        description: "แจ้งเตือนเมื่อประสิทธิภาพต่ำกว่าเป้าหมายผ่าน SMS, Email, Line",
                      },
                      {
                        title: "รายงานและการวิเคราะห์แนวโน้ม",
                        description: "สร้างรายงานและวิเคราะห์แนวโน้มประสิทธิภาพในระยะยาว",
                      },
                    ].map((feature, i) => (
                      <motion.div
                        key={i}
                        className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      >
                        <div className="flex items-center mb-3">
                          <div className="bg-blue-500 w-3 h-3 rounded-full mr-2"></div>
                          <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                        </div>
                        <p className="text-gray-600 pl-5">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>

              {/* ผลลัพธ์ที่คุณจะได้รับ */}
              <div className="mb-16">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">ผลลัพธ์ที่คุณจะได้รับ</h3>

                  <div className="relative bg-blue-100 rounded-3xl p-8 overflow-hidden">
                    {/* Background decorative elements */}
                    

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                      <div className="space-y-6">
                        <motion.div
                          className="flex items-start bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="flex items-center justify-center bg-blue-100 p-2 rounded-full mr-4 h-10 w-10">
                            <CheckCircle className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Finding the reason to lose</h3>
                            <p className="text-gray-600">ค้นหาสาเหตุของการสูญเสียในกระบวนการผลิตได้อย่างรวดเร็ว</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-start bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="flex items-center justify-center bg-green-100 p-2 rounded-full mr-4 h-10 w-10">
                            <ArrowUpCircle className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Improve Production Efficiency</h3>
                            <p className="text-gray-600">ปรับปรุงประสิทธิภาพการผลิตด้วยข้อมูลเชิงลึกที่แม่นยำ</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-start bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="flex items-center justify-center bg-amber-100 p-2 rounded-full mr-4 h-10 w-10">
                            <Info className="h-6 w-6 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Easy to Analyze</h3>
                            <p className="text-gray-600">วิเคราะห์ข้อมูลได้ง่ายด้วยแดชบอร์ดที่ออกแบบมาเพื่อการใช้งานที่สะดวก</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-start bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <div className="flex items-center justify-center bg-purple-100 p-2 rounded-full mr-4 h-10 w-10">
                            <ArrowUpCircle className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Increase FacOEE</h3>
                            <p className="text-gray-600">เพิ่มค่า FacOEE ได้อย่างมีประสิทธิภาพด้วยการติดตามและปรับปรุงอย่างต่อเนื่อง</p>
                          </div>
                        </motion.div>
                      </div>

                      <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl shadow-xl">
                          <ImageModal
                            src="/Brochure_FactoryPro_Final_Inside.jpg"
                            alt="Factory Pro Dashboard"
                            width={1200}
                            height={800}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* อุตสาหกรรมที่เหมาะสม */}
              <div className="mb-16">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">เหมาะสำหรับอุตสาหกรรมอะไรบ้าง?</h3>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      "อุตสาหกรรมการผลิตทั่วไป",
                      "อุตสาหกรรมอาหารและเครื่องดื่ม",
                      "อุตสาหกรรมยานยนต์",
                      "อุตสาหกรรมอิเล็กทรอนิกส์",
                      "อุตสาหกรรมบรรจุภัณฑ์",
                    ].map((industry, i) => (
                      <motion.div
                        key={i}
                        className="bg-white rounded-lg p-4 text-center shadow-md border border-blue-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <CheckCircle className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                        <p className="text-gray-800 font-medium">{industry}</p>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>

              {/* กรณีศึกษา */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 mb-16">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">กรณีศึกษา</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                      className="bg-white rounded-xl p-6 shadow-md"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Factory className="h-6 w-6 text-blue-500 mr-2" />
                        กรณีศึกษา 1: โรงงานผลิตชิ้นส่วนยานยนต์
                      </h4>
                      <ul className="space-y-2 pl-8">
                        <li className="flex items-start">
                          <div className="text-blue-500 mr-2">➡️</div>
                          <span className="text-gray-700">ค่า OEE เพิ่มขึ้นจาก 65% เป็น 78% ภายใน 6 เดือน</span>
                        </li>
                        <li className="flex items-start">
                          <div className="text-blue-500 mr-2">➡️</div>
                          <span className="text-gray-700">ลดเวลาหยุดเครื่องโดยไม่ได้วางแผนลง 35%</span>
                        </li>
                        <li className="flex items-start">
                          <div className="text-blue-500 mr-2">➡️</div>
                          <span className="text-gray-700">ลดต้นทุนการผลิตลง 12% จากการปรับปรุงประสิทธิภาพ</span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      className="bg-white rounded-xl p-6 shadow-md"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Cpu className="h-6 w-6 text-blue-500 mr-2" />
                        กรณีศึกษา 2: โรงงานผลิตอาหารและเครื่องดื่ม
                      </h4>
                      <ul className="space-y-2 pl-8">
                        <li className="flex items-start">
                          <div className="text-blue-500 mr-2">➡️</div>
                          <span className="text-gray-700">เพิ่มกำลังการผลิตได้ 22% โดยไม่ต้องลงทุนเพิ่ม</span>
                        </li>
                        <li className="flex items-start">
                          <div className="text-blue-500 mr-2">➡️</div>
                          <span className="text-gray-700">ลดของเสียในกระบวนการผลิตลง 18%</span>
                        </li>
                        <li className="flex items-start">
                          <div className="text-blue-500 mr-2">➡️</div>
                          <span className="text-gray-700">ROI ภายใน 4 เดือนหลังจากติดตั้งระบบ</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </AnimatedSection>
              </div>

              {/* แกลเลอรีรูปภาพ */}
              <div className="mb-16">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">ระบบ FacOEE ในการทำงานจริง</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 z-10 rounded-xl"></div>
                      <ImageModal
                        src="/dashboard-screens.png"
                        alt="FacOEE Dashboard"
                        width={600}
                        height={400}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                        <h4 className="text-white text-lg font-semibold">แดชบอร์ดแสดงผล OEE แบบเรียลไทม์</h4>
                        <p className="text-white/80 text-sm">ติดตามประสิทธิภาพการผลิตได้ทุกที่ทุกเวลา</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 z-10 rounded-xl"></div>
                      <ImageModal
                        src="/Full Reltime monitoring.png"
                        alt="Full Realtime Monitoring"
                        width={600}
                        height={400}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                        <h4 className="text-white text-lg font-semibold">ระบบติดตามการผลิตแบบเรียลไทม์</h4>
                        <p className="text-white/80 text-sm">ดูสถานะการผลิตและประสิทธิภาพได้ทันที</p>
                      </div>
                    </motion.div>
                  </div>
                </AnimatedSection>
              </div>

              {/* FeatureSlider */}
              <div className="mb-16">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">คุณสมบัติเด่น</h3>
                  <FeatureSlider />
                </AnimatedSection>
              </div>

              {/* สรุป */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold mb-6 text-center">สรุป FacOEE ช่วยให้โรงงานของคุณ:</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {[
                      "เพิ่มประสิทธิภาพการผลิตได้สูงสุด 15%",
                      "ลดต้นทุนการผลิตได้ 10% และเพิ่มกำไร 20%",
                      "ติดตามและวิเคราะห์ข้อมูลแบบเรียลไทม์",
                      "ระบุและแก้ไขปัญหาได้อย่างรวดเร็ว",
                    ].map((point, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                      >
                        <CheckCircle className="h-6 w-6 text-white mr-3 flex-shrink-0" />
                        <p className="text-white font-medium">{point}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* <div className="flex justify-center mt-8">
                    <Button className="bg-white text-blue-600 hover:bg-blue-50">ขอข้อมูลเพิ่มเติม</Button>
                  </div> */}
                </AnimatedSection>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "FacWMS" && (
          <motion.div
            key="FacWMS"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 overflow-hidden">
              <AnimatedSection>
                <div className="max-w-3xl mx-auto text-center mb-12">
                  <AnimatedText
                    text="จัดการคำสั่งผลิต & วัตถุดิบอัจฉริยะ"
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    type="words"
                    animation="fade"
                    delay={0.2}
                  />
                  <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-6 rounded-full"></div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-lg text-gray-600"
                  >
                    บริหาร MES & Inventory (IMS) อย่างมีประสิทธิภาพ
                    รองรับการผลิตที่ยืดหยุ่น ขนส่งวัสดุอัตโนมัติด้วย QR Code,
                    ซิงค์ข้อมูลกับ MES & Inventory แบบเรียลไทม์
                  </motion.p>
                </div>
              </AnimatedSection>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <AnimatedSection delay={0.2} direction="left">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        FacWMS คืออะไร?
                      </h3>
                      <p className="text-gray-600 mb-6">
                        FacWMS คือระบบที่มีฟังก์ชันหลักในการขนส่งวัสดุอัตโนมัติ
                        และอัปเดตข้อมูลการผลิตแบบเรียลไทม์ผ่านการสแกน QR Code
                        ซึ่งเหมาะสำหรับการใช้งานในโรงงานอุตสาหกรรมที่ต้องการเพิ่มประสิทธิภาพการผลิตและลดการใช้แรงงานคน
                      </p>

                      <h4 className="text-xl font-semibold text-gray-800 mb-4">
                        จุดเด่นของ FacWMS
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "ระบบขนส่งวัสดุอัตโนมัติ – ลดการใช้แรงงานคน เพิ่มความแม่นยำในการขนส่ง",
                          "สแกน QR Code อัตโนมัติ – อัปเดตข้อมูลการผลิตแบบเรียลไทม์",
                          "เชื่อมต่อกับ Factory Pro – ซิงค์ข้อมูลกระบวนการผลิตอัตโนมัติ",
                          "รองรับการทำงานในสภาพแวดล้อมโรงงาน – ทนทาน ปรับแต่งให้เหมาะสมกับสายการผลิต",
                          "ลดความผิดพลาด – ควบคุมและติดตามสถานะขนส่งได้อย่างแม่นยำ",
                        ].map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                          >
                            <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4} direction="right">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur opacity-30"></div>
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      <ImageModal
                        src="/automated-warehouse.jpg"
                        alt="FacWMS - ระบบขนส่งวัสดุอัตโนมัติ"
                        width={600}
                        height={400}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* ประโยชน์ของ FacWMS */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 mb-16">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    ประโยชน์ของ FacWMS ต่อโรงงาน
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      {
                        icon: <Truck className="h-8 w-8 text-orange-500" />,
                        title: "ลดเวลาการขนส่งวัสดุ",
                        description: "ลดเวลาการขนส่งวัสดุระหว่างกระบวนการผลิต",
                      },
                      {
                        icon: <QrCode className="h-8 w-8 text-orange-500" />,
                        title: "ลดความผิดพลาด",
                        description: "ลดความผิดพลาดจากการบันทึกข้อมูลด้วยมือ",
                      },
                      {
                        icon: <BarChart className="h-8 w-8 text-orange-500" />,
                        title: "เพิ่มความเร็ว",
                        description: "เพิ่มความเร็วในการอัปเดตข้อมูลการผลิต",
                      },
                      {
                        icon: <Factory className="h-8 w-8 text-orange-500" />,
                        title: "ลดต้นทุน",
                        description:
                          "ลดต้นทุนแรงงานและเพิ่มประสิทธิภาพในการทำงาน",
                      },
                    ].map((benefit, i) => (
                      <motion.div
                        key={i}
                        className="bg-white rounded-xl p-6 shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex items-start">
                          <div className="bg-orange-100 p-3 rounded-full mr-4">
                            {benefit.icon}
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">
                              {benefit.title}
                            </h4>
                            <p className="text-gray-600">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>

              {/* แกลเลอรีรูปภาพ FacWMS */}
              <div className="mb-16">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    ระบบ FacWMS ในการทำงานจริง
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 z-10 rounded-xl"></div>
                      <ImageModal
                        src="/wms-dashboard.jpg"
                        alt="WMS Dashboard"
                        width={600}
                        height={400}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                        <h4 className="text-white text-lg font-semibold">
                          แดชบอร์ดจัดการคลังสินค้าอัจฉริยะ
                        </h4>
                        <p className="text-white/80 text-sm">
                          ติดตามสถานะวัตถุดิบและสินค้าแบบเรียลไทม์
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 z-10 rounded-xl"></div>
                      <ImageModal
                        src="/qr-code-scanning.jpg"
                        alt="QR Code Scanning"
                        width={600}
                        height={400}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                        <h4 className="text-white text-lg font-semibold">
                          ระบบสแกน QR Code
                        </h4>
                        <p className="text-white/80 text-sm">
                          ติดตามและอัปเดตสถานะวัตถุดิบอย่างแม่นยำ
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 z-10 rounded-xl"></div>
                      <ImageModal
                        src="/automated-warehouse.jpg"
                        alt="Automated Warehouse"
                        width={400}
                        height={300}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                        <h4 className="text-white text-lg font-semibold">
                          ระบบขนส่งวัสดุอัตโนมัติ
                        </h4>
                      </div>
                    </motion.div>

                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 z-10 rounded-xl"></div>
                      <ImageModal
                        src="/inventory-management.jpg"
                        alt="Inventory Management"
                        width={400}
                        height={300}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                        <h4 className="text-white text-lg font-semibold">
                          ระบบจัดการสินค้าคงคลัง
                        </h4>
                      </div>
                    </motion.div>

                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 z-10 rounded-xl"></div>
                      <ImageModal
                        src="/production-planning.jpg"
                        alt="Production Planning"
                        width={400}
                        height={300}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                        <h4 className="text-white text-lg font-semibold">
                          ระบบวางแผนการผลิต
                        </h4>
                      </div>
                    </motion.div>
                  </div>
                </AnimatedSection>
              </div>

              {/* สรุป */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    สรุป FacWMS ช่วยให้โรงงานของคุณ:
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {[
                      "ขนส่งวัสดุอย่างแม่นยำ ลดแรงงานคน",
                      "อัปเดตข้อมูลอัตโนมัติผ่าน QR Code",
                      "รองรับการใช้งานร่วมกับ Factory Pro และ ERP",
                      "ลดต้นทุน เพิ่มประสิทธิภาพการผลิต",
                    ].map((point, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                      >
                        <CheckCircle className="h-6 w-6 text-white mr-3 flex-shrink-0" />
                        <p className="text-white font-medium">{point}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* <div className="flex justify-center mt-8">
                    <Button className="bg-white text-orange-600 hover:bg-orange-50">
                      ขอข้อมูลเพิ่มเติม
                    </Button>
                  </div> */}
                </AnimatedSection>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "FacGreen" && (
          <motion.div
            key="FacGreen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 overflow-hidden">
              <AnimatedSection>
                <div className="max-w-3xl mx-auto text-center mb-12">
                  <AnimatedText
                    text="ติดตามพลังงาน & คาร์บอนฟุตพริ้นท์"
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    type="words"
                    animation="fade"
                    delay={0.2}
                  />
                  <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-6 rounded-full"></div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-lg text-gray-600"
                  >
                    วิเคราะห์การใช้พลังงานและคำนวณ Carbon Footprint รองรับแนวทาง
                    ESG และความยั่งยืน
                  </motion.p>
                </div>
              </AnimatedSection>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <AnimatedSection delay={0.2} direction="left">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        โซลูชันการติดตามพลังงานและคาร์บอนฟุตพริ้นท์สำหรับโรงงานอุตสาหกรรม
                      </h3>
                      <p className="text-gray-600 mb-6">
                        FacGreen เป็นโมดูลในแพลตฟอร์ม Factory Pro
                        ที่ออกแบบมาเพื่อช่วยโรงงานอุตสาหกรรมในการ
                        ตรวจสอบการใช้พลังงาน, ลดของสิ้นเปลือง, และ
                        คำนวณค่าคาร์บอนฟุตพริ้นท์ (Carbon Footprint)
                        ได้อย่างแม่นยำแบบเรียลไทม์
                        เหมาะอย่างยิ่งสำหรับองค์กรที่มุ่งเน้นด้าน ESG,
                        ความยั่งยืน, และการควบคุมต้นทุนพลังงาน
                      </p>

                      <h4 className="text-xl font-semibold text-gray-800 mb-4">
                        จุดเด่นของ FacGreen
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "ติดตามพลังงานแบบเรียลไทม์ – ตรวจจับการใช้พลังงานไฟฟ้าในแต่ละเครื่อง/โซน",
                          "คำนวณ Carbon Footprint อัตโนมัติ – รองรับมาตรฐานด้านสิ่งแวดล้อม",
                          "แสดงผลผ่าน Dashboard – เข้าใจง่าย เห็นแนวโน้มการใช้พลังงานแบบรายวัน/รายเดือน",
                          "เชื่อมต่อกับ Factory Pro – ดึงข้อมูลการผลิตมาเปรียบเทียบกับการใช้พลังงาน",
                          "แจ้งเตือนเมื่อการใช้พลังงานเกินค่าที่กำหนด – ลดความสูญเสียโดยไม่รู้ตัว",
                        ].map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                          >
                            <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4} direction="right">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur opacity-30"></div>
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      <ImageModal
                        src="/energy-dashboard.jpg"
                        alt="FacGreen - ระบบติดตามพลังงานและคาร์บอนฟุตพริ้นท์"
                        width={600}
                        height={400}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* แดชบอร์ดการติดตามพลังงาน */}
              <div className="mb-16">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    แดชบอร์ดการติดตามพลังงานและคาร์บอนฟุตพริ้นท์
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 z-10 rounded-xl"></div>
                      <ImageModal
                        src="/carbon-footprint.jpg"
                        alt="Carbon Footprint Dashboard"
                        width={600}
                        height={400}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                        <h4 className="text-white text-lg font-semibold">
                          คำนวณคาร์บอนฟุตพริ้นท์อัตโนมัติ
                        </h4>
                        <p className="text-white/80 text-sm">
                          ติดตามและวิเคราะห์ข้อมูลคาร์บอนฟุตพริ้นท์แบบเรียลไทม์
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 z-10 rounded-xl"></div>
                      <ImageModal
                        src="/power-monitoring.jpg"
                        alt="Power Monitoring System"
                        width={600}
                        height={400}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                        <h4 className="text-white text-lg font-semibold">
                          ระบบตรวจวัดพลังงานอัจฉริยะ
                        </h4>
                        <p className="text-white/80 text-sm">
                          ตรวจจับการใช้พลังงานในแต่���ะจุดของโรงงานอย่างแม่นยำ
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </AnimatedSection>
              </div>

              {/* สรุป */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
                <AnimatedSection>
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    สรุป FacGreen ช่วยให้โรงงานของคุณ:
                  </h3>

                  <div className="mt-8 mb-8">
                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg max-w-4xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ImageModal
                        src="/esg-reporting.jpg"
                        alt="ESG Reporting Dashboard"
                        width={800}
                        height={400}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 to-green-800/30 mix-blend-multiply rounded-xl"></div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-20">
                        <h4 className="text-white text-xl font-semibold">
                          รายงาน ESG อัตโนมัติ
                        </h4>
                        <p className="text-white/90">
                          สร้างรายงานความยั่งยืนและการใช้พลังงานสำหรับองค์กรของคุณ
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
