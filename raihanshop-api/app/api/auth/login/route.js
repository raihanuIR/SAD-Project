// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';
import { signToken, setAuthCookie } from '../../../../lib/auth';

export async function POST(request) {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    const response = NextResponse.json({
        user: { id: user.id, name: user.name, email: user.email, roles: [user.role] },
    });
    setAuthCookie(response, token);
    return response;
}
