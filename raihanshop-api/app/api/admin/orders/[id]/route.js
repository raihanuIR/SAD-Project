// app/api/admin/orders/[id]/route.js
import { NextResponse } from 'next/server';
import { getAuthUser } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/prisma';

export async function PATCH(request, { params }) {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    const { id } = await params;
    const { status } = await request.json();

    const order = await prisma.order.update({
        where: { id: parseInt(id) },
        data: { status },
    });

    return NextResponse.json(order);
}
