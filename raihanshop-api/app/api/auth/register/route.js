import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';
import { signToken, setAuthCookie } from '../../../../lib/auth';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists.' }, { status: 400 });
        }

        // Check if this is the first user (if so, make them admin)
        const userCount = await prisma.user.count();
        const role = userCount === 0 ? 'admin' : 'customer';

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role
            }
        });

        const token = signToken({ id: user.id, email: user.email, role: user.role });
        const response = NextResponse.json({
            user: { id: user.id, name: user.name, email: user.email, roles: [user.role] },
            message: `Account created successfully as ${role}.`
        });
        
        setAuthCookie(response, token);
        return response;
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}
