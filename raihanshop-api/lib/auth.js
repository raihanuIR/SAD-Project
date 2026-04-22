// lib/auth.js
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'raihanshop-secret-key-change-in-production';
const COOKIE_NAME = 'raihanshop_token';

export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}

export async function getAuthUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

export function setAuthCookie(response, token) {
    response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

export function clearAuthCookie(response) {
    response.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
}
