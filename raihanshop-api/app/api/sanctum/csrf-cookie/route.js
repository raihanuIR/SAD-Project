// app/api/sanctum/csrf-cookie/route.js
import { NextResponse } from 'next/server';

// Vue frontend calls this first before login (Laravel Sanctum compatibility)
// In Next.js we don't need CSRF cookies — just return OK
export async function GET() {
    return NextResponse.json({ message: 'OK' });
}
