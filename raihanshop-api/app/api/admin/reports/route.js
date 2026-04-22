// app/api/admin/reports/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getAuthUser } from '../../../../lib/auth';

export async function GET() {
    const payload = await getAuthUser();
    if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const totalSales = await prisma.order.aggregate({
        _sum: { total: true },
        where: { status: 'Delivered' }
    });

    const ordersByStatus = await prisma.order.groupBy({
        by: ['status'],
        _count: { id: true },
    });

    const categorySales = await prisma.orderItem.groupBy({
        by: ['name'], // Simple for now
        _sum: { price: true, quantity: true },
        // We would need to join with product to get actual category, but let's keep it simple
    });

    const bestSellers = await prisma.orderItem.groupBy({
        by: ['productId', 'name'],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 5,
    });

    const recentOrders = await prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, email: true } } }
    });

    return NextResponse.json({
        totalSales: totalSales._sum.total || 0,
        ordersByStatus,
        bestSellers,
        recentOrders,
    });
}
