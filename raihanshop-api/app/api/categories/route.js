// app/api/categories/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
    const categories = await prisma.category.findMany({
        include: { _count: { select: { products: true } } },
        orderBy: { name: 'asc' },
    });

    return NextResponse.json(categories.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        products_count: c._count.products,
    })));
}

export async function POST(request) {
    const { name } = await request.json();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const category = await prisma.category.create({ data: { name, slug } });
    return NextResponse.json(category, { status: 201 });
}
