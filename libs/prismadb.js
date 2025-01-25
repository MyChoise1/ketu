import { PrismaClient } from "@prisma/client";

// Check if prisma exists on global object
const globalThis = global || window;
const prismadb = globalThis.prisma || new PrismaClient();

// Prevent multiple instances in development
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismadb;
}

export default prismadb;
