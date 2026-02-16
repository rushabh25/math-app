import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod';
const ADMIN_COOKIE_NAME = 'math-app-admin-session';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const db = getDb();
    const admin = db.prepare('SELECT id, username, password_hash FROM admins WHERE username = ?').get(username) as
      | { id: number; username: string; password_hash: string }
      | undefined;

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ adminId: admin.id, username: admin.username, role: 'admin' }, JWT_SECRET, { expiresIn: '4h' });

    const maxAge = 4 * 60 * 60;
    const response = NextResponse.json({ admin: { id: admin.id, username: admin.username } });
    response.headers.set('Set-Cookie', `${ADMIN_COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}`);
    return response;
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
