import { PrismaClient } from "@prisma/client";
import { envServerSchema } from "../../environment";

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (envServerSchema.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
