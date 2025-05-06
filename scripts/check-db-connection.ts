/**
 * Script to check database connection
 *
 * Usage:
 * npx ts-node scripts/check-db-connection.ts
 */

import { PrismaClient } from "@prisma/client"
import { getDatabaseUrl, getPrismaClientOptions } from "../lib/db-config"

async function checkDatabaseConnection() {
  console.log("Checking database connection...")
  console.log(`Database URL: ${maskDatabaseUrl(getDatabaseUrl())}`)

  const prismaOptions = getPrismaClientOptions()
  console.log("Prisma client options:", JSON.stringify(prismaOptions, null, 2))

  const prisma = new PrismaClient(prismaOptions)

  try {
    // Try to connect to the database
    await prisma.$connect()
    console.log("✅ Database connection successful!")

    // Check if tables exist
    console.log("Checking database tables...")

    try {
      const contactCount = await prisma.contact.count()
      console.log(`✅ Contact table exists with ${contactCount} records`)
    } catch (error) {
      console.log("❌ Contact table does not exist or is not accessible")
    }

    try {
      const blogCount = await prisma.blog.count()
      console.log(`✅ Blog table exists with ${blogCount} records`)
    } catch (error) {
      console.log("❌ Blog table does not exist or is not accessible")
    }

    try {
      const testimonialCount = await prisma.testimonial.count()
      console.log(`✅ Testimonial table exists with ${testimonialCount} records`)
    } catch (error) {
      console.log("❌ Testimonial table does not exist or is not accessible")
    }

    try {
      const imageCount = await prisma.image.count()
      console.log(`✅ Image table exists with ${imageCount} records`)
    } catch (error) {
      console.log("❌ Image table does not exist or is not accessible")
    }
  } catch (error) {
    console.error("❌ Database connection failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Mask the password in the database URL for security
function maskDatabaseUrl(url: string): string {
  try {
    const maskedUrl = new URL(url)
    if (maskedUrl.password) {
      maskedUrl.password = "********"
    }
    return maskedUrl.toString()
  } catch (error) {
    return url.replace(/:[^:@]+@/, ":********@")
  }
}

// Run the script
checkDatabaseConnection().catch((error) => {
  console.error("Error checking database connection:", error)
  process.exit(1)
})
