import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod';
const ADMIN_COOKIE_NAME = 'math-app-admin-session';

function verifyAdmin(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role?: string };
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { sql } = await request.json();

    if (!sql || typeof sql !== 'string') {
      return NextResponse.json({ error: 'SQL query is required' }, { status: 400 });
    }

    const db = getDb();
    const trimmed = sql.trim();
    const isRead = /^(SELECT|PRAGMA|EXPLAIN)/i.test(trimmed);

    if (isRead) {
      const rows = db.prepare(trimmed).all();
      const columns = rows.length > 0 ? Object.keys(rows[0] as Record<string, unknown>) : [];
      return NextResponse.json({ columns, rows, rowCount: rows.length });
    } else {
      const result = db.prepare(trimmed).run();
      return NextResponse.json({
        columns: ['changes', 'lastInsertRowid'],
        rows: [{ changes: result.changes, lastInsertRowid: Number(result.lastInsertRowid) }],
        rowCount: result.changes,
        message: `Query executed successfully. ${result.changes} row(s) affected.`,
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Query execution failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
