import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
    console.error("❌ Error: TURSO_DATABASE_URL or TURSO_AUTH_TOKEN is missing in .env");
    process.exit(1);
}

const client = createClient({ url, authToken });

async function init() {
    console.log("🚀 Initializing Turso Database...");

    try {
        // Simple SQL to create the User table first to test connection
        // We will create the tables manually since Prisma CLI is struggling with the protocol
        const schema = `
            CREATE TABLE IF NOT EXISTS User (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'customer',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS Category (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                slug TEXT UNIQUE NOT NULL
            );
            CREATE TABLE IF NOT EXISTS Brand (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                slug TEXT UNIQUE NOT NULL
            );
            CREATE TABLE IF NOT EXISTS Product (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                slug TEXT UNIQUE NOT NULL,
                price REAL NOT NULL,
                salePrice REAL,
                image TEXT NOT NULL,
                images TEXT DEFAULT '[]',
                brandId INTEGER,
                productCode TEXT UNIQUE NOT NULL,
                status TEXT DEFAULT 'In Stock',
                stockQuantity INTEGER DEFAULT 0,
                shortDescription TEXT,
                features TEXT DEFAULT '[]',
                categoryId INTEGER NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (brandId) REFERENCES Brand(id),
                FOREIGN KEY (categoryId) REFERENCES Category(id)
            );
            CREATE TABLE IF NOT EXISTS Offer (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                image TEXT,
                isActive BOOLEAN DEFAULT 1,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS Coupon (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                code TEXT UNIQUE NOT NULL,
                type TEXT DEFAULT 'percentage',
                value REAL NOT NULL,
                minOrder REAL DEFAULT 0,
                maxUses INTEGER,
                usedCount INTEGER DEFAULT 0,
                expiresAt DATETIME,
                isActive BOOLEAN DEFAULT 1,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
             CREATE TABLE IF NOT EXISTS "Order" (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                name TEXT NOT NULL,
                mobile TEXT NOT NULL,
                address TEXT NOT NULL,
                city TEXT NOT NULL,
                state TEXT NOT NULL,
                zipCode TEXT NOT NULL,
                paymentMethod TEXT DEFAULT 'cod',
                subtotal REAL NOT NULL,
                shippingCost REAL DEFAULT 0,
                discount REAL DEFAULT 0,
                couponCode TEXT,
                total REAL NOT NULL,
                status TEXT DEFAULT 'Pending',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES User(id)
            );
            CREATE TABLE IF NOT EXISTS OrderItem (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                orderId INTEGER NOT NULL,
                productId INTEGER NOT NULL,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                quantity INTEGER NOT NULL,
                FOREIGN KEY (orderId) REFERENCES "Order"(id),
                FOREIGN KEY (productId) REFERENCES Product(id)
            );
        `;

        // Split the schema into individual statements
        const statements = schema.split(';').filter(s => s.trim() !== '');
        
        for (const statement of statements) {
            await client.execute(statement);
        }

        console.log("✅ Success! Your Turso database is initialized and ready.");
        console.log("👉 Now you can go to your site and register your Admin account.");
    } catch (err) {
        console.error("❌ Database initialization failed:", err);
    }
}

init();
