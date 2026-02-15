# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start development server (runs on localhost:3001)
- `npm run build` — Production build
- `npm run lint` — Run ESLint (flat config with next core-web-vitals + typescript rules)

No test framework is configured.

## Architecture

This is a single-page Next.js 16 app (App Router) for kids to practice math problems. The entire application lives in one client component:

- **`app/page.tsx`** — The sole component (`'use client'`). Contains all application logic: problem generation, scoring/streak state, chart rendering (SVG-based bar/line/pie), and UI. There are no separate component files, hooks, or utility modules.
- **`app/layout.tsx`** — Root layout with Geist font setup and metadata.
- **`app/globals.css`** — Tailwind v4 import (`@import "tailwindcss"`) with CSS custom properties for theming.

### Key data flow in `page.tsx`

- `allProblemTypes` array defines all 12 problem categories with grade availability ranges
- `getProblemTypesForGrade()` filters categories by grade number
- `generateProblem()` is the core function — a large switch statement producing randomized questions per type, with grade-based difficulty scaling and multiple question format variations
- State is managed entirely with `useState` hooks (grade, selectedType, currentProblem, score, accuracy, streak, feedback)
- Answer checking uses `parseInt()` comparison — all answers are integers (including decimal problems which ask for tenths count)

### Styling

Tailwind CSS v4 via PostCSS plugin (`@tailwindcss/postcss`). Uses `@theme inline` directive in globals.css. No tailwind.config file — v4 uses CSS-based configuration.

### Path aliases

`@/*` maps to project root (tsconfig paths).
