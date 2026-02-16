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
  const scores = db.prepare('SELECT score, total_attempts, correct_answers, streak, grade FROM scores WHERE user_id = ?').get(payload.userId) as
    | { score: number; total_attempts: number; correct_answers: number; streak: number; grade: string }
    | undefined;

  if (!scores) {
    return NextResponse.json({ scores: { score: 0, total_attempts: 0, correct_answers: 0, streak: 0, grade: '2nd' } });
  }

  return NextResponse.json({ scores });
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
    const { score, total_attempts, correct_answers, streak, grade } = await request.json();

    const db = getDb();
    db.prepare(`
      INSERT INTO scores (user_id, score, total_attempts, correct_answers, streak, grade, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(user_id) DO UPDATE SET
        score = excluded.score,
        total_attempts = excluded.total_attempts,
        correct_answers = excluded.correct_answers,
        streak = excluded.streak,
        grade = excluded.grade,
        updated_at = datetime('now')
    `).run(payload.userId, score, total_attempts, correct_answers, streak, grade);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
