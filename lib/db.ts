import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = process.env.DB_PATH || './math-app.db';

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  db = new Database(path.resolve(DB_PATH));
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      score INTEGER DEFAULT 0,
      total_attempts INTEGER DEFAULT 0,
      correct_answers INTEGER DEFAULT 0,
      streak INTEGER DEFAULT 0,
      grade TEXT DEFAULT '2nd',
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL DEFAULT 10,
      grade TEXT NOT NULL,
      completed_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed default admin if table is empty (hash pre-computed, plaintext never stored in source)
  const adminCount = db.prepare('SELECT COUNT(*) as count FROM admins').get() as { count: number };
  if (adminCount.count === 0) {
    db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run(
      'admin123',
      '$2b$10$yGkr8yJA.QJlTrdr6tPR6u.JyDdNJe/.kBdGtjYJT9PrGT8o0e0Rm'
    );
  }

  return db;
}
