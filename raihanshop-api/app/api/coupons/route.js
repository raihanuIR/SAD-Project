// app/api/coupons/route.js
import { NextResponse } from 'next/server';
import { getAuthUser } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

export async function GET() {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(coupons.map(c => ({
        id: c.id,
        code: c.code,
        type: c.type,
        value: c.value,
        min_order: c.minOrder,
        usage: c.maxUses ? `${c.usedCount} / ${c.maxUses}` : `${c.usedCount} / ∞`,
        expiry: c.expiresAt ? new Date(c.expiresAt).toISOString().split('T')[0] : 'No Expiry',
        status: c.isActive ? 'Active' : 'Inactive',
        is_active: c.isActive,
    })));
}

export async function POST(request) {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { code, type, value, min_order, max_uses, expires_at } = await request.json();

    const coupon = await prisma.coupon.create({
        data: {
            code: code.toUpperCase(),
            type,
            value: parseFloat(value),
            minOrder: min_order ? parseFloat(min_order) : 0,
            maxUses: max_uses ? parseInt(max_uses) : null,
            expiresAt: expires_at ? new Date(expires_at) : null,
        },
    });

    return NextResponse.json(coupon, { status: 201 });
}
