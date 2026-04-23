// lib/prisma.js
import { PrismaClient } from '../generated/client';
import * as adapterPkg from '@prisma/adapter-libsql';

const globalForPrisma = globalThis;

// Robustly find PrismaLibSQL whether it's a named export, default export, or in a sub-property
const PrismaLibSQL = adapterPkg.PrismaLibSQL || 
                   (adapterPkg.default && adapterPkg.default.PrismaLibSQL) || 
                   adapterPkg.default;

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
            return new PrismaClient();
        }
    }
    return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrisma();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
