// lib/prisma.js
import { PrismaClient } from '../generated/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql/web';

const globalForPrisma = globalThis;

function createPrisma() {
    if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
        try {
            const adapter = new PrismaLibSQL({
                url: process.env.TURSO_DATABASE_URL,
                authToken: process.env.TURSO_AUTH_TOKEN,
            });
            return new PrismaClient({ adapter });
        } catch (err) {
            console.error("Failed to initialize Prisma with LibSQL adapter:", err);
            // Fallback to default if adapter fails
            return new PrismaClient();
        }
    }
    return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrisma();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
