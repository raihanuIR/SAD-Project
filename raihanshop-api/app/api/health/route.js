import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Test database connection
        const userCount = await prisma.user.count();
        
        return NextResponse.json({
            status: 'online',
            database: 'connected',
            userCount,
            env: {
                hasTursoUrl: !!process.env.TURSO_DATABASE_URL,
                hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
                nodeEnv: process.env.NODE_ENV
            }
        });
    } catch (error) {
        console.error('Health check error:', error);
        return NextResponse.json({
            status: 'error',
            database: 'disconnected',
            error: error.message,
            stack: error.stack,
            env: {
                hasTursoUrl: !!process.env.TURSO_DATABASE_URL,
                hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
            }
        }, { status: 500 });
    }
}
