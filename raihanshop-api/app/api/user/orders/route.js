// app/api/user/orders/route.js
import { NextResponse } from 'next/server';
import { getAuthUser } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
    const payload = await getAuthUser();
    if (!payload) {
        return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
        where: { userId: payload.id },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders.map(o => ({
        id: `ORD-${o.id.toString().padStart(6, '0')}`,
        date: new Date(o.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: o.items.length,
        total: o.total,
        status: o.status.toLowerCase(),
    })));
}
