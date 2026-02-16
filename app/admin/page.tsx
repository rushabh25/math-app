'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [sql, setSql] = useState('');
  const [queryResult, setQueryResult] = useState<{
    columns: string[];
    rows: Record<string, unknown>[];
    rowCount: number;
    message?: string;
  } | null>(null);
  const [queryError, setQueryError] = useState('');
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Login failed');
        setLoginLoading(false);
        return;
      }

      setAuthenticated(true);
      setPassword('');
    } catch {
      setLoginError('Something went wrong');
      setLoginLoading(false);
    }
  };

  const executeQuery = async () => {
    if (!sql.trim()) return;
    setQueryError('');
    setQueryResult(null);
    setQueryLoading(true);

    try {
      const res = await fetch('/api/admin/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: sql.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setQueryError(data.error || 'Query failed');
        setQueryLoading(false);
        return;
      }

      setQueryResult(data);
      setQueryHistory(prev => [sql.trim(), ...prev.filter(q => q !== sql.trim())].slice(0, 20));
    } catch {
      setQueryError('Failed to execute query');
    }
    setQueryLoading(false);
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white font-bold">A</span>
            </div>
            <h1 className="text-xl font-bold text-white">Admin Console</h1>
            <p className="text-gray-400 text-sm mt-1">Sign in to access the database</p>
          </div>

          {loginError && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 text-sm rounded-lg px-4 py-3 mb-6">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-sm text-white font-bold">A</span>
            </div>
            <span className="font-semibold text-gray-200">Admin Console</span>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-6">
        {/* SQL Editor */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">SQL Query</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSql('SELECT name FROM sqlite_master WHERE type=\'table\' ORDER BY name;')}
                className="text-xs px-2.5 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
              >
                Show Tables
              </button>
              <button
                onClick={() => setSql('SELECT * FROM users;')}
                className="text-xs px-2.5 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
              >
                All Users
              </button>
              <button
                onClick={() => setSql('SELECT * FROM scores;')}
                className="text-xs px-2.5 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
              >
                All Scores
              </button>
              <button
                onClick={() => setSql('SELECT * FROM tests ORDER BY completed_at DESC;')}
                className="text-xs px-2.5 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
              >
                All Tests
              </button>
            </div>
          </div>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                executeQuery();
              }
            }}
            placeholder="Enter SQL query... (Ctrl+Enter or Cmd+Enter to execute)"
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-green-400 font-mono text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-y"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">Cmd+Enter to execute</span>
            <button
              onClick={executeQuery}
              disabled={queryLoading || !sql.trim()}
              className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {queryLoading ? 'Executing...' : 'Execute'}
            </button>
          </div>
        </div>

        {/* Error */}
        {queryError && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-xl px-4 py-3 mb-6 font-mono">
            {queryError}
          </div>
        )}

        {/* Success message */}
        {queryResult?.message && (
          <div className="bg-green-900/30 border border-green-800 text-green-300 text-sm rounded-xl px-4 py-3 mb-6">
            {queryResult.message}
          </div>
        )}

        {/* Results table */}
        {queryResult && queryResult.columns.length > 0 && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">
            <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {queryResult.rowCount} row{queryResult.rowCount !== 1 ? 's' : ''} returned
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    {queryResult.columns.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-2.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-800/50"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(queryResult.rows as Record<string, unknown>[]).map((row, i) => (
                    <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      {queryResult.columns.map((col) => (
                        <td key={col} className="px-4 py-2.5 text-gray-300 font-mono text-xs whitespace-nowrap">
                          {row[col] === null ? (
                            <span className="text-gray-600 italic">NULL</span>
                          ) : (
                            String(row[col])
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Query history */}
        {queryHistory.length > 0 && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Queries</h3>
            <div className="space-y-1.5">
              {queryHistory.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setSql(q)}
                  className="w-full text-left px-3 py-2 text-xs font-mono text-gray-400 bg-gray-900/50 rounded-lg hover:bg-gray-700 hover:text-gray-200 transition-colors truncate"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
