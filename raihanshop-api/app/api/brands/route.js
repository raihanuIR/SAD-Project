// app/api/brands/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
    const brands = await prisma.brand.findMany({
        include: { _count: { select: { products: true } } },
        orderBy: { name: 'asc' },
    });
    return NextResponse.json(brands.map(b => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        products_count: b._count.products
    })));
}

export async function POST(request) {
    const { name } = await request.json();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const brand = await prisma.brand.create({ data: { name, slug } });
    return NextResponse.json(brand, { status: 201 });
}
