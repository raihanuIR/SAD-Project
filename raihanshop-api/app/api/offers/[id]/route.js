// app/api/offers/[id]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function DELETE(request, { params }) {
    const { id } = await params;
    await prisma.offer.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Offer deleted' });
}
