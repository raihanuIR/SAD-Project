// lib/prisma.js
import { PrismaClient } from '../generated/client';
import * as LibSQL from '@prisma/adapter-libsql';

const globalForPrisma = globalThis;

// Defensive import to find the constructor in any environment
const PrismaLibSQL = LibSQL.PrismaLibSQL || 
                   (LibSQL.default && LibSQL.default.PrismaLibSQL) || 
                   LibSQL.default;

function createPrisma() {
    if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
        try {
            if (typeof PrismaLibSQL !== 'function') {
                throw new Error("PrismaLibSQL is not a constructor. Found: " + typeof PrismaLibSQL);
            }
            
            const adapter = new PrismaLibSQL({
                url: process.env.TURSO_DATABASE_URL,
                authToken: process.env.TURSO_AUTH_TOKEN,
            });
            return new PrismaClient({ adapter });
        } catch (err) {
            console.error("Prisma Adapter Error:", err);
        }
    }
    
    // Default client for local development
    return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrisma();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
