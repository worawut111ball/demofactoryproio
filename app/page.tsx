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
  const [activeTab, setActiveTab] = useState<"FacOEE" | "FacWMS" | "FacGreen">(
    "FacOEE"
  );
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        console.log("Fetched data:", data);

        // ตรวจสอบว่า data เป็นอาร์เรย์หรือไม่
        const formatted = Array.isArray(data)
          ? data.map((blog) => ({
              ...blog,
              imageUrls: blog.images?.map((img) => img.url) || [],
            }))
          : [];

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
  // ข้อมูลบทความเริ่มต้นในกรณีที่ไม่มีข้อมูลในระบบ
  const defaultBlogs: BlogData[] = [
    {
      id: "1",
      title: "5 วิธีเพิ่มประสิทธิภาพการผลิตด้วย OEE",
      excerpt:
        "การวัดประสิทธิภาพโดยรวมของเครื่องจักร (OEE) เป็นเครื่องมือสำคัญในการปรับปรุงกระบวนการผลิต บทความนี้จะแนะนำ 5 วิธีที่คุณสามารถใช้ OEE เพื่อเพิ่มประสิทธิภาพการผลิตของคุณ",
      fullContent:
        "การวัดประสิทธิภาพโดยรวมของเครื่องจักร (OEE) เป็นเครื่องมือสำคัญในการปรับปรุงกระบวนการผลิต บทความนี้จะแนะนำ 5 วิธีที่คุณสามารถใช้ OEE เพื่อเพิ่มประสิทธิภาพการผลิตของคุณ\n\n1. การติดตามและวิเคราะห์ข้อมูลแบบเรียลไทม์\nการติดตามข้อมูล OEE แบบเรียลไทม์ช่วยให้คุณสามารถระบุปัญหาและแก้ไขได้ทันที ไม่ต้องรอให้เกิดความเสียหายมากขึ้น ระบบติดตามแบบเรียลไทม์ช่วยให้ผู้จัดการสามารถตัดสินใจได้อย่างรวดเร็วและแม่นยำ\n\n2. การวิเคราะห์สาเหตุของการหยุดเครื่องจักร\nการวิเคราะห์สาเหตุของการหยุดเครื่องจักรช่วยให้คุณสามารถระบุปัญหาที่เกิดขึ้นบ่อยและแก้ไขได้อย่างตรงจุด การลดเวลาหยุดเครื่องจักรเป็นวิธีที่มีประสิทธิภาพมากที่สุดในการเพิ่ม OEE\n\n3. การฝึกอบรมพนักงาน\nพนักงานที่ได้รับการฝึกอบรมอย่างดีสามารถช่วยเพิ่มประสิทธิภาพการผลิตได้อย่างมาก การฝึกอบรมควรครอบคลุมทั้งการใช้งานเครื่องจักร การบำรุงรักษาเบื้องต้น และการแก้ไขปัญหาที่พบบ่อย\n\n4. การบำรุงรักษาเชิงป้องกัน\nการบำรุงรักษาเชิงป้องกันช่วยลดโอกาสที่เครื่องจักรจะเสียหายและต้องหยุดทำงาน การวางแผนการบำรุงรักษาอย่างเป็นระบบช่วยให้คุณสามารถจัดการทรัพยากรได้อย่างมีประสิทธิภาพและลดต้นทุนในระยะยาว\n\n5. การปรับปรุงอย่างต่อเนื่อง\nการปรับปรุงอย่างต่อเนื่องเป็นกุญแจสำคัญในการเพิ่มประสิทธิภาพการผลิต การตั้งเป้าหมาย OEE ที่ท้าทายและติดตามความคืบหน้าอย่างสม่ำเสมอช่วยให้ทีมงานมีแรงจูงใจในการปรับปรุงกระบวนการทำงาน",
      imageUrls: ["/automated-assembly-line.png"],
      date: "15 เม.ย. 2023",
      readTime: "5 นาที",
      category: "การผลิต",
      slug: "5-ways-to-improve-production-with-oee",
    },
    {
      id: "2",
      title: "อุตสาหกรรม 4.0 และอนาคตของการผลิต",
      excerpt:
        "อุตสาหกรรม 4.0 กำลังเปลี่ยนแปลงวิธีการทำงานของโรงงานผลิต ด้วยการนำเทคโนโลยีดิจิทัลและการเชื่อมต่อมาใช้ บทความนี้จะอธิบายว่าการเปลี่ยนแปลงนี้จะส่งผลต่ออนาคตของการผลิตอย่างไร",
      fullContent:
        "อุตสาหกรรม 4.0 กำลังเปลี่ยนแปลงวิธีการทำงานของโรงงานผลิต ด้วยการนำเทคโนโลยีดิจิทัลและการเชื่อมต่อมาใช้ บทความนี้จะอธิบายว่าการเปลี่ยนแปลงนี้จะส่งผลต่ออนาคตของการผลิตอย่างไร\n\nอุตสาหกรรม 4.0 คืออะไร?\nอุตสาหกรรม 4.0 หรือการปฏิวัติอุตสาหกรรมครั้งที่ 4 หมายถึงการบูรณาการเทคโนโลยีดิจิทัลเข้ากับกระบวนการผลิต เช่น Internet of Things (IoT), ปัญญาประดิษฐ์ (AI), การวิเคราะห์ข้อมูลขนาดใหญ่ (Big Data Analytics) และระบบอัตโนมัติ เพื่อสร้างโรงงานอัจฉริยะที่มีประสิทธิภาพและความยืดหยุ่นสูง\n\nเทคโนโลยีหลักของอุตสาหกรรม 4.0\n1. Internet of Things (IoT): เซ็นเซอร์และอุปกรณ์ที่เชื่อมต่อกันช่วยให้เครื่องจักรสามารถสื่อสารและแลกเปลี่ยนข้อมูลระหว่างกันได้\n2. ปัญญาประดิษฐ์ (AI) และการเรียนรู้ของเครื่อง (Machine Learning): ช่วยในการวิเคราะห์ข้อมูลและการตัดสินใจอัตโนมัติ\n3. Digital Twin: การจำลองดิจิทัลของเครื่องจักรหรือกระบวนการผลิตที่ช่วยในการทดสอบและปรับปรุงประสิทธิภาพ\n4. ระบบอัตโนมัติและหุ่นยนต์: ช่วยลดการพึ่งพาแรงงานมนุษย์และเพิ่มความแม่นยำในการผลิต\n\nประโยชน์ของอุตสาหกรรม 4.0\n1. เพิ่มประสิทธิภาพการผลิต: การใช้ระบบอัตโนมัติและการวิเคราะห์ข้อมูลช่วยลดเวลาและต้นทุนการผลิต\n2. ความยืดหยุ่นสูง: สามารถปรับเปลี่ยนกระบวนการผลิตได้อย่างรวดเร็วตามความต้องการของตลาด\n3. คุณภาพสินค้าที่ดีขึ้น: การตรวจสอบคุณภาพอัตโนมัติช่วยลดข้อผิดพลาดและเพิ่มความสม่ำเสมอของผลิตภัณฑ์\n4. การบำรุงรักษาเชิงป้องกัน: การวิเคราะห์ข้อมูลช่วยคาดการณ์เมื่อเครื่องจักรจะต้องการการบำรุงรักษา ลดเวลาหยุดทำงานที่ไม่ได้วางแผนไว้\n\nความท้าทายและการเตรียมพร้อม\n1. การลงทุนด้านเทคโนโลยี: การนำอุตสาหกรรม 4.0 มาใช้ต้องการการลงทุนด้านเทคโนโลยีและโครงสร้างพื้นฐาน\n2. การพัฒนาทักษะแรงงาน: แรงงานต้องได้รับการฝึกอบรมเพื่อทำงานร่วมกับเทคโนโลยีใหม่\n3. ความปลอดภัยทางไซเบอร์: การเชื่อมต่อระบบเข้าด้วยกันเพิ่มความเสี่ยงด้านความปลอดภัยทางไซเบอร์\n\nอนาคตของการผลิต\nอุตสาหกรรม 4.0 จะนำไปสู่โรงงานอัจฉริยะที่สามารถปรับตัวได้ตามความต้องการของตลาดและมีประสิทธิภาพสูง การผลิตจะมีความยืดหยุ่นมากขึ้น สามารถผลิตสินค้าที่ปรับแต่งตามความต้องการของลูกค้าได้ในต้นทุนที่ใกล้เคียงกับการผลิตแบบมาตรฐาน\n\nการเตรียมพร้อมสำหรับอุตสาหกรรม 4.0 เป็นสิ่งสำคัญสำหรับผู้ผลิตที่ต้องการรักษาความสามารถในการแข่งขันในตลาดโลก ผู้ที่สามารถปรับตัวและนำเทคโนโลยีใหม่มาใช้ได้อย่างมีประสิทธิภาพจะเป็นผู้นำในอุตสาหกรรมการผลิตในอนาคต",
      imageUrls: ["/interconnected-factory.png"],
      date: "2 มี.ค. 2023",
      readTime: "8 นาที",
      category: "เทคโนโลยี",
      slug: "industry-4-0-and-the-future-of-manufacturing",
    },
    {
      id: "3",
      title: "การบำรุงรักษาเชิงป้องกันและการลดเวลาหยุดทำงานของเครื่องจักร",
      excerpt:
        "การบำรุงรักษาเชิงป้องกันเป็นกลยุทธ์สำคัญในการลดเวลาหยุดทำงานของเครื่องจักรและเพิ่มประสิทธิภาพการผลิต บทความนี้จะแนะนำวิธีการวางแผนและดำเนินการบำรุงรักษาเชิงป้องกันที่มีประสิทธิภาพ",
      fullContent:
        "การบำรุงรักษาเชิงป้องกันเป็นกลยุทธ์สำคัญในการลดเวลาหยุดทำงานของเครื่องจักรและเพิ่มประสิทธิภาพการผลิต บทความนี้จะแนะนำวิธีการวางแผนและดำเนินการบำรุงรักษาเชิงป้องกันที่มีประสิทธิภาพ\n\nความสำคัญของการบำรุงรักษาเชิงป้องกัน\nการบำรุงรักษาเชิงป้องกันเป็นการดำเนินการตรวจสอบ ทดสอบ และซ่อมบำรุงเครื่องจักรตามแผนที่กำหนดไว้ล่วงหน้า เพื่อป้องกันไม่ให้เกิดความเสียหายหรือการหยุดทำงานโดยไม่ได้วางแผน การบำรุงรักษาเชิงป้องกันช่วยยืดอายุการใช้งานของเครื่องจักร ลดต้นทุนการซ่อมแซม และเพิ่มประสิทธิภาพการผลิตโดยรวม\n\nประเภทของการบำรุงรักษาเชิงป้องกัน\n1. การบำรุงรักษาตามระยะเวลา: การดำเนินการบำรุงรักษาตามตารางเวลาที่กำหนดไว้ เช่น ทุกสัปดาห์ ทุกเดือน หรือทุกไตรมาส\n2. การบำรุงรักษาตามสภาพ: การตรวจสอบสภาพของเครื่องจักรและดำเนินการบำรุงรักษาเมื่อพบสัญญาณของการเสื่อมสภาพ\n3. การบำรุงรักษาเชิงทำนาย: การใช้เทคโนโลยีและการวิเคราะห์ข้อมูลเพื่อคาดการณ์เมื่อเครื่องจักรจะต้องการการบำรุงรักษา\n\nขั้นตอนการวางแผนการบำรุงรักษาเชิงป้องกัน\n1. จัดทำรายการเครื่องจักรและอุปกรณ์ทั้งหมด: ระบุเครื่องจักรและอุปกรณ์ทั้งหมดที่ต้องการการบำรุงรักษา\n2. กำหนดความสำคัญ: จัดลำดับความสำคัญของเครื่องจักรตามผลกระทบต่อการผลิตและความเสี่ยงของการเสียหาย\n3. กำหนดกิจกรรมการบำรุงรักษา: ระบุกิจกรรมการบำรุงรักษาที่จำเป็นสำหรับแต่ละเครื่องจักร\n4. กำหนดความถี่: กำหนดความถี่ของการบำรุงรักษาตามคำแนะนำของผู้ผลิต ประสบการณ์ และข้อมูลการใช้งาน\n5. จัดสรรทรัพยากร: กำหนดทรัพยากรที่จำเป็น เช่น บุคลากร เครื่องมือ และอะไหล่\n6. จัดทำตารางการบำรุงรักษา: จัดทำตารางการบำรุงรักษาที่ละเอียดและชัดเจน\n7. ติดตามและประเมินผล: ติดตามประสิทธิภาพของแผนการบำรุงรักษาและปรับปรุงตามความจำเป็น\n\nเทคโนโลยีที่ช่วยในการบำรุงรักษาเชิงป้องกัน\n1. ระบบการจัดการการบำรุงรักษาด้วยคอมพิวเตอร์ (CMMS): ช่วยในการจัดการและติดตามกิจกรรมการบำรุงรัก",
      imageUrls: ["/industrial-maintenance-team.png"],
      date: "18 ก.พ. 2023",
      readTime: "6 นาที",
      category: "การบำรุงรักษา",
      slug: "preventive-maintenance-and-reducing-machine-downtime",
    },
    {
      id: "4",
      title: "การวิเคราะห์ข้อมูลในอุตสาหกรรมการผลิต",
      excerpt:
        "การวิเคราะห์ข้อมูลเป็นเครื่องมือสำคัญในการปรับปรุงกระบวนการผลิต บทความนี้จะอธิบายวิธีการใช้การวิเคราะห์ข้อมูลเพื่อค้นหาโอกาสในการปรับปรุงและเพิ่มประสิทธิภาพการผลิต",
      fullContent:
        "การวิเคราะห์ข้อมูลเป็นเครื่องมือสำคัญในการปรับปรุงกระบวนการผลิต บทความนี้จะอธิบายวิธีการใช้การวิเคราะห์ข้อมูลเพื่อค้นหาโอกาสในการปรับปรุงและเพิ่มประสิทธิภาพการผลิต\n\nความสำคัญของการวิเคราะห์ข้อมูล\nการวิเคราะห์ข้อมูลช่วยให้ผู้ผลิตสามารถเข้าใจกระบวนการผลิตของตนได้ดีขึ้น โดยการรวบรวมและวิเคราะห์ข้อมูลจากแหล่งต่างๆ เช่น เซ็นเซอร์เครื่องจักร ระบบควบคุม และฐานข้อมูลการผลิต ผู้ผลิตสามารถระบุปัญหา คอขวด และโอกาสในการปรับปรุงประสิทธิภาพ\n\nประเภทของการวิเคราะห์ข้อมูล\n1. การวิเคราะห์เชิงพรรณนา: การสรุปข้อมูลในอดีตเพื่อทำความเข้าใจสิ่งที่เกิดขึ้น\n2. การวิเคราะห์เชิงวินิจฉัย: การหาสาเหตุของปัญหาหรือเหตุการณ์ที่เกิดขึ้น\n3. การวิเคราะห์เชิงทำนาย: การใช้ข้อมูลในอดีตเพื่อคาดการณ์สิ่งที่อาจเกิดขึ้นในอนาคต\n4. การวิเคราะห์เชิงแนะนำ: การแนะนำวิธีการแก้ไขปัญหาหรือปรับปรุงประสิทธิภาพ\n\nเครื่องมือและเทคโนโลยีที่ใช้ในการวิเคราะห์ข้อมูล\n1. ระบบการจัดการฐานข้อมูล (DBMS): ใช้ในการจัดเก็บและจัดการข้อมูล\n2. เครื่องมือการวิเคราะห์ข้อมูล (Data Analytics Tools): ใช้ในการวิเคราะห์และแสดงผลข้อมูล\n3. ปัญญาประดิษฐ์ (AI) และการเรียนรู้ของเครื่อง (Machine Learning): ใช้ในการวิเคราะห์ข้อมูลที่ซับซ้อนและคาดการณ์แนวโน้ม\n\nขั้นตอนการวิเคราะห์ข้อมูล\n1. รวบรวมข้อมูล: รวบรวมข้อมูลจากแหล่งต่างๆ ที่เกี่ยวข้อง\n2. ทำความสะอาดข้อมูล: ลบข้อมูลที่ไม่ถูกต้องหรือไม่สมบูรณ์\n3. วิเคราะห์ข้อมูล: ใช้เครื่องมือและเทคนิคต่างๆ ในการวิเคราะห์ข้อมูล\n4. สรุปผล: สรุปผลการวิเคราะห์และนำเสนอในรูปแบบที่เข้าใจง่าย\n5. นำไปใช้: นำผลการวิเคราะห์ไปใช้ในการปรับปรุงกระบวนการผลิต\n\nประโยชน์ของการวิเคราะห์ข้อมูล\n1. เพิ่มประสิทธิภาพการผลิต: การวิเคราะห์ข้อมูลช่วยให้ผู้ผลิตสามารถระบุและแก้ไขปัญหาที่ส่งผลกระทบต่อประสิทธิภาพการผลิต\n2. ลดต้นทุน: การวิเคราะห์ข้อมูลช่วยให้ผู้ผลิตสามารถลดต้นทุนการผลิตโดยการปรับปรุงกระบวนการและลดความสูญเปล่า\n3. ปรับปรุงคุณภาพ: การวิเคราะห์ข้อมูลช่วยให้ผู้ผลิตสามารถปรับปรุงคุณภาพของผลิตภัณฑ์โดยการระบุและแก้ไขข้อบกพร่อง\n4. ตัดสินใจได้ดีขึ้น: การวิเคราะห์ข้อมูลช่วยให้ผู้ผลิตสามารถตัดสินใจได้ดีขึ้นโดยการมีข้อมูลที่ถูกต้องและเป็นปัจจุบัน",
      imageUrls: ["/data-insights-dashboard.png"],
      date: "5 ม.ค. 2023",
      readTime: "7 นาที",
      category: "ข้อมูล",
      slug: "data-analytics-in-manufacturing",
    },
    {
      id: "5",
      title: "การลดต้นทุนการผลิตด้วยเทคโนโลยีอัตโนมัติ",
      excerpt:
        "เทคโนโลยีอัตโนมัติสามารถช่วยลดต้นทุนการผลิตได้อย่างมีประสิทธิภาพ บทความนี้จะแนะนำวิธีการนำเทคโนโลยีอัตโนมัติมาใช้ในกระบวนการผลิตเพื่อลดต้นทุนและเพิ่มประสิทธิภาพ",
      fullContent:
        "เทคโนโลยีอัตโนมัติสามารถช่วยลดต้นทุนการผลิตได้อย่างมีประสิทธิภาพ บทความนี้จะแนะนำวิธีการนำเทคโนโลยีอัตโนมัติมาใช้ในกระบวนการผลิตเพื่อลดต้นทุนและเพิ่มประสิทธิภาพ\n\nความสำคัญของเทคโนโลยีอัตโนมัติ\nเทคโนโลยีอัตโนมัติช่วยลดการพึ่งพาแรงงานมนุษย์และเพิ่มความแม่นยำในการผลิต โดยการใช้เครื่องจักรและระบบควบคุมอัตโนมัติ ผู้ผลิตสามารถลดต้นทุนการผลิต ปรับปรุงคุณภาพ และเพิ่มประสิทธิภาพโดยรวม\n\nประเภทของเทคโนโลยีอัตโนมัติ\n1. หุ่นยนต์อุตสาหกรรม: ใช้ในการทำงานที่ซ้ำซากและอันตราย\n2. ระบบควบคุมอัตโนมัติ: ใช้ในการควบคุมและตรวจสอบกระบวนการผลิต\n3. ระบบการจัดการการผลิต (MES): ใช้ในการวางแผนและควบคุมการผลิต\n4. ระบบการจัดการคลังสินค้าอัตโนมัติ (AS/RS): ใช้ในการจัดการและจัดเก็บสินค้า\n\nขั้นตอนการนำเทคโนโลยีอัตโนมัติมาใช้\n1. ประเมินความต้องการ: ประเมินความต้องการของธุรกิจและระบุพื้นที่ที่สามารถปรับปรุงได้ด้วยเทคโนโลยีอัตโนมัติ\n2. เลือกเทคโนโลยี: เลือกเทคโนโลยีที่เหมาะสมกับความต้องการและงบประมาณ\n3. วางแผนการติดตั้ง: วางแผนการติดตั้งและกำหนดตารางเวลา\n4. ติดตั้งและทดสอบ: ติดตั้งและทดสอบระบบ\n5. ฝึกอบรม: ฝึกอบรมพนักงานให้สามารถใช้งานระบบได้อย่างมีประสิทธิภาพ\n6. ติดตามและประเมินผล: ติดตามประสิทธิภาพของระบบและปรับปรุงตามความจำเป็น\n\nประโยชน์ของเทคโนโลยีอัตโนมัติ\n1. ลดต้นทุนการผลิต: เทคโนโลยีอัตโนมัติช่วยลดต้นทุนแรงงานและวัสดุ\n2. ปรับปรุงคุณภาพ: เทคโนโลยีอัตโนมัติช่วยลดข้อผิดพลาดและเพิ่มความสม่ำเสมอของผลิตภัณฑ์\n3. เพิ่มประสิทธิภาพ: เทคโนโลยีอัตโนมัติช่วยเพิ่มประสิทธิภาพการผลิตโดยการลดเวลาและเพิ่มผลผลิต\n4. ปรับปรุงความปลอดภัย: เทคโนโลยีอัตโนมัติช่วยปรับปรุงความปลอดภัยในการทำงานโดยการลดความเสี่ยงของการเกิดอุบัติเหตุ\n\nความท้าทายในการนำเทคโนโลยีอัตโนมัติมาใช้\n1. ต้นทุนสูง: การลงทุนในเทคโนโลยีอัตโนมัติอาจมีต้นทุนสูง\n2. ความซับซ้อน: เทคโนโลยีอัตโนมัติอาจมีความซับซ้อนและต้องการความเชี่ยวชาญในการใช้งาน\n3. การเปลี่ยนแปลง: การนำเทคโนโลยีอัตโนมัติมาใช้ต้องมีการเปลี่ยนแปลงในกระบวนการทำงานและวัฒนธรรมองค์กร",
      imageUrls: ["/interconnected-automation.png"],
      date: "20 ธ.ค. 2022",
      readTime: "5 นาที",
      category: "เทคโนโลยี",
      slug: "reducing-production-costs-with-automation",
    },
    {
      id: "6",
      title: "การจัดการห่วงโซ่อุปทานในยุคดิจิทัล",
      excerpt:
        "การจัดการห่วงโซ่อุปทานที่มีประสิทธิภาพเป็นสิ่งสำคัญในการเพิ่มประสิทธิภาพการผลิต บทความนี้จะอธิบายวิธีการใช้เทคโนโลยีดิจิทัลในการจัดการห่วงโซ่อุปทาน",
      fullContent:
        "การจัดการห่วงโซ่อุปทานที่มีประสิทธิภาพเป็นสิ่งสำคัญในการเพิ่มประสิทธิภาพการผลิต บทความนี้จะอธิบายวิธีการใช้เทคโนโลยีดิจิทัลในการจัดการห่วงโซ่อุปทาน\n\nความสำคัญของการจัดการห่วงโซ่อุปทาน\nการจัดการห่วงโซ่อุปทานเป็นการจัดการกระบวนการทั้งหมดที่เกี่ยวข้องกับการผลิตและจัดส่งสินค้า ตั้งแต่การจัดหาวัตถุดิบ การผลิต การจัดเก็บ การขนส่ง และการจัดจำหน่าย การจัดการห่วงโซ่อุปทานที่มีประสิทธิภาพช่วยลดต้นทุน ปรับปรุงคุณภาพ และเพิ่มความพึงพอใจของลูกค้า\n\nเทคโนโลยีดิจิทัลที่ใช้ในการจัดการห่วงโซ่อุปทาน\n1. ระบบการวางแผนทรัพยากรขององค์กร (ERP): ใช้ในการจัดการข้อมูลและกระบวนการทางธุรกิจ\n2. ระบบการจัดการคลังสินค้า (WMS): ใช้ในการจัดการและควบคุมคลังสินค้า\n3. ระบบการจัดการการขนส่ง (TMS): ใช้ในการวางแผนและควบคุมการขนส่ง\n4. ระบบการติดตามและตรวจสอบ (Tracking and Tracing Systems): ใช้ในการติดตามและตรวจสอบสินค้า\n5. การวิเคราะห์ข้อมูล (Data Analytics): ใช้ในการวิเคราะห์ข้อมูลและปรับปรุงประสิทธิภาพ\n\nขั้นตอนการจัดการห่วงโซ่อุปทาน\n1. วางแผน: วางแผนความต้องการของลูกค้าและกำหนดเป้าหมาย\n2. จัดหา: จัดหาวัตถุดิบและส่วนประกอบ\n3. ผลิต: ผลิตสินค้า\n4. จัดเก็บ: จัดเก็บสินค้า\n5. ขนส่ง: ขนส่งสินค้า\n6. จัดจำหน่าย: จัดจำหน่ายสินค้า\n\nประโยชน์ของการจัดการห่วงโซ่อุปทานในยุคดิจิทัล\n1. ลดต้นทุน: การใช้เทคโนโลยีดิจิทัลช่วยลดต้นทุนการผลิตและการขนส่ง\n2. ปรับปรุงคุณภาพ: การใช้เทคโนโลยีดิจิทัลช่วยลดข้อผิดพลาดและเพิ่มความสม่ำเสมอของผลิตภัณฑ์\n3. เพิ่มประสิทธิภาพ: การใช้เทคโนโลยีดิจิทัลช่วยเพิ่มประสิทธิภาพการผลิตและการขนส่ง\n4. ปรับปรุงความพึงพอใจของลูกค้า: การใช้เทคโนโลยีดิจิทัลช่วยปรับปรุงความพึงพอใจของลูกค้าโดยการจัดส่งสินค้าที่รวดเร็วและถูกต้อง\n\nความท้าทายในการจัดการห่วงโซ่อุปทานในยุคดิจิทัล\n1. ความซับซ้อน: การจัดการห่วงโซ่อุปทานอาจมีความซับซ้อนและต้องการความเชี่ยวชาญ\n2. การเปลี่ยนแปลง: การนำเทคโนโลยีดิจิทัลมาใช้ต้องมีการเปลี่ยนแปลงในกระบวนการทำงานและวัฒนธรรมองค์กร\n3. ความปลอดภัย: การรักษาความปลอดภัยของข้อมูลเป็นสิ่งสำคัญ",
      imageUrls: ["/global-network.png"],
      date: "10 พ.ย. 2022",
      readTime: "6 นาที",
      category: "ซัพพลายเชน",
      slug: "digital-supply-chain-management",
    },
    {
      id: "7",
      title: "การใช้ AI ในการคาดการณ์การบำรุงรักษา",
      excerpt:
        "ปัญญาประดิษฐ์ (AI) สามารถช่วยในการคาดการณ์เมื่อเครื่องจักรจะต้องการการบำรุงรักษา บทความนี้จะอธิบายวิธีการใช้ AI ในการคาดการณ์การบำรุงรักษาเพื่อลดเวลาหยุดทำงานของเครื่องจักร",
      fullContent:
        "ปัญญาประดิษฐ์ (AI) สามารถช่วยในการคาดการณ์เมื่อเครื่องจักรจะต้องการการบำรุงรักษา บทความนี้จะอธิบายวิธีการใช้ AI ในการคาดการณ์การบำรุงรักษาเพื่อลดเวลาหยุดทำงานของเครื่องจักร\n\nความสำคัญของการคาดการณ์การบำรุงรักษา\nการคาดการณ์การบำรุงรักษาช่วยให้ผู้ผลิตสามารถวางแผนการบำรุงรักษาได้อย่างมีประสิทธิภาพ โดยการคาดการณ์เมื่อเครื่องจักรจะต้องการการบำรุงรักษา ผู้ผลิตสามารถลดเวลาหยุดทำงาน ลดต้นทุนการซ่อมแซม และเพิ่มประสิทธิภาพการผลิต\n\nวิธีการใช้ AI ในการคาดการณ์การบำรุงรักษา\n1. รวบรวมข้อมูล: รวบรวมข้อมูลจากเซ็นเซอร์เครื่องจักร ระบบควบคุม และฐานข้อมูลการผลิต\n2. วิเคราะห์ข้อมูล: ใช้ AI และการเรียนรู้ของเครื่องในการวิเคราะห์ข้อมูลและระบุรูปแบบ\n3. สร้างแบบจำลอง: สร้างแบบจำลองที่สามารถคาดการณ์เมื่อเครื่องจักรจะต้องการการบำรุงรักษา\n4. ทดสอบแบบจำลอง: ทดสอบแบบจำลองและปรับปรุงตามความจำเป็น\n5. นำไปใช้: นำแบบจำลองไปใช้ในการวางแผนการบำรุงรักษา\n\nประโยชน์ของการใช้ AI ในการคาดการณ์การบำรุงรักษา\n1. ลดเวลาหยุดทำงาน: การคาดการณ์การบำรุงรักษาช่วยลดเวลาหยุดทำงานโดยการวางแผนการบำรุงรักษาล่วงหน้า\n2. ลดต้นทุน: การคาดการณ์การบำรุงรักษาช่วยลดต้นทุนการซ่อมแซมโดยการป้องกันความเสียหาย\n3. เพิ่มประสิทธิภาพ: การคาดการณ์การบำรุงรักษาช่วยเพิ่มประสิทธิภาพการผลิตโดยการลดเวลาหยุดทำงาน\n4. ปรับปรุงความปลอดภัย: การคาดการณ์การบำรุงรักษาช่วยปรับปรุงความปลอดภัยในการทำงานโดยการป้องกันอุบัติเหตุ\n\nความท้าทายในการใช้ AI ในการคาดการณ์การบำรุงรักษา\n1. ข้อมูล: การใช้ AI ต้องการข้อมูลจำนวนมากและมีคุณภาพสูง\n2. ความเชี่ยวชาญ: การใช้ AI ต้องการความเชี่ยวชาญในการวิเคราะห์ข้อมูลและการสร้างแบบจำลอง\n3. การเปลี่ยนแปลง: การนำ AI มาใช้ต้องมีการเปลี่ยนแปลงในกระบวนการทำงานและวัฒนธรรมองค์กร",
      imageUrls: ["/ai-maintenance-team.png"],
      date: "5 ต.ค. 2022",
      readTime: "8 นาที",
      category: "AI",
      slug: "using-ai-for-predictive-maintenance",
    },
    {
      id: "8",
      title: "การเพิ่มประสิทธิภาพการผลิตด้วย Lean Manufacturing",
      excerpt:
        "Lean Manufacturing เป็นแนวคิดที่มุ่งเน้นการลดความสูญเปล่าในกระบวนการผลิต บทความนี้จะแนะนำหลักการของ Lean Manufacturing และวิธีการนำมาใช้ในโรงงานของคุณ",
      fullContent:
        "Lean Manufacturing เป็นแนวคิดที่มุ่งเน้นการลดความสูญเปล่าในกระบวนการผลิต บทความนี้จะแนะนำหลักการของ Lean Manufacturing และวิธีการนำมาใช้ในโรงงานของคุณ\n\nหลักการของ Lean Manufacturing\n1. ระบุคุณค่า: ระบุคุณค่าที่ลูกค้าต้องการ\n2. สร้างแผนผังกระแสคุณค่า: สร้างแผนผังกระแสคุณค่าเพื่อระบุขั้นตอนที่สร้างคุณค่าและขั้นตอนที่ไม่สร้างคุณค่า\n3. สร้างกระแส: สร้างกระแสการผลิตที่ราบรื่น\n4. ดึง: ให้ลูกค้าดึงสินค้าผ่านกระบวนการผลิต\n5. มุ่งสู่ความสมบูรณ์แบบ: ปรับปรุงอย่างต่อเนื่อง\n\nเครื่องมือและเทคนิคที่ใช้ใน Lean Manufacturing\n1. 5S: ใช้ในการจัดระเบียบและทำความสะอาดสถานที่ทำงาน\n2. Kaizen: ใช้ในการปรับปรุงอย่างต่อเนื่อง\n3. Kanban: ใช้ในการควบคุมการผลิต\n4. Poka-yoke: ใช้ในการป้องกันข้อผิดพลาด\n5. Value Stream Mapping: ใช้ในการสร้างแผนผังกระแสคุณค่า\n\nขั้นตอนการนำ Lean Manufacturing มาใช้\n1. ประเมินสถานการณ์ปัจจุบัน: ประเมินสถานการณ์ปัจจุบันและระบุพื้นที่ที่สามารถปรับปรุงได้\n2. กำหนดเป้าหมาย: กำหนดเป้าหมายที่ชัดเจนและวัดผลได้\n3. วางแผน: วางแผนการดำเนินการ\n4. ดำเนินการ: ดำเนินการตามแผน\n5. ติดตามและประเมินผล: ติดตามและประเมินผลและปรับปรุงตามความจำเป็น\n\nประโยชน์ของ Lean Manufacturing\n1. ลดต้นทุน: Lean Manufacturing ช่วยลดต้นทุนการผลิตโดยการลดความสูญเปล่า\n2. ปรับปรุงคุณภาพ: Lean Manufacturing ช่วยปรับปรุงคุณภาพของผลิตภัณฑ์โดยการลดข้อผิดพลาด\n3. เพิ่มประสิทธิภาพ: Lean Manufacturing ช่วยเพิ่มประสิทธิภาพการผลิตโดยการลดเวลาและเพิ่มผลผลิต\n4. ปรับปรุงความพึงพอใจของลูกค้า: Lean Manufacturing ช่วยปรับปรุงความพึงพอใจของลูกค้าโดยการจัดส่งสินค้าที่รวดเร็วและถูกต้อง\n\nความท้าทายในการนำ Lean Manufacturing มาใช้\n1. การเปลี่ยนแปลง: การนำ Lean Manufacturing มาใช้ต้องมีการเปลี่ยนแปลงในกระบวนการทำงานและวัฒนธรรมองค์กร\n2. ความมุ่งมั่น: การนำ Lean Manufacturing มาใช้ต้องมีความมุ่งมั่นจากผู้บริหารและพนักงาน\n3. การฝึกอบรม: การนำ Lean Manufacturing มาใช้ต้องมีการฝึกอบรมพนักงาน",
      imageUrls: ["/streamlined-workflow.png"],
      date: "15 ก.ย. 2022",
      readTime: "7 นาที",
      category: "การผลิต",
      slug: "improving-efficiency-with-lean-manufacturing",
    },
  ];

  // ใช้ข้อมูลจาก localStorage ถ้ามี หรือใช้ข้อมูลเริ่มต้นถ้าไม่มี
  // const displayTestimonials =testimonials.length > 0 ? testimonials : defaultTestimonials;
  const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs;
  // const displayBlogs = blogs.length > 0 ? blogs : [];

  return (
    <div className="min-h-screen">
      {/* แสดง NavBar ในทุกกรณี */}
      <NavBar setActiveTab={setActiveTab} />

      {/* Home Section */}
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
            <div className="space-y-4 sm:space-y-6 text-center sm:text-right sm:ml-auto max-w-3xl">
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
                text="Factory PRO"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold leading-tight text-white drop-shadow-md"
                type="words"
                animation="slide"
                delay={0.3}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                // className="text-base sm:text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-xl mx-auto sm:ml-auto backdrop-blur-[2px] rounded-lg p-2 "
                className="text-base sm:text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-9xl mx-auto sm:ml-auto backdrop-blur-[2px] rounded-lg p-2"
              >
                <span className="font-bold text-blue-700">Factory PRO</span> คือ
                แพลตฟอร์มอัจฉริยะสำหรับการบริหารจัดการการผลิต ด้วย{" "}
                <span className="font-bold text-blue-700">loT, Big Data</span>{" "}
                และ <span className="font-bold text-blue-700">AI</span>{" "}
                เพื่อเพิ่มประสิทธิกาพ ลดต้นทุน และ รองรับโรงงานยุค 4.0
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
        {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div> */}
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative overflow-hidden min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-gray-100 py-16"
      >
        <div className="container mx-auto px-4 z-10">
          <AnimatedSection className="mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="">
                <AnimatedImage
                  src="/FactoryPRO_02.png"
                  alt="Our Services"
                  width={800}
                  height={100}
                  animation="fade"
                  className="mx-auto h-auto"
                />
              </div>
              {/* <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 rounded-full"></div> */}
              {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg text-gray-600"
        >
          เรามีบริการครบวงจรเพื่อช่วยให้คุณสามารถเพิ่มประสิทธิภาพการผลิตได้อย่างเต็มที่
        </motion.p> */}
            </div>
          </AnimatedSection>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
        </div>

        {/* Floating technology icons with better positioning */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-16 animate-float-slow">
            <div className="bg-blue-500 bg-opacity-20 backdrop-blur-sm p-4 rounded-full">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm-3 6a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2zm-5.793 6.207a1 1 0 011.414-1.414A3.001 3.001 0 0115 15a1 1 0 11-2 0 1 1 0 00-1-1 1 1 0 00-1 1 1 1 0 01-1.793.207z" />
              </svg>
            </div>
          </div>
          <div className="absolute top-1/2 right-16 animate-float-medium">
            <div className="bg-green-500 bg-opacity-20 backdrop-blur-sm p-3 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 2H3a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V3a1 1 0 00-1-1zm-1 18H4V4h16v16z" />
                <path d="M9 8H7v2h2V8zm0 4H7v4h2v-4zm4-4h-2v2h2V8zm0 4h-2v4h2v-4zm4-4h-2v2h2V8zm0 4h-2v4h2v-4z" />
              </svg>
            </div>
          </div>
          <div className="absolute top-2/3 left-1/4 animate-float-fast">
            <div className="bg-purple-500 bg-opacity-20 backdrop-blur-sm p-3 rounded-full">
              <svg
                className="w-7 h-7 text-purple-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </div>
          </div>
          {/* <div className="absolute top-1/3 right-1/4 animate-float-medium">
      <div className="bg-blue-500 bg-opacity-20 backdrop-blur-sm p-3 rounded-full">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
    </div> */}
        </div>

        {/* Hero animation component */}
        <HeroAnimation />

        {/* Main content container */}
        <div className="container relative mx-auto px-4 flex-grow z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full">
            {/* Left column - Vision & Mission */}
            <div className="space-y-6 backdrop-blur-sm bg-white/40 p-8 rounded-xl border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Our Vision
              </h3>
              <p className="text-gray-700">
                ปฏิวัติการผลิตด้วยเทคโนโลยีล้ำสมัย
                เพื่อสร้างอนาคตที่ยั่งยืนและมีประสิทธิภาพสูงสุดสำหรับโรงงานทุกขนาด
              </p>
              <br /> <br />
              <h3 className="text-2xl font-semibold text-blue-700 pt-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Mission
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500 flex-shrink-0 mt-1 bg-green-100 p-1 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>เพิ่มประสิทธิภาพการผลิตแบบก้าวกระโดด</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500 flex-shrink-0 mt-1 bg-green-100 p-1 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>ลดต้นทุนการดำเนินงานอย่างมีนัยสำคัญ</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500 flex-shrink-0 mt-1 bg-green-100 p-1 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>ตัดสินใจบนพื้นฐานของข้อมูลเชิงลึกแบบเรียลไทม์</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500 flex-shrink-0 mt-1 bg-green-100 p-1 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>ก้าวทันการเปลี่ยนแปลงของอุตสาหกรรม 4.0</span>
                </li>
              </ul>
              <br />
              <br /> <br />
              <div className="pt-6 mt-2 border-t border-gray-100">
                <p className="italic text-gray-600">
                  Factory PRO ไม่ใช่เพียงแค่ซอฟต์แวร์
                  แต่เป็นพันธมิตรที่จะช่วยให้ธุรกิจของคุณเติบโตอย่างชาญฉลาดและยั่งยืน
                </p>
              </div>
            </div>

            {/* Right column - Main title and description */}
            <AnimatedSection
              className="order-1 lg:order-2"
              delay={0.4}
              direction="right"
            >
              <div className="relative">
                {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-30"></div> */}
                <div className="relative overflow-hidden rounded-2xl  transform hover:scale-[1.01] transition-transform duration-300">
                  <AnimatedImage
                    src="/4-steps-hl.png"
                    alt="Factory Pro Engineers Working"
                    width={600}
                    height={400}
                    animation="zoom"
                    delay={0.2}
                  />
                  <br />
                  <AnimatedImage
                    src="/4-steps.png"
                    alt="Factory Pro Engineers Working"
                    width={600}
                    height={400}
                    animation="zoom"
                    delay={0.2}
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Technology features */}
        <div className="container mx-auto px-4 mt-12 mb-6 z-10">
          <div className="backdrop-blur-sm bg-white/50 p-6 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/50 transition-colors duration-200">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">
                    IoT Integration
                  </h4>
                  <p className="text-gray-600 text-sm">
                    เชื่อมต่ออุปกรณ์อัจฉริยะทั่วทั้งโรงงานเพื่อควบคุมและติดตามแบบเรียลไทม์
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/50 transition-colors duration-200">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">
                    Big Data Analytics
                  </h4>
                  <p className="text-gray-600 text-sm">
                    วิเคราะห์ข้อมูลขนาดใหญ่อย่างชาญฉลาดเพื่อหาแนวทางการปรับปรุงที่มีประสิทธิภาพ
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-white/50 transition-colors duration-200">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">
                    AI Optimization
                  </h4>
                  <p className="text-gray-600 text-sm">
                    ปรับปรุงกระบวนการด้วยปัญญาประดิษฐ์ที่เรียนรู้และพัฒนาตัวเองอย่างต่อเนื่อง
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>

        {/* Add this to your CSS for animations */}
        <style jsx>{`
          .bg-grid-pattern {
            background-image: radial-gradient(
              rgba(0, 0, 150, 0.1) 1px,
              transparent 1px
            );
            background-size: 20px 20px;
          }

          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes float-medium {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }

          @keyframes float-fast {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }

          .animate-float-medium {
            animation: float-medium 4.5s ease-in-out infinite;
          }

          .animate-float-fast {
            animation: float-fast 3s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Platform Section with Tabs */}
      {/* <section className="py-12 sm:py-16 md:py-20 bg-blue-300 text-white relative overflow-hidden"> */}
      <section
        className={`py-12 sm:py-16 md:py-20 ${
          activeTab === "FacWMS"
            ? "bg-orange-300"
            : activeTab === "FacGreen"
            ? "bg-green-300"
            : activeTab === "FacOEE"
            ? "bg-blue-300"
            : "bg-white-300"
        } text-white relative overflow-hidden`}
      >
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
          <span id="FacOEE" className="section-anchor"></span>
          <span id="FacWMS" className="section-anchor"></span>
          <span id="FacGreen" className="section-anchor"></span>
          <div className="container mx-auto px-4 overflow-hidden">
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
                title: "การติดตั้งระบบและอบรม",
                description:
                  "บริการติดตั้งและตั้งค่าระบบ Factory Pro ให้เหมาะสมกับความต้องการของธุรกิจคุณ",
                delay: 0.2,
              },
              {
                image: "/images/service2.png",
                title: "ทีมงานผู้เชี่ยวชาญ",
                description:
                  "บริการให้คำปรึกษาเพื่อช่วยให้คุณสามารถใช้ประโยชน์จากข้อมูล OEE ในการปรับปรุงกระบวนการผลิต",
                delay: 0.4,
              },
              {
                image: "/images/service3.png",
                title: "บริการหลังการขาย",
                description:
                  "บริการฝึกอบรมทีมงานของคุณให้สามารถใช้งานระบบได้อย่างมีประสิทธิภาพ พร้อมการสนับสนุนตลอด 24/7",
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
                      alt={service.title || "Service"}
                      width={200}
                      height={200}
                      className="w-auto h-auto"
                    />
                  </motion.div>
                  {/* <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {service.title}
                  </h3> */}
                  {/* <p className="text-gray-600 text-center">
                    {service.description}
                  </p> */}
                </CardContent>
              </AnimatedSection>
            ))}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </section>

      {/* Package Section */}
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
                  ปรึกษาและขอคำเเนะนำจากเรา
                </h2>
                <div className="h-1 w-20 bg-white mb-6 rounded-full"></div>
                <p className="text-lg text-white mb-8">
                  กรอกข้อมูลของคุณเพื่อรับการติดต่อกลับจากทีมงานของเรา
                  เราพร้อมให้คำปรึกษาและช่วยเหลือคุณในการเลือกแพ็คเกจที่เหมาะสมกับธุรกิจของคุณ
                </p>

                <div className="bg-white/90 p-6 rounded-xl border border-white/20 mb-8 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    ทำไมต้องเลือก Factory Pro?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "เพิ่มประสิทธิภาพการผลิตแบบก้าวกระโดด",
                      "ลดต้นทุนการดำเนินงานอย่างมีนัยสำคัญ",
                      "ตัดสินใจบนพื้นฐานของข้อมูลเชิงลึกแบบเรียลไทม์",
                      "ก้าวทันการเปลี่ยนแปลงของอุตสาหกรรม 4.0",
                      "การสนับสนุนจากผู้เชี่ยวชาญตลอด 24/7",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* <div className="flex items-center space-x-4">
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
                </div> */}
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
