import { prisma } from "./prisma"
import type { Prisma } from "@prisma/client"

// Generic read function for any model
export async function readData<T>(model: string): Promise<T[]> {
  try {
    // @ts-ignore - Dynamic use of prisma client
    const data = await prisma[model.toLowerCase()].findMany({
      orderBy: { createdAt: "desc" },
    })
    return data as T[]
  } catch (error) {
    console.error(`Error reading data from ${model}:`, error)
    return []
  }
}

// Find data by ID
export async function findDataById<T>(model: string, id: string): Promise<T | null> {
  try {
    // @ts-ignore - Dynamic use of prisma client
    const data = await prisma[model.toLowerCase()].findUnique({
      where: { id },
    })
    return data as T
  } catch (error) {
    console.error(`Error finding data by ID in ${model}:`, error)
    return null
  }
}

// Generic add function for any model
export async function addData<T>(model: string, data: any): Promise<T> {
  try {
    // @ts-ignore - Dynamic use of prisma client
    const result = await prisma[model.toLowerCase()].create({
      data,
    })
    return result as T
  } catch (error) {
    console.error(`Error adding data to ${model}:`, error)
    throw error
  }
}

// Generic update function for any model
export async function updateData<T>(model: string, id: string, data: any): Promise<T | null> {
  try {
    // @ts-ignore - Dynamic use of prisma client
    const result = await prisma[model.toLowerCase()].update({
      where: { id },
      data,
    })
    return result as T
  } catch (error) {
    console.error(`Error updating data in ${model}:`, error)
    return null
  }
}

// Generic delete function for any model
export async function deleteData<T>(model: string, id: string): Promise<boolean> {
  try {
    // @ts-ignore - Dynamic use of prisma client
    await prisma[model.toLowerCase()].delete({
      where: { id },
    })
    return true
  } catch (error) {
    console.error(`Error deleting data from ${model}:`, error)
    return false
  }
}

// Generic write function to replace all data
export async function writeData<T>(model: string, data: T[]): Promise<void> {
  try {
    // Not an atomic operation, but mimics the behavior of localStorage.setItem
    await prisma.$transaction(async (tx) => {
      // @ts-ignore - Dynamic use of prisma client
      await tx[model.toLowerCase()].deleteMany({})

      // @ts-ignore - Dynamic use of prisma client
      await tx[model.toLowerCase()].createMany({
        data,
      })
    })
  } catch (error) {
    console.error(`Error writing data to ${model}:`, error)
    throw error
  }
}

// Specific typed functions for each model
export const contacts = {
  findAll: () => readData<Prisma.ContactGetPayload<{}>>("Contact"),
  findById: (id: string) => findDataById<Prisma.ContactGetPayload<{}>>("Contact", id),
  create: (data: Prisma.ContactCreateInput) => addData<Prisma.ContactGetPayload<{}>>("Contact", data),
  update: (id: string, data: Prisma.ContactUpdateInput) =>
    updateData<Prisma.ContactGetPayload<{}>>("Contact", id, data),
  delete: (id: string) => deleteData<Prisma.ContactGetPayload<{}>>("Contact", id),
  markAsRead: (id: string) => updateData<Prisma.ContactGetPayload<{}>>("Contact", id, { isRead: true }),
  markAllAsRead: async () => {
    try {
      await prisma.contact.updateMany({
        where: { isRead: false },
        data: { isRead: true },
      })
      return true
    } catch (error) {
      console.error("Error marking all contacts as read:", error)
      return false
    }
  },
}

export const blogs = {
  findAll: () => readData<Prisma.BlogGetPayload<{}>>("Blog"),
  findById: (id: string) => findDataById<Prisma.BlogGetPayload<{}>>("Blog", id),
  findBySlug: async (slug: string) => {
    try {
      return await prisma.blog.findUnique({ where: { slug } })
    } catch (error) {
      console.error("Error finding blog by slug:", error)
      return null
    }
  },
  create: (data: Prisma.BlogCreateInput) => addData<Prisma.BlogGetPayload<{}>>("Blog", data),
  update: (id: string, data: Prisma.BlogUpdateInput) => updateData<Prisma.BlogGetPayload<{}>>("Blog", id, data),
  delete: (id: string) => deleteData<Prisma.BlogGetPayload<{}>>("Blog", id),
}

export const testimonials = {
  findAll: () => readData<Prisma.TestimonialGetPayload<{}>>("Testimonial"),
  findById: (id: string) => findDataById<Prisma.TestimonialGetPayload<{}>>("Testimonial", id),
  create: (data: Prisma.TestimonialCreateInput) => addData<Prisma.TestimonialGetPayload<{}>>("Testimonial", data),
  update: (id: string, data: Prisma.TestimonialUpdateInput) =>
    updateData<Prisma.TestimonialGetPayload<{}>>("Testimonial", id, data),
  delete: (id: string) => deleteData<Prisma.TestimonialGetPayload<{}>>("Testimonial", id),
}

export const images = {
  findAll: () => readData<Prisma.ImageGetPayload<{}>>("Image"),
  findById: (id: string) => findDataById<Prisma.ImageGetPayload<{}>>("Image", id),
  create: (data: Prisma.ImageCreateInput) => addData<Prisma.ImageGetPayload<{}>>("Image", data),
  update: (id: string, data: Prisma.ImageUpdateInput) => updateData<Prisma.ImageGetPayload<{}>>("Image", id, data),
  delete: (id: string) => deleteData<Prisma.ImageGetPayload<{}>>("Image", id),
}
