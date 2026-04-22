// app/api/user/route.js
import { NextResponse } from 'next/server';
import { getAuthUser } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

export async function GET() {
    const payload = await getAuthUser();
    if (!payload) {
        return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.id },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return in format compatible with Vue frontend (roles as array)
    return NextResponse.json({ ...user, roles: [user.role] });
}
