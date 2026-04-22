// app/api/products/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';


export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        const where = {};
        if (category && category !== 'All') {
            where.category = { name: category };
        }
        if (search) {
            where.name = { contains: search };
        }

        const products = await prisma.product.findMany({
            where,
            include: { category: true, brand: true },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(products.map(formatProduct));
    } catch (error) {
        console.error('Products API Error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function POST(request) {
    const data = await request.json();
    const product = await prisma.product.create({ data, include: { category: true, brand: true } });
    return NextResponse.json(formatProduct(product), { status: 201 });
}

function formatProduct(p) {
    return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        sale_price: p.salePrice,
        image: p.image,
        images: JSON.parse(p.images || '[]'),
        category: p.category?.name ?? '',
        brand: p.brand?.name ?? '',
        product_code: p.productCode,
        status: p.status,
        stock_quantity: p.stockQuantity,
        short_description: p.shortDescription,
        features: JSON.parse(p.features || '[]'),
    };
}

