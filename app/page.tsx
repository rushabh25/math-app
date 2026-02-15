'use client';

import { useState, useEffect } from 'react';
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

export default function Home() {
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
    setTotalAttempts(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
      setFeedback('correct');
    } else {
      setStreak(0);
      setFeedback('incorrect');
    }

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
          <div className="text-gray-400 text-sm">Share</div>
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

        <div className="grid grid-cols-3 gap-4 mb-8">
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
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
            Choose Problem Type
          </h2>
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

        {currentProblem && (
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
                className={`w-full px-6 py-4 text-center text-xl border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  feedback === 'correct'
                    ? 'border-green-400 bg-green-50'
                    : feedback === 'incorrect'
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200'
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
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
      </main>
    </div>
  );
}
