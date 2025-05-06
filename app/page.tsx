"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowUpCircle, Info } from "lucide-react";
import ContactForm from "@/components/contact-form";
import TestimonialCard from "@/components/testimonial-card";
import BlogCard from "@/components/blog-card";
import NavBar from "@/components/nav-bar";
import { readData } from "@/lib/db";
import HeroAnimation from "@/components/hero-animation";
import Pagination from "@/components/pagination";

import AnimatedSection from "@/components/animated-section";
import AnimatedText from "@/components/animated-text";
import AnimatedCounter from "@/components/animated-counter";
import AnimatedImage from "@/components/animated-image";
import { motion } from "framer-motion";
import TabContent from "@/components/tab-content";
import ClientLogoSlider from "@/components/client-logo-slider";

// ประเภทข้อมูลสำหรับรีวิวจากลูกค้า
interface TestimonialData {
  id: string;
  content: string;
  author: string;
  position: string;
  company: string;
  rating: number;
  avatarUrl?: string;
  fullContent?: string;
}

// ประเภทข้อมูลสำหรับบทความ
interface BlogData {
  id: string;
  title: string;
  excerpt: string;
  imageUrls: string[];
  date: string;
  readTime: string;
  category: string;
  slug: string;
  fullContent?: string;
}

export default function Home() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [testimonialPage, setTestimonialPage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);
  const itemsPerPage = 3;
  const [activeTab, setActiveTab] = useState<"OEE" | "FacScan" | "FacRobot">(
    "OEE"
  );
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();

        const formatted = data.map((blog) => ({
          ...blog,
          imageUrls: blog.images?.map((img) => img.url) || [],
        }));

        const sortedData = [...formatted].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setBlogs(sortedData);
      } catch (error) {
        console.error("Error fetching blogs from API:", error);
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    // โหลดข้อมูลรีวิวจาก localStorage
    const loadTestimonials = () => {
      try {
        // แก้ไขชื่อ key ที่ใช้ในการดึงข้อมูลรีวิวจาก localStorage
        const data = readData<TestimonialData>("testimonials");
        console.log("Loaded testimonials for homepage:", data);
        setTestimonials(data);
      } catch (error) {
        console.error("Error loading testimonials:", error);
        setTestimonials([]);
      }
    };

    // โหลดข้อมูลบทความจาก localStorage
    const loadBlogs = () => {
      try {
        const data = readData<BlogData>("blogs");
        console.log("Loaded blogs for homepage:", data);
        // เรียงลำดับข้อมูลจากใหม่ไปเก่า
        const sortedData = [...data].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setBlogs(sortedData);
      } catch (error) {
        console.error("Error loading blogs:", error);
        setBlogs([]);
      }
    };

    loadTestimonials();
    loadBlogs();
  }, []);

  const displayBlogs = blogs.length > 0 ? blogs : [];

  return (
    <div className="min-h-screen">
      {/* แสดง NavBar ในทุกกรณี */}
      <NavBar setActiveTab={setActiveTab} />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/bg-factory.jpeg"
            alt="Factory Pro Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent"></div>

        {/* Add the animation component */}
        <HeroAnimation />

        {/* Update the Hero section content div: */}
        <div className="container relative mx-auto px-4 py-12 sm:py-16 md:py-20 flex items-center min-h-screen">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 items-center w-full">
            <div className="space-y-4 sm:space-y-6 text-center sm:text-right sm:ml-auto max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block backdrop-blur-sm bg-white/10 rounded-full px-4 py-1.5 mb-2 sm:mb-4 border border-white/20 mx-auto sm:ml-auto"
              >
                <span className="text-white font-medium">
                  Factory Pro Platform
                </span>
              </motion.div>
              <AnimatedText
                text="ยกระดับการผลิตด้วย OEE อัจฉริยะ"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-md"
                type="words"
                animation="slide"
                delay={0.3}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl mx-auto sm:ml-auto backdrop-blur-[2px] rounded-lg p-2 bg-black/5"
              >
                แพลตฟอร์ม{" "}
                <span className="font-bold">
                  Overall Equipment Effectiveness
                </span>{" "}
                ที่ช่วยวัดและวิเคราะห์ประสิทธิภาพโดยรวมของเครื่องจักรในกระบวนการผลิต
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end"
              >
                {/* <Button className="bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  ทดลองใช้ฟรี
                </Button> */}
                {/* <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/20 rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
                >
                  ดูการสาธิต
                </Button> */}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <span id="about" className="section-anchor"></span>
        <div className="container mx-auto px-4 overflow-hidden">
          <AnimatedSection>
            <div className="max-w3xl mx-auto text-center mb-16">
              {/* <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">เกี่ยวกับเรา</Badge> */}
              <AnimatedText
                text="แพลทฟอร์มการเชื่อมต่ออุตสาหกรรมอัจฉริยะสำหรับ SMEs"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 break-words hyphens-auto px-2"
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
                แพลตฟอร์ม{" "}
                <span className="font-semibold text-blue-700">OEE</span> หรือ{" "}
                <span className="font-semibold text-blue-700">
                  Overall Equipment Effectiveness
                </span>{" "}
                ที่ใช้สำหรับวัดและวิเคราะห์ประสิทธิภาพโดยรวมของเครื่องจักรในกระบวนการผลิต
                ช่วยให้ผู้ผลิตสามารถระบุจุดอ่อนและโอกาสในการปรับปรุงประสิทธิภาพการผลิต
              </motion.p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              className="order-2 lg:order-1"
              delay={0.2}
              direction="left"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    เพิ่มประสิทธิภาพการผลิต
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "เพิ่ม OEE ได้สูงสุด 15%",
                      "ข้อมูลเป็นเรียลไทม์ ตรวจสอบได้ทันที",
                      "ข้อมูลมีความแม่นยำสูง ลดความผิดพลาดของมนุษย์",
                      "วิเคราะห์ปัญหาได้ทันท่วงที",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      >
                        <ArrowUpCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    ลดความผิดพลาด
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "ลดการลงข้อมูลในเอกสารผิดพลาด",
                      "ลดการลงข้อมูลในระบบผิดพลาด",
                      "ลดต้นทุนได้ 10% และเพิ่มผลกำไร 20%",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                      >
                        <Info className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection
              className="order-1 lg:order-2"
              delay={0.4}
              direction="right"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-30"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <AnimatedImage
                    src="/pform.png"
                    alt="Factory Pro Engineers Working"
                    width={600}
                    height={500}
                    animation="zoom"
                    delay={0.2}
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br ">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ผลลัพธ์ที่คุณจะได้รับ
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 rounded-full"></div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <AnimatedSection delay={0.2} direction="left">
              <ul className="space-y-6">
                <motion.li
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Finding the reason to lose
                    </h3>
                    <p className="text-gray-600">
                      ค้นหาสาเหตุของการสูญเสียในกระบวนการผลิตได้อย่างรวดเร็ว
                    </p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <ArrowUpCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Improve Production Efficiency
                    </h3>
                    <p className="text-gray-600">
                      ปรับปรุงประสิทธิภาพการผลิตด้วยข้อมูลเชิงลึกที่แม่นยำ
                    </p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="bg-amber-100 p-2 rounded-full mr-4">
                    <Info className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Easy to Analyze
                    </h3>
                    <p className="text-gray-600">
                      วิเคราะห์ข้อมูลได้ง่ายด้วยแดชบอร์ดที่ออกแบบมาเพื่อการใช้งานที่สะดวก
                    </p>
                  </div>
                </motion.li>
                <motion.li
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <ArrowUpCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Increase OEE
                    </h3>
                    <p className="text-gray-600">
                      เพิ่มค่า OEE
                      ได้อย่างมีประสิทธิภาพด้วยการติดตามและปรับปรุงอย่างต่อเนื่อง
                    </p>
                  </div>
                </motion.li>
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.4} direction="right">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 to-blue-600/10 rounded-2xl blur opacity-10"></div>
                <div className="relative overflow-hidden rounded-2xl ">
                  <AnimatedImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/App-AWVGPTc39PRKsKJvmzEeQnGhnY7ZiE.png"
                    alt="Factory Pro Dashboard"
                    width={1200}
                    height={800}
                    animation="slide"
                    delay={0.2}
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* เพิ่มส่วนของข้อความสถิติเดิมกลับมา */}
            <AnimatedSection className="col-span-1 md:col-span-3" delay={0.6}>
              <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
                <motion.div
                  className="bg-white rounded-lg shadow p-4 text-center transform transition-all duration-300 hover:shadow-md border-t-3 border-blue-500"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <AnimatedCounter
                    from={0}
                    to={15}
                    formatter={(value) => `${value}%`}
                    className="text-3xl font-bold text-blue-500 mb-1"
                    delay={0.2}
                  />
                  <h3 className="text-sm font-bold text-gray-800 mb-1">
                    เพิ่ม OEE
                  </h3>
                  <p className="text-xs text-gray-600">
                    เพิ่มประสิทธิภาพโดยรวมของเครื่องจักร
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white rounded-lg shadow p-4 text-center transform transition-all duration-300 hover:shadow-md border-t-3 border-green-500"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <AnimatedCounter
                    from={0}
                    to={10}
                    formatter={(value) => `${value}%`}
                    className="text-3xl font-bold text-green-500 mb-1"
                    delay={0.4}
                  />
                  <h3 className="text-sm font-bold text-gray-800 mb-1">
                    ลดต้นทุน
                  </h3>
                  <p className="text-xs text-gray-600">ลดต้นทุนการผลิตโดยรวม</p>
                </motion.div>

                <motion.div
                  className="bg-white rounded-lg shadow p-4 text-center transform transition-all duration-300 hover:shadow-md border-t-3 border-amber-500"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <AnimatedCounter
                    from={0}
                    to={20}
                    formatter={(value) => `${value}%`}
                    className="text-3xl font-bold text-amber-500 mb-1"
                    delay={0.6}
                  />
                  <h3 className="text-sm font-bold text-gray-800 mb-1">
                    เพิ่มกำไร
                  </h3>
                  <p className="text-xs text-gray-600">
                    เพิ่มผลกำไรจากการปรับปรุงประสิทธิภาพ
                  </p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Platform Section with Tabs */}
      <section className="py-12 sm:py-16 md:py-20 bg-blue-300 text-white relative overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-1/2 right-0 w-1/2 h-full transform -translate-y-1/2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Image
              src="/bg4Step1.png"
              alt="Background Pattern 1"
              fill
              className="object-contain opacity-8"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-[-50px] left-0 w-1/2 h-full"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Image
              src="/bg4Step2.png"
              alt="Background Pattern 2"
              fill
              className="object-contain opacity-8"
            />
          </motion.div>
        </div>

        {/* Content with relative positioning to appear above the background */}
        <div className="relative z-10">
          <span id="platform" className="section-anchor"></span>
          <span id="OEE" className="section-anchor"></span>
          <span id="FacScan" className="section-anchor"></span>
          <span id="FacRobot" className="section-anchor"></span>
          <div className="container mx-auto px-4 overflow-hidden">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center mb-16">
                {/* <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Platform</Badge> */}
                <AnimatedText
                  text="แพลตฟอร์มที่ครบครันสำหรับอุตสาหกรรม"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 break-words hyphens-auto px-2"
                  type="words"
                  animation="fade"
                  delay={0.2}
                />
                <div className="h-1 w-20 bg-white mx-auto mb-6 rounded-full"></div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-lg text-white/80"
                >
                  เลือกดูแพลตฟอร์มที่ตอบโจทย์ความต้องการของธุรกิจคุณ
                </motion.p>
              </div>
            </AnimatedSection>

            <TabContent
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <span id="services" className="section-anchor"></span>
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              {/* <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">บริการของเรา</Badge> */}
              <div className="mb-6">
                <AnimatedImage
                  src="/images/OurServices.png"
                  alt="Our Services"
                  width={800}
                  height={150}
                  animation="fade"
                  className="mx-auto h-auto"
                />
              </div>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 rounded-full"></div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg text-gray-600"
              >
                เรามีบริการครบวงจรเพื่อช่วยให้คุณสามารถเพิ่มประสิทธิภาพการผลิตได้อย่างเต็มที่
              </motion.p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "/images/service1.png",
                // title: "การติดตั้งระบบและอบรม",
                // description: "บริการติดตั้งและตั้งค่าระบบ Factory Pro ให้เหมาะสมกับความต้องการของธุรกิจคุณ",
                delay: 0.2,
              },
              {
                image: "/images/service2.png",
                // title: "ทีมงานผู้เชี่ยวชาญ",
                // description: "บริการให้คำปรึกษาเพื่อช่วยให้คุณสามารถใช้ประโยชน์จากข้อมูล OEE ในการปรับปรุงกระบวนการผลิต",
                delay: 0.4,
              },
              {
                image: "/images/service3.png",
                // title: "บริการหลังการขาย",
                // description: "บริการฝึกอบรมทีมงานของคุณให้สามารถใช้งานระบบได้อย่างมีประสิทธิภาพ พร้อมการสนับสนุนตลอด 24/7",
                delay: 0.6,
              },
            ].map((service, i) => (
              <AnimatedSection key={i} delay={service.delay} direction="up">
                {/* <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div> */}
                <CardContent className="p-8">
                  <motion.div
                    className="flex justify-center mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={200}
                      height={200}
                      className="w-auto h-auto"
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {service.description}
                  </p>
                </CardContent>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cXcVSEF8EbQOf8EjIoRvprSJdbRNZU.png"
            alt="Tech Factory Background"
            fill
            className="object-cover"
            priority
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-orange-300/60 to-orange-400/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
        <div className="relative z-10">
          <span id="pricing" className="section-anchor"></span>
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center mb-16">
                {/* <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">แพ็คเกจราคา</Badge> */}
                <AnimatedText
                  text="เลือกแพ็คเกจที่เหมาะกับธุรกิจของคุณ"
                  className="text-3xl sm:text-4xl font-bold text-white mb-6"
                  type="words"
                  animation="slide"
                  delay={0.2}
                />
                <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 rounded-full"></div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-lg text-white/90"
                >
                  เรามีแพ็คเกจหลากหลายเพื่อตอบสนองความต้องการของธุรกิจทุกขนาด
                </motion.p>
              </div>
            </AnimatedSection>

            {/* Update the Pricing section for better mobile display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "โรงงานขนาดเล็ก",
                  image: "/images/Small3.png",
                  delay: 0.2,
                },
                {
                  title: "โรงงานขนาดกลาง",
                  image: "/images/Medium3.png",
                  delay: 0.4,
                },
                {
                  title: "โรงงานขนาดใหญ่",
                  image: "/images/Large3.png",
                  delay: 0.6,
                },
              ].map((package_, i) => (
                <AnimatedSection key={i} delay={package_.delay} direction="up">
                  <motion.div
                    className="flex flex-col h-full overflow-hidden bg-transparent transition-all duration-300"
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <div className="flex-grow flex items-center justify-center">
                      <AnimatedImage
                        src={package_.image}
                        alt={`${package_.title} Package`}
                        width={400}
                        height={800}
                        animation="zoom"
                        className="w-full h-auto transition-all duration-300 hover:scale-105"
                      />
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            {/* <AnimatedSection delay={0.8}>
              <div className="mt-12 text-center">
                <p className="text-white mb-4">
                  ไม่แน่ใจว่าแพ็คเกจไหนเหมาะกับคุณ?
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                    ปรึกษาผู้เชี่ยวชาญของเรา
                  </Button>
                </motion.div>
              </div>
            </AnimatedSection> */}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <span id="blogs" className="section-anchor"></span>
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
              {/* <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">บทความ</Badge> */}
              <AnimatedText
                text="บทความและข่าวสารล่าสุด"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6"
                type="words"
                animation="fade"
                delay={0.2}
              />
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-4 sm:mb-6 rounded-full"></div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-base sm:text-lg text-gray-600"
              >
                ติดตามข่าวสารและบทความเกี่ยวกับอุตสาหกรรมการผลิตและเทคโนโลยี
              </motion.p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayBlogs
              .slice((blogPage - 1) * itemsPerPage, blogPage * itemsPerPage)
              .map((blog, i) => (
                <AnimatedSection
                  key={blog.id}
                  delay={0.2 + i * 0.2}
                  direction="up"
                >
                  <motion.div
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <BlogCard
                      title={blog.title}
                      excerpt={blog.excerpt}
                      fullContent={blog.fullContent}
                      imageUrls={blog.imageUrls}
                      date={blog.date}
                      readTime={blog.readTime}
                      category={blog.category}
                      slug={blog.slug}
                    />
                  </motion.div>
                </AnimatedSection>
              ))}
          </div>

          {displayBlogs.length > itemsPerPage && (
            <AnimatedSection delay={0.8}>
              <Pagination
                currentPage={blogPage}
                totalPages={Math.ceil(displayBlogs.length / itemsPerPage)}
                onPageChange={setBlogPage}
              />
            </AnimatedSection>
          )}

          {/* <AnimatedSection delay={0.8}>
            <div className="text-center mt-8 sm:mt-12">
              {displayBlogs.length > itemsPerPage ? (
                <div className="mt-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 px-4 sm:py-2 sm:px-6">
                      ดูบทความทั้งหมด
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 px-4 sm:py-2 sm:px-6">
                    ดูบทความทั้งหมด
                  </Button>
                </motion.div>
              )}
            </div>
          </AnimatedSection> */}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <span id="partners" className="section-anchor"></span>
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              {/* <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Trusted by</Badge> */}
              <AnimatedText
                text="Trusted by"
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
                className="text-base sm:text-lg text-gray-600"
              >
                Official Partners and Collaborators
              </motion.p>
            </div>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center items-center">
            <AnimatedSection delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                // className="m-6 p-8 rounded-lg "
              >
                <Image
                  src="/images/clients/client-4.webp"
                  alt="SCG Logo"
                  width={200}
                  height={100}
                  className="h-auto w-auto object-contain"
                />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
        {/* Clients Section */}
        <div className="py-16 bg-white">
          <span id="clients" className="section-anchor"></span>
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center mb-12">
                {/* <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">Our Clients</Badge> */}
                <AnimatedText
                  text="Our Clients Companies That Trust Us"
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
                  className="text-base sm:text-lg text-gray-600"
                >
                  We are proud to work with these leading organizations
                </motion.p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <ClientLogoSlider
                clients={[
                  {
                    name: "KMUTNB",
                    logo: "/images/clients/client-1.webp",
                    alt: "KMUTNB Logo",
                  },
                  {
                    name: "Thai Government",
                    logo: "/images/clients/client-2.webp",
                    alt: "Thai Government Logo",
                  },
                  {
                    name: "Udonthani Cancer Hospital",
                    logo: "/images/clients/client-3.webp",
                    alt: "Udonthani Cancer Hospital Logo",
                  },
                  {
                    name: "SCG",
                    logo: "/images/clients/client-4.webp",
                    alt: "SCG Logo",
                  },
                  {
                    name: "NAWA Plastic",
                    logo: "/images/clients/client-5.webp",
                    alt: "NAWA Plastic Logo",
                  },
                  {
                    name: "Eastwater",
                    logo: "/images/clients/client-6.webp",
                    alt: "Eastwater Logo",
                  },
                  {
                    name: "Universal Utilities Group",
                    logo: "images/clients/client-7.webp",
                    alt: "Universal Utilities Group Logo",
                  },
                  {
                    name: "IBCON",
                    logo: "images/clients/client-8.webp",
                    alt: "IBCON Logo",
                  },
                  {
                    name: ".nt",
                    logo: "images/clients/client-9.webp",
                    alt: "nt Logo",
                  },
                  {
                    name: "VEKIN",
                    logo: "images/clients/client-10.webp",
                    alt: "VEKIN Logo",
                  },
                  {
                    name: "SEN",
                    logo: "images/clients/client-11.webp",
                    alt: "SEN Logo",
                  },
                  {
                    name: "THI",
                    logo: "images/clients/client-12.webp",
                    alt: "THI Logo",
                  },
                  {
                    name: "ARROW",
                    logo: "images/clients/client-13.webp",
                    alt: "ARROW Logo",
                  },
                ]}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative">
        {/* Update the gradient background here */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <div className="relative z-10">
          <span id="contact" className="section-anchor"></span>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* <Badge className="mb-4 bg-white text-orange-600 hover:bg-white/90">ติดต่อเรา</Badge> */}
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  ปรึกษาและขอใบเสนอราคา
                </h2>
                <div className="h-1 w-20 bg-white mb-6 rounded-full"></div>
                <p className="text-lg text-white mb-8">
                  กรอกข้อมูลของคุณด้านล่างเพื่อรับการติดต่อกลับจากทีมงานของเรา
                  เราพร้อมให้คำปรึกษาและช่วยเหลือคุณในการเลือกแพ็คเกจที่เหมาะสมกับธุรกิจของคุณ
                </p>

                <div className="bg-white/90 p-6 rounded-xl border border-white/20 mb-8 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    ทำไมต้องเลือก Factory Pro?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "เพิ่ม OEE ได้สูงสุด 15%",
                      "ลดต้นทุนได้ 10%",
                      "เพิ่มผลกำไร 20%",
                      "ใช้งานง่าย ไม่ต้องมีความรู้ด้านเทคนิค",
                      "การสนับสนุนจากผู้เชี่ยวชาญตลอด 24/7",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center space-x-4">
                  <Link
                    href="#"
                    className="text-white hover:text-yellow-200 font-medium"
                  >
                    ดูเอกสารเพิ่มเติม
                  </Link>
                  <span className="text-white/50">|</span>
                  <Link
                    href="#"
                    className="text-white hover:text-yellow-200 font-medium"
                  >
                    คำถามที่พบบ่อย
                  </Link>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-white">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/Foot.png"
            alt="Footer Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div>
                <Image
                  src="/logo_factory.png"
                  alt="Factory Pro Logo"
                  width={120}
                  height={60}
                  className="h-auto w-auto"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">
                  Artron Innovative Co., Ltd.
                </h3>
                <p className="text-gray-300">
                  37/145 Moo 5, Tiwanon Road, Pakkret Subdistrict,
                </p>
                <p className="text-gray-300">Pak Kret, Nonthaburi 11120</p>
              </div>
            </div>
          </div>
          <div className="bg-black py-4">
            <div className="container mx-auto px-4">
              <p className="text-gray-400 text-sm text-center">
                Copyright {new Date().getFullYear()} © All Right Reserved Design
                by Artron Innovative Co., Ltd.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
