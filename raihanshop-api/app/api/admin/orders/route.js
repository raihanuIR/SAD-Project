// app/api/admin/orders/route.js
import { NextResponse } from 'next/server';
import { getAuthUser } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
        include: {
            items: { include: { product: { select: { name: true, image: true } } } },
            user: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders.map(o => ({
        id: o.id,
        order_number: `ORD-${o.id.toString().padStart(6, '0')}`,
        customer: o.name,
        email: o.user?.email ?? 'Guest',
        date: new Date(o.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
        total: o.total,
        status: o.status,
        payment_status: o.paymentMethod,
        items: o.items,
        address: `${o.address}, ${o.city}, ${o.state} ${o.zipCode}`,
        mobile: o.mobile,
    })));
}
