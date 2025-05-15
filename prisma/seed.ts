import { PrismaClient } from "@prisma/client"

// Initialize Prisma Client
const prisma = new PrismaClient()

async function main() {
  console.log('Starting seeding...')

  // Seed Contacts
  console.log('Seeding contacts...')
  await prisma.contact.deleteMany({})

  const contactsData = [
    {
      name: 'สมชาย ใจดี',
      phone: '0891234567',
      email: 'somchai@example.com',
      company: 'บริษัท xxxxx จำกัด',
      position: 'ผู้จัดการฝ่ายผลิต',
      date: new Date('2023-04-15'),
      isRead: false,
    },
    {
      name: 'วิภา สมบูรณ์',
      phone: '0987654321',
      email: 'wipa@example.com',
      company: 'บริษัท xxxx จำกัด',
      position: 'CEO',
      date: new Date('2023-04-10'),
      isRead: true,
    },
    {
      name: 'ประพันธ์ มั่นคง',
      phone: '0812345678',
      email: 'praphan@example.com',
      company: 'บริษัท xxxx จำกัด',
      position: 'ผู้อำนวยการฝ่ายปฏิบัติการ',
      date: new Date('2023-04-05'),
      isRead: true,
    },
  ]

  for (const contact of contactsData) {
    await prisma.contact.create({ data: contact })
  }
  console.log('Contacts seeded!')

  // Seed Blogs
  console.log('Seeding blogs...')
  await prisma.blog.deleteMany({})

  const blogsData = [
    {
      title: '5 วิธีเพิ่มประสิทธิภาพการผลิตด้วย OEE',
      excerpt: 'การวัดประสิทธิภาพโดยรวมของเครื่องจักร (OEE) เป็นเครื่องมือสำคัญในการปรับปรุงกระบวนการผลิต',
      fullContent: 'การวัดประสิทธิภาพโดยรวมของเครื่องจักร (OEE) เป็นเครื่องมือสำคัญในการปรับปรุงกระบวนการผลิต บทความนี้จะแนะนำ 5 วิธีที่คุณสามารถใช้ OEE เพื่อเพิ่มประสิทธิภาพการผลิตของคุณ\n\n1. การติดตามและวิเคราะห์ข้อมูลแบบเรียลไทม์\nการติดตามข้อมูล OEE แบบเรียลไทม์ช่วยให้คุณสามารถระบุปัญหาและแก้ไขได้ทันที ไม่ต้องรอให้เกิดความเสียหายมากขึ้น ระบบติดตามแบบเรียลไทม์ช่วยให้ผู้จัดการสามารถตัดสินใจได้อย่างรวดเร็วและแม่นยำ',
      imageUrl: '/automated-assembly-line.png',
      date: new Date('2023-04-15'),
      readTime: '5 นาที',
      category: 'การผลิต',
      slug: '5-ways-to-improve-production-with-oee',
    },
    {
      title: 'อุตสาหกรรม 4.0 และอนาคตของการผลิต',
      excerpt: 'อุตสาหกรรม 4.0 กำลังเปลี่ยนแปลงวิธีการทำงานของโรงงานผลิต',
      fullContent: 'อุตสาหกรรม 4.0 กำลังเปลี่ยนแปลงวิธีการทำงานของโรงงานผลิต ด้วยการนำเทคโนโลยีดิจิทัลและการเชื่อมต่อมาใช้ บทความนี้จะอธิบายว่าการเปลี่ยนแปลงนี้จะส่งผลต่ออนาคตของการผลิตอย่างไร\n\nอุตสาหกรรม 4.0 คืออะไร?\nอุตสาหกรรม 4.0 หรือการปฏิวัติอุตสาหกรรมครั้งที่ 4 หมายถึงการบูรณาการเทคโนโลยีดิจิทัลเข้ากับกระบวนการผลิต เช่น Internet of Things (IoT), ปัญญาประดิษฐ์ (AI), การวิเคราะห์ข้อมูลขนาดใหญ่ (Big Data Analytics) และระบบอัตโนมัติ เพื่อสร้างโรงงานอัจฉริยะที่มีประสิทธิภาพและความยืดหยุ่นสูง',
      imageUrl: '/interconnected-factory.png',
      date: new Date('2023-03-02'),
      readTime: '8 นาที',
      category: 'เทคโนโลยี',
      slug: 'industry-4-0-and-the-future-of-manufacturing',
    },
    {
      title: 'การบำรุงรักษาเชิงป้องกันและการลดเวลาหยุดทำงานของเครื่องจักร',
      excerpt: 'การบำรุงรักษาเชิงป้องกันเป็นกลยุทธ์สำคัญในการลดเวลาหยุดทำงานของเครื่องจักร',
      fullContent: 'การบำรุงรักษาเชิงป้องกันเป็นกลยุทธ์สำคัญในการลดเวลาหยุดทำงานของเครื่องจักรและเพิ่มประสิทธิภาพการผลิต บทความนี้จะแนะนำวิธีการวางแผนและดำเนินการบำรุงรักษาเชิงป้องกันที่มีประสิทธิภาพ\n\nความสำคัญของการบำรุงรักษาเชิงป้องกัน\nการบำรุงรักษาเชิงป้องกันเป็นการดำเนินการตรวจสอบ ทดสอบ และซ่อมบำรุงเครื่องจักรตามแผนที่กำหนดไว้ล่วงหน้า เพื่อป้องกันไม่ให้เกิดความเสียหายหรือการหยุดทำงานโดยไม่ได้วางแผน',
      imageUrl: '/industrial-maintenance-team.png',
      date: new Date('2023-02-18'),
      readTime: '6 นาที',
      category: 'การบำรุงรักษา',
      slug: 'preventive-maintenance-and-reducing-machine-downtime',
    },
  ]

  for (const blog of blogsData) {
    await prisma.blog.create({ data: blog })
  }
  console.log('Blogs seeded!')

  // Seed Testimonials
  console.log('Seeding testimonials...')
  await prisma.testimonial.deleteMany({})

  const testimonialsData = [
    {
      content: 'Factory Pro ช่วยให้เราสามารถเพิ่มประสิทธิภาพการผลิตได้อย่างมาก เราสามารถติดตามและวิเคราะห์ข้อมูลได้แบบเรียลไทม์ ทำให้แก้ไขปัญหาได้ทันท่วงที',
      fullContent: 'Factory Pro ช่วยให้เราสามารถเพิ่มประสิทธิภาพการผลิตได้อย่างมาก เราสามารถติดตามและวิเคราะห์ข้อมูลได้แบบเรียลไทม์ ทำให้แก้ไขปัญหาได้ทันท่วงที\n\nหลังจากใช้งานมาเป็นเวลา 6 เดือน เราสามารถลดเวลาหยุดเครื่องจักรได้ถึง 15% และเพิ่มผลผลิตได้ 20% โดยไม่ต้องเพิ่มทรัพยากรใดๆ ระบบใช้งานง่าย ทีมงานเข้าใจได้เร็ว และการสนับสนุนจากทีมงาน Factory Pro ก็ยอดเยี่ยมมาก',
      author: 'สมชาย ใจดี',
      position: 'ผู้จัดการฝ่ายผลิต',
      company: 'บริษัท อุตสาหกรรมไทย จำกัด',
      rating: 5,
      avatarUrl: '/thoughtful-portrait.png',
    },
    {
      content: 'ระบบใช้งานง่าย ไม่ซับซ้อน ทีมงานให้การสนับสนุนดีมาก มีการอบรมการใช้งานอย่างละเอียด ทำให้พนักงานของเราสามารถใช้งานได้อย่างมีประสิทธิภาพ',
      fullContent: 'ระบบใช้งานง่าย ไม่ซับซ้อน ทีมงานให้การสนับสนุนดีมาก มีการอบรมการใช้งานอย่างละเอียด ทำให้พนักงานของเราสามารถใช้งานได้อย่างมีประสิทธิภาพ\n\nเราประทับใจมากกับความเอาใจใส่ของทีมงาน Factory Pro ที่คอยช่วยเหลือและแนะนำการใช้งานอย่างใกล้ชิด ทำให้การเปลี่ยนผ่านจากระบบเดิมเป็นไปอย่างราบรื่น ไม่กระทบต่อการผลิต',
      author: 'วิภา สมบูรณ์',
      position: 'CEO',
      company: 'บริษัท ไทยเทค จำกัด',
      rating: 4,
      avatarUrl: '/diverse-group-chatting.png',
    },
    {
      content: 'หลังจากใช้ Factory Pro เรามองเห็นปัญหาในกระบวนการผลิตที่ไม่เคยเห็นมาก่อน ทำให้สามารถปรับปรุงและเพิ่ม OEE ได้ถึง 20% ภายในเวลาเพียง 3 เดือน',
      fullContent: 'หลังจากใช้ Factory Pro เรามองเห็นปัญหาในกระบวนการผลิตที่ไม่เคยเห็นมาก่อน ทำให้สามารถปรับปรุงและเพิ่ม OEE ได้ถึง 20% ภายในเวลาเพียง 3 เดือน\n\nข้อมูลเชิงลึกที่ได้จากระบบช่วยให้เราสามารถระบุคอขวดในกระบวนการผลิตและแก้ไขปัญหาได้อย่างตรงจุด ส่งผลให้ประสิทธิภาพการผลิตโดยรวมเพิ่มขึ้นอย่างมีนัยสำคัญ',
      author: 'ประพันธ์ มั่นคง',
      position: 'ผู้อำนวยการฝ่ายปฏิบัติการ',
      company: 'บริษัท นวัตกรรมการผลิต จำกัด',
      rating: 5,
      avatarUrl: '/diverse-group-meeting.png',
    },
  ]

  for (const testimonial of testimonialsData) {
    await prisma.testimonial.create({ data: testimonial })
  }
  console.log('Testimonials seeded!')

  // Seed Images
  console.log('Seeding images...')
  await prisma.image.deleteMany({})

  const imagesData = [
    {
      url: '/automated-assembly-line.png',
      title: 'Automated Assembly Line',
      description: 'A modern automated assembly line in a factory',
      date: new Date('2023-04-10'),
    },

  ]
}