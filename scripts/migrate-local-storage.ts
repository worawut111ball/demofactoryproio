/**
 * This script migrates data from localStorage to PostgreSQL database
 *
 * Note: This script should be run in a browser environment to access localStorage,
 * or you can export the localStorage data to a JSON file and then import it.
 *
 * Usage:
 * 1. Export localStorage data using browser console
 * 2. Save the exported data to a JSON file
 * 3. Run this script with Node.js: npx ts-node scripts/migrate-local-storage.ts ./localStorage-data.json
 */

import { prisma } from "../lib/prisma"
import fs from "fs"
import path from "path"
import { getDatabaseUrl } from "../lib/db-config"

// Define types based on your localStorage schema
interface LocalStorageContact {
  id: string
  name: string
  phone: string
  email: string
  company: string
  position: string
  date: string
  isRead: boolean
}

interface LocalStorageBlog {
  id: string
  title: string
  excerpt: string
  fullContent?: string
  imageUrl: string
  date: string
  readTime: string
  category: string
  slug: string
}

interface LocalStorageTestimonial {
  id: string
  content: string
  fullContent?: string
  author: string
  position: string
  company: string
  rating: number
  avatarUrl?: string
}

interface LocalStorageImage {
  id: string
  url: string
  title: string
  description: string
  date: string
  blogId: string
}

interface LocalStorageData {
  factory_pro_contacts: LocalStorageContact[]
  factory_pro_blogs: LocalStorageBlog[]
  factory_pro_testimonials: LocalStorageTestimonial[]
  factory_pro_images: LocalStorageImage[]
}

async function migrateData(jsonFilePath: string) {
  try {
    console.log("Database URL:", getDatabaseUrl())

    // Read JSON file
    const rawData = fs.readFileSync(path.resolve(jsonFilePath), "utf-8")
    const data: LocalStorageData = JSON.parse(rawData)

    console.log("Starting migration...")

    // Migrate contacts
    if (data.factory_pro_contacts && data.factory_pro_contacts.length > 0) {
      console.log(`Migrating ${data.factory_pro_contacts.length} contacts...`)

      for (const contact of data.factory_pro_contacts) {
        await prisma.contact.upsert({
          where: { id: contact.id },
          update: {
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            company: contact.company,
            position: contact.position,
            date: new Date(contact.date),
            isRead: contact.isRead,
          },
          create: {
            id: contact.id,
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            company: contact.company,
            position: contact.position,
            date: new Date(contact.date),
            isRead: contact.isRead,
          },
        })
      }
      console.log("Contacts migration completed!")
    }

    // Migrate blogs
    if (data.factory_pro_blogs && data.factory_pro_blogs.length > 0) {
      console.log(`Migrating ${data.factory_pro_blogs.length} blogs...`)

      for (const blog of data.factory_pro_blogs) {
        await prisma.blog.upsert({
          where: { id: blog.id },
          update: {
            title: blog.title,
            excerpt: blog.excerpt,
            fullContent: blog.fullContent,
            imageUrl: blog.imageUrl,
            date: new Date(blog.date),
            readTime: blog.readTime,
            category: blog.category,
            slug: blog.slug,
          },
          create: {
            id: blog.id,
            title: blog.title,
            excerpt: blog.excerpt,
            fullContent: blog.fullContent,
            imageUrl: blog.imageUrl,
            date: new Date(blog.date),
            readTime: blog.readTime,
            category: blog.category,
            slug: blog.slug,
          },
        })
      }
      console.log("Blogs migration completed!")
    }

    // Migrate testimonials
    if (data.factory_pro_testimonials && data.factory_pro_testimonials.length > 0) {
      console.log(`Migrating ${data.factory_pro_testimonials.length} testimonials...`)

      for (const testimonial of data.factory_pro_testimonials) {
        await prisma.testimonial.upsert({
          where: { id: testimonial.id },
          update: {
            content: testimonial.content,
            fullContent: testimonial.fullContent,
            author: testimonial.author,
            position: testimonial.position,
            company: testimonial.company,
            rating: testimonial.rating,
            avatarUrl: testimonial.avatarUrl,
          },
          create: {
            id: testimonial.id,
            content: testimonial.content,
            fullContent: testimonial.fullContent,
            author: testimonial.author,
            position: testimonial.position,
            company: testimonial.company,
            rating: testimonial.rating,
            avatarUrl: testimonial.avatarUrl,
          },
        })
      }
      console.log("Testimonials migration completed!")
    }

    // Migrate images
    if (data.factory_pro_images && data.factory_pro_images.length > 0) {
      console.log(`Migrating ${data.factory_pro_images.length} images...`)

      for (const image of data.factory_pro_images) {
        await prisma.image.upsert({
          where: { id: image.id },
          update: {
            url: image.url,
            title: image.title,
            description: image.description,
            date: new Date(image.date),
            blog: {
              connect: {
                id: image.blogId, // ✅ ต้องมี blogId ที่แม่นยำ
              }
            }
          },
          create: {
            id: image.id,
            url: image.url,
            title: image.title,
            description: image.description,
            date: new Date(image.date),
            blog: {
              connect: {
                id: image.blogId, // ✅ เหมือนกัน
              }
            }
          },
        })
      }
      console.log("Images migration completed!")
    }

    console.log("Migration completed successfully!")
  } catch (error) {
    console.error("Migration failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Path to the JSON file containing localStorage data
const jsonFilePath = process.argv[2] || "./localStorage-data.json"

// Run migration
migrateData(jsonFilePath)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Migration failed:", error)
    process.exit(1)
  })
