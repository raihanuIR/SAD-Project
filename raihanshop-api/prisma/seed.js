// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'database.db');
const sqlite = new Database(dbPath);
const adapter = new PrismaBetterSqlite3(sqlite);
const prisma = new PrismaClient({ adapter });


async function main() {
    console.log('🌱 Seeding database...');

    // Create categories
    const categories = ['Electronics', 'Fashion', 'Home and Living', 'Beauty', 'Sneakers'];
    const categoryMap = {};

    for (const name of categories) {
        const cat = await prisma.category.upsert({
            where: { slug: name.toLowerCase().replace(/ /g, '-') },
            update: {},
            create: { name, slug: name.toLowerCase().replace(/ /g, '-') },
        });
        categoryMap[name] = cat.id;
    }
    console.log('✅ Categories created');

    // Create admin user
    await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@gmail.com',
            password: await bcrypt.hash('password', 10),
            role: 'admin',
        },
    });

    // Create customer user
    await prisma.user.upsert({
        where: { email: 'user@gmail.com' },
        update: {},
        create: {
            name: 'Test Customer',
            email: 'user@gmail.com',
            password: await bcrypt.hash('password', 10),
            role: 'customer',
        },
    });
    console.log('✅ Users created (admin@gmail.com / password)');

    // Create featured products
    const featured = [
        {
            name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max',
            price: 124999, salePrice: 114999,
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
            images: JSON.stringify(['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop']),
            brand: 'Apple', productCode: 'RS-IP15', status: 'In Stock', stockQuantity: 25,
            shortDescription: 'The ultimate iPhone experience with a groundbreaking new camera system, advanced display, and the revolutionary A17 Pro chip.',
            features: JSON.stringify([{ label: 'Display', value: '6.7-inch Super Retina XDR' }, { label: 'Processor', value: 'A17 Pro Bionic' }, { label: 'Camera', value: '48MP Main + 12MP Ultra Wide' }]),
            categoryId: categoryMap['Electronics'],
        },
        {
            name: 'Nike Air Max 270', slug: 'nike-air-max-270',
            price: 8500, salePrice: 6999,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            images: JSON.stringify(['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop']),
            brand: 'Nike', productCode: 'RS-NK270', status: 'In Stock', stockQuantity: 40,
            shortDescription: 'The Nike Air Max 270 delivers visible cushioning under every step.',
            features: JSON.stringify([{ label: 'Material', value: 'Breathable Mesh' }, { label: 'Sole', value: 'Air Max Cushioning' }]),
            categoryId: categoryMap['Fashion'],
        },
        {
            name: 'Minimalist Wood Desk', slug: 'minimalist-wood-desk',
            price: 12500, salePrice: null,
            image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop',
            images: JSON.stringify(['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop']),
            brand: 'IKEA', productCode: 'RS-WD100', status: 'In Stock', stockQuantity: 10,
            shortDescription: 'A beautiful, minimalist wooden desk that fits perfectly into any modern home office.',
            features: JSON.stringify([{ label: 'Material', value: 'Solid Oak Wood' }, { label: 'Dimensions', value: '120cm x 60cm x 75cm' }]),
            categoryId: categoryMap['Home and Living'],
        },
        {
            name: 'Sony WH-1000XM5', slug: 'sony-wh-1000xm5',
            price: 35000, salePrice: 32000,
            image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
            images: JSON.stringify(['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop']),
            brand: 'Sony', productCode: 'RS-SNYXM5', status: 'In Stock', stockQuantity: 30,
            shortDescription: 'Industry-leading noise cancellation. Rewrite the rules for distraction-free listening.',
            features: JSON.stringify([{ label: 'Battery', value: 'Up to 30 hours' }, { label: 'Connectivity', value: 'Bluetooth 5.2' }]),
            categoryId: categoryMap['Electronics'],
        },
    ];

    const catImages = {
        'Electronics': ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop'],
        'Fashion': ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop'],
        'Home and Living': ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop'],
        'Beauty': ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop'],
        'Sneakers': ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop'],
    };

    let codeCounter = 10001;
    for (const cat of categories) {
        for (let i = 1; i <= 12; i++) {
            const price = Math.floor(Math.random() * 50000) + 1000;
            const isSale = i % 3 === 0;
            const slug = `premium-${cat.toLowerCase().replace(/ /g, '-')}-item-${i}`;
            await prisma.product.upsert({
                where: { slug },
                update: {},
                create: {
                    name: `Premium ${cat} Item ${i}`,
                    slug,
                    price,
                    salePrice: isSale ? Math.floor(price * 0.8) : null,
                    image: catImages[cat][i % 2],
                    images: JSON.stringify([catImages[cat][i % 2], catImages[cat][(i + 1) % 2]]),
                    brand: 'RaihanShop Brands',
                    productCode: `RS-${codeCounter++}`,
                    status: i % 7 === 0 ? 'Out of Stock' : 'In Stock',
                    stockQuantity: i % 7 === 0 ? 0 : Math.floor(Math.random() * 50) + 5,
                    shortDescription: `This is a premium ${cat} item designed to offer the best quality and value.`,
                    features: JSON.stringify([{ label: 'Material', value: 'High-quality blend' }, { label: 'Warranty', value: '1 Year' }]),
                    categoryId: categoryMap[cat],
                },
            });
        }
    }

    for (const p of featured) {
        await prisma.product.upsert({ where: { slug: p.slug }, update: {}, create: p });
    }

    // Create sample coupons
    await prisma.coupon.upsert({
        where: { code: 'SUMMER26' },
        update: {},
        create: { code: 'SUMMER26', type: 'percentage', value: 15, minOrder: 1000, maxUses: 100 },
    });
    await prisma.coupon.upsert({
        where: { code: 'WELCOME500' },
        update: {},
        create: { code: 'WELCOME500', type: 'fixed', value: 500, minOrder: 2000 },
    });

    console.log('✅ Products & coupons seeded');
    console.log('🎉 Database seeding complete!');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
