import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyToken, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const db = getDb();
  const tests = db.prepare(
    'SELECT id, score, total_questions, grade, completed_at FROM tests WHERE user_id = ? ORDER BY completed_at DESC'
  ).all(payload.userId) as Array<{
    id: number;
    score: number;
    total_questions: number;
    grade: string;
    completed_at: string;
  }>;

  return NextResponse.json({ tests });
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const { score, total_questions, grade } = await request.json();

    const db = getDb();
    db.prepare(
      'INSERT INTO tests (user_id, score, total_questions, grade) VALUES (?, ?, ?, ?)'
    ).run(payload.userId, score, total_questions, grade);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
