// app/api/brands/[id]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function DELETE(request, { params }) {
    const { id } = await params;
    await prisma.brand.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Brand deleted' });
}
