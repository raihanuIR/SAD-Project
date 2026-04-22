// app/api/coupons/validate/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request) {
    const { code, amount } = await request.json();

    const coupon = await prisma.coupon.findUnique({
        where: { code: code.toUpperCase() }
    });

    if (!coupon || !coupon.isActive) {
        return NextResponse.json({ message: 'Invalid or expired coupon' }, { status: 400 });
    }

    if (coupon.minOrder > amount) {
        return NextResponse.json({ message: `Minimum order of ৳${coupon.minOrder} required` }, { status: 400 });
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
        return NextResponse.json({ message: 'Coupon limit reached' }, { status: 400 });
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
        discount = (amount * coupon.value) / 100;
    } else {
        discount = coupon.value;
    }

    return NextResponse.json({
        code: coupon.code,
        discount: Math.min(discount, amount), // Cannot discount more than amount
        type: coupon.type,
        value: coupon.value
    });
}
