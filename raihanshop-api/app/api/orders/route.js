// app/api/orders/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getAuthUser } from '../../../lib/auth';

export async function POST(request) {
    const payload = await getAuthUser();
    const body = await request.json();
    const { name, mobile, address, city, state, zip_code, payment_method, items, subtotal, shippingCost, discount, couponCode, total } = body;

    const order = await prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
            data: {
                userId: payload?.id ?? null,
                name,
                mobile,
                address,
                city,
                state,
                zipCode: zip_code,
                paymentMethod: payment_method,
                subtotal,
                shippingCost: shippingCost ?? 0,
                discount: discount ?? 0,
                couponCode: couponCode ?? null,
                total,
                items: {
                    create: items.map((item) => ({
                        productId: item.id,
                        name: item.name,
                        price: item.sale_price ?? item.price,
                        quantity: item.quantity,
                    })),
                },
            },
            include: { items: true },
        });

        if (couponCode) {
            await tx.coupon.update({
                where: { code: couponCode },
                data: { usedCount: { increment: 1 } }
            });
        }

        return newOrder;
    });

    return NextResponse.json({ message: 'Order placed successfully!', order }, { status: 201 });
}


export async function GET() {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
        include: { items: true, user: { select: { name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
}
