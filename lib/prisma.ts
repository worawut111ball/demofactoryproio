import { PrismaClient } from "@prisma/client"
import { getPrismaClientOptions } from "./db-config"

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Get Prisma client options from environment variables
const prismaOptions = getPrismaClientOptions()

export const prisma = globalForPrisma.prisma || new PrismaClient(prismaOptions)

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
