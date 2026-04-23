// app/api/admin/stats/route.js
import { NextResponse } from 'next/server';
import { getAuthUser } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const [totalProducts, totalUsers, totalOrders, orders] = await Promise.all([
        prisma.product.count(),
        prisma.user.count({ where: { role: 'customer' } }),
        prisma.order.count(),
        prisma.order.findMany({ select: { total: true, status: true, createdAt: true } }),
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = orders.filter(o => new Date(o.createdAt) >= today);
    const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0);

    const statusCounts = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(name => ({
        name,
        count: orders.filter(o => o.status.toLowerCase() === name.toLowerCase()).length,
    }));

    return NextResponse.json({
        todaySales,
        todayOrders: todayOrders.length,
        totalProducts,
        totalUsers,
        totalOrders,
        orderStats: statusCounts,
    });
}
