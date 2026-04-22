// app/api/categories/[id]/route.js
import { NextResponse } from 'next/server';
import { getAuthUser } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export async function DELETE(request, { params }) {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    const { id } = await params;
    await prisma.category.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Category deleted' });
}

export async function PATCH(request, { params }) {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    const { id } = await params;
    const { name } = await request.json();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const category = await prisma.category.update({ where: { id: parseInt(id) }, data: { name, slug } });
    return NextResponse.json(category);
}
