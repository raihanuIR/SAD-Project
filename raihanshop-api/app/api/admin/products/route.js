// app/api/admin/products/route.js
import { NextResponse } from 'next/server';
import { getAuthUser } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const products = await prisma.product.findMany({
        include: { category: true, brand: true },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        sale_price: p.salePrice,
        image: p.image,
        category: p.category?.name ?? '',
        brand: p.brand?.name ?? '',
        brandId: p.brandId,
        product_code: p.productCode,
        status: p.status,
        stock_quantity: p.stockQuantity,
        short_description: p.shortDescription,
    })));
}

export async function POST(request) {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { name, short_description, price, salePrice, stockQuantity, categoryId, brandId, image, status } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const productCode = `RS-${Date.now()}`;

    const product = await prisma.product.create({
        data: {
            name,
            slug,
            shortDescription: short_description || '',
            price: parseFloat(price),
            salePrice: salePrice ? parseFloat(salePrice) : null,
            stockQuantity: parseInt(stockQuantity),
            categoryId: parseInt(categoryId),
            brandId: brandId ? parseInt(brandId) : null,
            image: image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
            images: JSON.stringify([]),
            productCode,
            status: status || 'In Stock',
            features: JSON.stringify([]),
        },
        include: { category: true, brand: true },
    });


    return NextResponse.json(product, { status: 201 });
}
