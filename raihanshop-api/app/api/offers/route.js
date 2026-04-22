// app/api/offers/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
    const offers = await prisma.offer.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(offers);
}

export async function POST(request) {
    const data = await request.json();
    const offer = await prisma.offer.create({ data });
    return NextResponse.json(offer, { status: 201 });
}
