// app/api/products/[slug]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request, { params }) {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
        where: { slug },
        include: { category: true, brand: true },
    });

    if (!product) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        sale_price: product.salePrice,
        image: product.image,
        images: JSON.parse(product.images || '[]'),
        category: product.category?.name ?? '',
        brand: product.brand?.name ?? '',
        product_code: product.productCode,
        status: product.status,
        stock_quantity: product.stockQuantity,
        short_description: product.shortDescription,
        features: JSON.parse(product.features || '[]'),
    });

}
