// app/api/admin/products/[id]/route.js
import { NextResponse } from 'next/server';
import { getAuthUser } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/prisma';

export async function PATCH(request, { params }) {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    const { id } = await params;
    const body = await request.json();

    const data = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.short_description !== undefined) data.shortDescription = body.short_description;
    if (body.price !== undefined) data.price = parseFloat(body.price);
    if (body.sale_price !== undefined) data.salePrice = body.sale_price ? parseFloat(body.sale_price) : null;
    if (body.stock_quantity !== undefined) data.stockQuantity = parseInt(body.stock_quantity);
    if (body.category_id !== undefined) data.categoryId = parseInt(body.category_id);
    if (body.brand !== undefined) data.brand = body.brand;
    if (body.status !== undefined) data.status = body.status;
    if (body.image !== undefined) data.image = body.image;

    const product = await prisma.product.update({
        where: { id: parseInt(id) },
        data,
        include: { category: true },
    });

    return NextResponse.json(product);
}

export async function DELETE(request, { params }) {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    const { id } = await params;

    await prisma.product.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Product deleted' });
}
