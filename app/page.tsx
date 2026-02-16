'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Minus,
  X,
  Divide,
  PenTool,
  BookOpen,
  BarChart3,
  Shuffle,
  Calculator,
  ChevronDown,
  LogOut,
  ClipboardList,
  Trophy,
  ArrowLeft,
  Timer,
  Clock,
  Ruler,
  Table,
  Dices,
} from 'lucide-react';
import {
  type ProblemType,
  type Grade,
  type Problem,
  allProblemTypes,
  grades,
  getProblemTypesForGrade,
  generateProblem,
} from '@/lib/math-problems';

const iconMap: Record<ProblemType, React.ComponentType<{ className?: string }>> = {
  addition: Plus,
  subtraction: Minus,
  patterns: Shuffle,
  multiplication: X,
  division: Divide,
  word: BookOpen,
  fractions: PenTool,
  decimals: Calculator,
  graphs: BarChart3,
  percentages: PenTool,
  ratios: Divide,
  time: Clock,
  measurement: Ruler,
  interpretData: Table,
  random: Dices,
  mixed: Shuffle,
};

// Chart Components
const BarChart = ({ labels, values }: { labels: string[]; values: number[] }) => {
  const maxValue = Math.max(...values);
  const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

  // Calculate Y-axis scale
  const yAxisMax = Math.ceil(maxValue / 5) * 5 || 5;
  const yAxisSteps = 5;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
      <svg width="100%" height="350" viewBox="0 0 600 350">
        {/* Y-axis label */}
        <text x="20" y="180" textAnchor="middle" className="text-xs font-semibold" fill="#4b5563" transform="rotate(-90 20 180)">
          Quantity
        </text>

        {/* Y-axis line */}
        <line x1="50" y1="30" x2="50" y2="280" stroke="#374151" strokeWidth="2" />

        {/* X-axis line */}
        <line x1="50" y1="280" x2="580" y2="280" stroke="#374151" strokeWidth="2" />

        {/* Grid lines and Y-axis labels */}
        {Array.from({ length: yAxisSteps + 1 }).map((_, i) => {
          const value = yAxisMax - (i * yAxisMax / yAxisSteps);
          const y = 30 + (i * 250 / yAxisSteps);
          return (
            <g key={i}>
              <line x1="50" y1={y} x2="580" y2={y} stroke="#d1d5db" strokeWidth="1" strokeDasharray="4" />
              <text x="45" y={y + 4} textAnchor="end" className="text-xs font-medium" fill="#6b7280">
                {Math.round(value)}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {values.map((value, index) => {
          const barWidth = 70;
          const spacing = (580 - 50) / values.length;
          const x = 50 + spacing * index + (spacing - barWidth) / 2;
          const barHeight = (value / yAxisMax) * 250;
          const y = 280 - barHeight;

          return (
            <g key={index}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={colors[index % colors.length]}
                rx="4"
              />
              {/* Value label on bar */}
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                className="text-sm font-bold"
                fill="#1f2937"
              >
                {value}
              </text>
              {/* X-axis label */}
              <text
                x={x + barWidth / 2}
                y="300"
                textAnchor="middle"
                className="text-sm font-medium"
                fill="#4b5563"
              >
                {labels[index]}
              </text>
            </g>
          );
        })}

        {/* X-axis label */}
        <text x="315" y="335" textAnchor="middle" className="text-sm font-semibold" fill="#4b5563">
          Categories
        </text>
      </svg>
    </div>
  );
};

const LineChart = ({ labels, values }: { labels: string[]; values: number[] }) => {
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1;

  // Calculate Y-axis scale
  const yAxisMax = Math.ceil(maxValue / 5) * 5;
  const yAxisMin = Math.floor(minValue / 5) * 5;
  const yAxisRange = yAxisMax - yAxisMin || 5;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
      <div className="relative h-72">
        <svg className="w-full h-full" viewBox="0 0 450 240">
          {/* Y-axis */}
          <line x1="50" y1="20" x2="50" y2="180" stroke="#374151" strokeWidth="2" />

          {/* X-axis */}
          <line x1="50" y1="180" x2="420" y2="180" stroke="#374151" strokeWidth="2" />

          {/* Y-axis label */}
          <text x="15" y="100" textAnchor="middle" className="text-xs font-semibold" fill="#4b5563" transform="rotate(-90 15 100)">
            Value
          </text>

          {/* X-axis label */}
          <text x="235" y="220" textAnchor="middle" className="text-xs font-semibold" fill="#4b5563">
            Time/Days
          </text>

          {/* Grid lines and Y-axis labels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const yValue = yAxisMax - (i * yAxisRange / 4);
            const y = 20 + i * 40;
            return (
              <g key={i}>
                <line
                  x1="50"
                  y1={y}
                  x2="420"
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                <text x="35" y={y + 4} textAnchor="end" className="text-xs font-medium" fill="#6b7280">
                  {Math.round(yValue)}
                </text>
              </g>
            );
          })}

          {/* Line */}
          <polyline
            points={values
              .map((value, index) => {
                const x = 70 + (index * 330) / (values.length - 1 || 1);
                const y = 180 - ((value - yAxisMin) / yAxisRange) * 160;
                return `${x},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {values.map((value, index) => {
            const x = 70 + (index * 330) / (values.length - 1 || 1);
            const y = 180 - ((value - yAxisMin) / yAxisRange) * 160;
            return (
              <g key={index}>
                <circle cx={x} cy={y} r="5" fill="#3b82f6" />
                <text x={x} y={y - 12} textAnchor="middle" className="text-xs font-bold" fill="#1e40af">
                  {value}
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {labels.map((label, index) => {
            const x = 70 + (index * 330) / (labels.length - 1 || 1);
            return (
              <text key={index} x={x} y="198" textAnchor="middle" className="text-xs font-medium" fill="#4b5563">
                {label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

const PieChart = ({ labels, values }: { labels: string[]; values: number[] }) => {
  const total = values.reduce((sum, val) => sum + val, 0);
  const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

  let currentAngle = -90;
  const slices = values.map((value, index) => {
    const percentage = (value / total) * 100;
    const angle = (value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
    const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
    const x2 = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180);
    const y2 = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180);

    const largeArc = angle > 180 ? 1 : 0;
    const path = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return { path, color: colors[index % colors.length], percentage, label: labels[index], value };
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl border-2 border-pink-200">
      <div className="flex items-center justify-center gap-8">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {slices.map((slice, index) => (
            <path key={index} d={slice.path} fill={slice.color} stroke="white" strokeWidth="2" />
          ))}
        </svg>
        <div className="flex flex-col gap-2">
          {slices.map((slice, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {slice.label}: {slice.value} ({slice.percentage.toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnalogClock = ({ hour, minutes }: { hour: number; minutes: number }) => {
  const cx = 120;
  const cy = 120;
  const radius = 100;

  // Hour hand angle: each hour = 30 degrees, plus minute offset
  const hourAngle = ((hour % 12) + minutes / 60) * 30 - 90;
  const hourRad = (hourAngle * Math.PI) / 180;
  const hourLen = 55;
  const hourX = cx + hourLen * Math.cos(hourRad);
  const hourY = cy + hourLen * Math.sin(hourRad);

  // Minute hand angle: each minute = 6 degrees
  const minuteAngle = minutes * 6 - 90;
  const minuteRad = (minuteAngle * Math.PI) / 180;
  const minuteLen = 78;
  const minuteX = cx + minuteLen * Math.cos(minuteRad);
  const minuteY = cy + minuteLen * Math.sin(minuteRad);

  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
      <svg width="240" height="240" viewBox="0 0 240 240">
        {/* Clock face */}
        <circle cx={cx} cy={cy} r={radius} fill="white" stroke="#374151" strokeWidth="3" />

        {/* Hour markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = ((i + 1) * 30 - 90) * Math.PI / 180;
          const outerR = radius - 8;
          const innerR = radius - 20;
          const numR = radius - 30;
          return (
            <g key={i}>
              <line
                x1={cx + innerR * Math.cos(angle)}
                y1={cy + innerR * Math.sin(angle)}
                x2={cx + outerR * Math.cos(angle)}
                y2={cy + outerR * Math.sin(angle)}
                stroke="#374151"
                strokeWidth="2"
              />
              <text
                x={cx + numR * Math.cos(angle)}
                y={cy + numR * Math.sin(angle) + 5}
                textAnchor="middle"
                className="text-sm font-bold"
                fill="#1f2937"
              >
                {i + 1}
              </text>
            </g>
          );
        })}

        {/* Minute tick marks */}
        {Array.from({ length: 60 }).map((_, i) => {
          if (i % 5 === 0) return null;
          const angle = (i * 6 - 90) * Math.PI / 180;
          const outerR = radius - 8;
          const innerR = radius - 14;
          return (
            <line
              key={i}
              x1={cx + innerR * Math.cos(angle)}
              y1={cy + innerR * Math.sin(angle)}
              x2={cx + outerR * Math.cos(angle)}
              y2={cy + outerR * Math.sin(angle)}
              stroke="#9ca3af"
              strokeWidth="1"
            />
          );
        })}

        {/* Hour hand */}
        <line x1={cx} y1={cy} x2={hourX} y2={hourY} stroke="#1f2937" strokeWidth="5" strokeLinecap="round" />

        {/* Minute hand */}
        <line x1={cx} y1={cy} x2={minuteX} y2={minuteY} stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="5" fill="#1f2937" />
      </svg>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [grade, setGrade] = useState<Grade>('2nd');
  const [selectedType, setSelectedType] = useState<ProblemType>('addition');
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [availableProblemTypes, setAvailableProblemTypes] = useState(getProblemTypesForGrade('2nd'));
  const [userName, setUserName] = useState('');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scoresLoadedRef = useRef(false);

  // Test mode state
  const [showTestModeSelect, setShowTestModeSelect] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [timerTest, setTimerTest] = useState(false);
  const [testQuestionIndex, setTestQuestionIndex] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [testFinished, setTestFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const TOTAL_TEST_QUESTIONS = 10;
  const SECONDS_PER_QUESTION = 10;

  // My Tests view state
  const [showMyTests, setShowMyTests] = useState(false);
  const [testHistory, setTestHistory] = useState<Array<{
    id: number;
    score: number;
    total_questions: number;
    grade: string;
    completed_at: string;
  }>>([]);

  // Load user info and saved scores on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUserName(data.user.name);
      })
      .catch(() => {});

    fetch('/api/tests')
      .then(res => res.json())
      .then(data => {
        if (data.tests) setTestHistory(data.tests);
      })
      .catch(() => {});

    fetch('/api/scores')
      .then(res => res.json())
      .then(data => {
        if (data.scores) {
          setScore(data.scores.score);
          setTotalAttempts(data.scores.total_attempts);
          setCorrectAnswers(data.scores.correct_answers);
          setStreak(data.scores.streak);
          if (data.scores.grade) setGrade(data.scores.grade as Grade);
          scoresLoadedRef.current = true;
        }
      })
      .catch(() => {});
  }, []);

  // Debounced score save
  const saveScores = useCallback((s: number, ta: number, ca: number, st: number, g: string) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: s, total_attempts: ta, correct_answers: ca, streak: st, grade: g }),
      }).catch(() => {});
    }, 500);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    setTimeLeft(SECONDS_PER_QUESTION);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  const startTest = (timed: boolean) => {
    setShowTestModeSelect(false);
    setTestMode(true);
    setTimerTest(timed);
    setTestQuestionIndex(0);
    setTestScore(0);
    setTestFinished(false);
    setUserAnswer('');
    setFeedback(null);
    const types = getProblemTypesForGrade(grade);
    const randomType = types[Math.floor(Math.random() * types.length)];
    setCurrentProblem(generateProblem(randomType.id, grade));
    if (timed) {
      // Timer will be started by the useEffect below
      setTimeLeft(SECONDS_PER_QUESTION);
    }
  };

  // Start timer when entering timer test or advancing to next question
  useEffect(() => {
    if (testMode && timerTest && !testFinished && feedback === null) {
      startTimer();
    }
    return () => clearTimer();
  }, [testMode, timerTest, testFinished, testQuestionIndex, feedback, startTimer, clearTimer]);

  // Handle time running out
  useEffect(() => {
    if (timerTest && testMode && !testFinished && timeLeft === 0 && feedback === null) {
      // Time's up — treat as incorrect
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback(null);
        setUserAnswer('');
        const nextIndex = testQuestionIndex + 1;
        if (nextIndex >= TOTAL_TEST_QUESTIONS) {
          setTestFinished(true);
          setTestQuestionIndex(nextIndex);
          fetch('/api/tests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score: testScore, total_questions: TOTAL_TEST_QUESTIONS, grade }),
          }).then(() =>
            fetch('/api/tests').then(res => res.json()).then(data => {
              if (data.tests) setTestHistory(data.tests);
            })
          ).catch(() => {});
        } else {
          setTestQuestionIndex(nextIndex);
          const types = getProblemTypesForGrade(grade);
          const randomType = types[Math.floor(Math.random() * types.length)];
          setCurrentProblem(generateProblem(randomType.id, grade));
        }
      }, 1000);
    }
  }, [timeLeft, timerTest, testMode, testFinished, feedback, testQuestionIndex, testScore, grade]);

  const handleTestAnswer = () => {
    if (!currentProblem || userAnswer.trim() === '') return;
    clearTimer();

    const isCorrect = parseInt(userAnswer) === currentProblem.answer;
    const newTestScore = isCorrect ? testScore + 1 : testScore;
    if (isCorrect) setTestScore(newTestScore);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer('');
      const nextIndex = testQuestionIndex + 1;
      if (nextIndex >= TOTAL_TEST_QUESTIONS) {
        setTestFinished(true);
        setTestQuestionIndex(nextIndex);
        fetch('/api/tests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score: newTestScore, total_questions: TOTAL_TEST_QUESTIONS, grade }),
        }).then(() =>
          fetch('/api/tests').then(res => res.json()).then(data => {
            if (data.tests) setTestHistory(data.tests);
          })
        ).catch(() => {});
      } else {
        setTestQuestionIndex(nextIndex);
        const types = getProblemTypesForGrade(grade);
        const randomType = types[Math.floor(Math.random() * types.length)];
        setCurrentProblem(generateProblem(randomType.id, grade));
      }
    }, 1000);
  };

  const exitTest = () => {
    clearTimer();
    setTestMode(false);
    setTimerTest(false);
    setTestFinished(false);
    setTestQuestionIndex(0);
    setTestScore(0);
    setUserAnswer('');
    setFeedback(null);
    setCurrentProblem(generateProblem(selectedType, grade));
  };

  const loadTestHistory = async () => {
    try {
      const res = await fetch('/api/tests');
      const data = await res.json();
      if (data.tests) setTestHistory(data.tests);
    } catch { /* ignore */ }
    setShowMyTests(true);
  };

  // Update available problem types and reset selection when grade changes
  useEffect(() => {
    const typesForGrade = getProblemTypesForGrade(grade);
    setAvailableProblemTypes(typesForGrade);

    // If current selected type is not available for new grade, switch to first available
    const isTypeAvailable = typesForGrade.some(t => t.id === selectedType);
    if (!isTypeAvailable && typesForGrade.length > 0) {
      setSelectedType(typesForGrade[0].id);
    }
  }, [grade, selectedType]);

  useEffect(() => {
    setCurrentProblem(generateProblem(selectedType, grade));
  }, [selectedType, grade]);

  const handleCheckAnswer = () => {
    if (!currentProblem || userAnswer.trim() === '') return;

    const isCorrect = parseInt(userAnswer) === currentProblem.answer;
    const newTotalAttempts = totalAttempts + 1;
    setTotalAttempts(newTotalAttempts);

    let newScore = score;
    let newCorrectAnswers = correctAnswers;
    let newStreak = streak;

    if (isCorrect) {
      newScore = score + 1;
      newCorrectAnswers = correctAnswers + 1;
      newStreak = streak + 1;
      setScore(newScore);
      setCorrectAnswers(newCorrectAnswers);
      setStreak(newStreak);
      setFeedback('correct');
    } else {
      newStreak = 0;
      setStreak(0);
      setFeedback('incorrect');
    }

    saveScores(newScore, newTotalAttempts, newCorrectAnswers, newStreak, grade);

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer('');
      setCurrentProblem(generateProblem(selectedType, grade));
    }, 1500);
  };

  const handleSkipProblem = () => {
    setUserAnswer('');
    setCurrentProblem(generateProblem(selectedType, grade));
    setStreak(0);
  };

  const handleTypeSelect = (type: ProblemType) => {
    setSelectedType(type);
    setUserAnswer('');
  };

  const accuracy = totalAttempts > 0 ? Math.round((correctAnswers / totalAttempts) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-gray-400 text-sm">Math Problem Generator</div>
          <div className="flex items-center gap-3">
            {userName && <span className="text-gray-700 text-sm font-medium">Hi, {userName}!</span>}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Math Practice</h1>
              <p className="text-gray-600">Practice your math skills and have fun!</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowGradeDropdown(!showGradeDropdown)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg transition-all"
            >
              <span className="font-semibold">Grade:</span>
              <span className="font-bold">{grade}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showGradeDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white border-2 border-purple-200 rounded-lg shadow-xl z-10">
                {grades.map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setGrade(g);
                      setShowGradeDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-purple-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                      g === grade ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold' : 'text-gray-700 font-medium'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border-2 border-green-200 p-6">
            <div className="text-gray-600 text-sm mb-1">Score</div>
            <div className="text-4xl font-bold text-green-600">{score}</div>
          </div>
          <div className="bg-white rounded-xl border-2 border-blue-200 p-6">
            <div className="text-gray-600 text-sm mb-1">Accuracy</div>
            <div className="text-4xl font-bold text-blue-600">{accuracy}%</div>
          </div>
          <div className="bg-white rounded-xl border-2 border-orange-200 p-6">
            <div className="text-gray-600 text-sm mb-1">Streak</div>
            <div className="text-4xl font-bold text-orange-600">{streak}</div>
          </div>
          <button
            onClick={loadTestHistory}
            className="bg-white rounded-xl border-2 border-purple-200 p-6 text-left hover:border-purple-400 hover:shadow-md transition-all"
          >
            <div className="text-gray-600 text-sm mb-1 flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4" />
              My Tests
            </div>
            <div className="text-4xl font-bold text-purple-600">{testHistory.length}</div>
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Choose Problem Type
            </h2>
            <div className="relative">
              <button
                onClick={() => setShowTestModeSelect(!showTestModeSelect)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg transition-all font-semibold"
              >
                <Trophy className="w-5 h-5" />
                Test My Skills
              </button>
              {showTestModeSelect && (
                <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-green-200 rounded-xl shadow-xl z-10 overflow-hidden">
                  <button
                    onClick={() => startTest(false)}
                    className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors flex items-center gap-3 border-b border-gray-100"
                  >
                    <Trophy className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Normal</div>
                      <div className="text-xs text-gray-500">No time limit</div>
                    </div>
                  </button>
                  <button
                    onClick={() => startTest(true)}
                    className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center gap-3"
                  >
                    <Timer className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Timer</div>
                      <div className="text-xs text-gray-500">10 seconds per question</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {availableProblemTypes.map((type) => {
              const Icon = iconMap[type.id];
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-purple-400 bg-purple-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <Icon className={`w-8 h-8 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`} />
                  <span
                    className={`text-sm font-medium ${
                      isSelected ? 'text-purple-600' : 'text-gray-700'
                    }`}
                  >
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Test mode UI */}
        {testMode && !testFinished && currentProblem && (
          <div className="bg-white rounded-xl border-2 border-green-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={exitTest}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Exit Test
              </button>
              <div className="flex items-center gap-3">
                {timerTest && (
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-sm ${
                    timeLeft <= 3 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    <Timer className="w-4 h-4" />
                    {timeLeft}s
                  </div>
                )}
                <div className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  Question {testQuestionIndex + 1} / {TOTAL_TEST_QUESTIONS}
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(testQuestionIndex / TOTAL_TEST_QUESTIONS) * 100}%` }}
              />
            </div>

            {timerTest && (
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
                <div
                  className={`h-1.5 rounded-full transition-all duration-1000 linear ${
                    timeLeft <= 3 ? 'bg-red-500' : 'bg-orange-400'
                  }`}
                  style={{ width: `${(timeLeft / SECONDS_PER_QUESTION) * 100}%` }}
                />
              </div>
            )}

            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-900 mb-8">
                {currentProblem.question}
              </div>
            </div>

            {currentProblem.chartData && (
              <div className="mb-8">
                {currentProblem.chartData.chartType === 'bar' && (
                  <BarChart labels={currentProblem.chartData.labels} values={currentProblem.chartData.values} />
                )}
                {currentProblem.chartData.chartType === 'line' && (
                  <LineChart labels={currentProblem.chartData.labels} values={currentProblem.chartData.values} />
                )}
                {currentProblem.chartData.chartType === 'pie' && (
                  <PieChart labels={currentProblem.chartData.labels} values={currentProblem.chartData.values} />
                )}
                {currentProblem.chartData.chartType === 'clock' && (
                  <AnalogClock hour={currentProblem.chartData.values[0]} minutes={currentProblem.chartData.values[1]} />
                )}
              </div>
            )}

            <div className="max-w-md mx-auto space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTestAnswer()}
                placeholder="Your answer"
                disabled={feedback !== null}
                className={`w-full px-6 py-4 text-center text-xl text-gray-900 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                  feedback === 'correct'
                    ? 'border-green-400 bg-green-50'
                    : feedback === 'incorrect'
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 bg-white'
                }`}
              />

              {feedback && (
                <div
                  className={`text-center text-lg font-medium ${
                    feedback === 'correct' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {feedback === 'correct' ? '✓ Correct!' : `✗ Answer: ${currentProblem.answer}`}
                </div>
              )}

              <button
                onClick={handleTestAnswer}
                disabled={feedback !== null || userAnswer.trim() === ''}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:bg-green-200 disabled:text-green-400 disabled:cursor-not-allowed transition-colors"
              >
                Submit Answer
              </button>
            </div>
          </div>
        )}

        {/* Test finished screen */}
        {testMode && testFinished && (
          <div className="bg-white rounded-xl border-2 border-green-200 p-8 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Complete!</h2>
            <p className="text-gray-600 mb-6">Grade: {grade}</p>
            <div className="text-6xl font-bold text-green-600 mb-2">
              {testScore} / {TOTAL_TEST_QUESTIONS}
            </div>
            <p className="text-lg text-gray-600 mb-8">
              {testScore >= 9 ? 'Outstanding!' : testScore >= 7 ? 'Great job!' : testScore >= 5 ? 'Good effort!' : 'Keep practicing!'}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => startTest(false)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 shadow-md transition-all"
              >
                Normal Test
              </button>
              <button
                onClick={() => startTest(true)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 shadow-md transition-all flex items-center gap-2"
              >
                <Timer className="w-4 h-4" />
                Timed Test
              </button>
              <button
                onClick={exitTest}
                className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Back to Practice
              </button>
            </div>
          </div>
        )}

        {/* Normal mode problem card */}
        {!testMode && currentProblem && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="text-center mb-4">
              <div className="text-sm font-medium text-gray-600 mb-4">
                {availableProblemTypes.find((t) => t.id === selectedType)?.label}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-8">
                {currentProblem.question}
              </div>
            </div>

            {currentProblem.chartData && (
              <div className="mb-8">
                {currentProblem.chartData.chartType === 'bar' && (
                  <BarChart labels={currentProblem.chartData.labels} values={currentProblem.chartData.values} />
                )}
                {currentProblem.chartData.chartType === 'line' && (
                  <LineChart labels={currentProblem.chartData.labels} values={currentProblem.chartData.values} />
                )}
                {currentProblem.chartData.chartType === 'pie' && (
                  <PieChart labels={currentProblem.chartData.labels} values={currentProblem.chartData.values} />
                )}
                {currentProblem.chartData.chartType === 'clock' && (
                  <AnalogClock hour={currentProblem.chartData.values[0]} minutes={currentProblem.chartData.values[1]} />
                )}
              </div>
            )}

            <div className="max-w-md mx-auto space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCheckAnswer()}
                placeholder="Your answer"
                disabled={feedback !== null}
                className={`w-full px-6 py-4 text-center text-xl text-gray-900 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  feedback === 'correct'
                    ? 'border-green-400 bg-green-50'
                    : feedback === 'incorrect'
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 bg-white'
                }`}
              />

              {feedback && (
                <div
                  className={`text-center text-lg font-medium ${
                    feedback === 'correct' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {feedback === 'correct' ? '✓ Correct!' : '✗ Try again!'}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleCheckAnswer}
                  disabled={feedback !== null || userAnswer.trim() === ''}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:bg-purple-200 disabled:text-purple-400 disabled:cursor-not-allowed transition-colors"
                >
                  Check Answer
                </button>
                <button
                  onClick={handleSkipProblem}
                  disabled={feedback !== null}
                  className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Skip Problem
                </button>
              </div>
            </div>
          </div>
        )}

        {/* My Tests modal */}
        {showMyTests && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-purple-600" />
                  My Tests
                </h2>
                <button
                  onClick={() => setShowMyTests(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  &times;
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-6">
                {testHistory.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="font-medium">No tests yet</p>
                    <p className="text-sm mt-1">Take a test to see your results here!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testHistory.map((test, index) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {test.score}/{test.total_questions} correct
                            </div>
                            <div className="text-xs text-gray-500">
                              Grade {test.grade} &middot; {new Date(test.completed_at + 'Z').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        <div className={`text-lg font-bold ${
                          test.score >= 9 ? 'text-green-600' : test.score >= 7 ? 'text-blue-600' : test.score >= 5 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {Math.round((test.score / test.total_questions) * 100)}%
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
