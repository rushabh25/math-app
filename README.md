# Math Practice App

A fun and engaging Next.js app designed to help kids challenge themselves by solving math problems. Built with modern web technologies and featuring an intuitive, kid-friendly interface.

## Features

- **Multiple Problem Types**: Addition, Subtraction, Multiplication, Division, Fractions, Word Problems, Graphs, and Mixed
- **Grade Levels**: Supports 1st through 6th grade with difficulty scaling
- **Progress Tracking**:
  - Score counter
  - Accuracy percentage
  - Streak tracking for consecutive correct answers
- **Instant Feedback**: Visual feedback for correct and incorrect answers
- **Adaptive Difficulty**: Problems adjust based on selected grade level
- **Clean UI**: Kid-friendly design based on the Figma specification

## Technologies Used

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hooks** for state management

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd math-practice-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser to see the app.

## How to Use

1. **Select Grade Level**: Click the grade dropdown in the top-right corner to choose your grade level (1st-6th)
2. **Choose Problem Type**: Click on any of the 8 problem type cards:
   - Addition ✓
   - Subtraction ✓
   - Multiplication ✓
   - Division ✓
   - Fractions (placeholder)
   - Word Problems (placeholder)
   - Graphs (placeholder)
   - Mixed (placeholder)
3. **Solve Problems**: Enter your answer in the input field and click "Check Answer" or press Enter
4. **Track Progress**: Watch your Score, Accuracy, and Streak update as you solve problems
5. **Skip Problems**: If a problem is too difficult, click "Skip Problem" to get a new one

## Project Structure

```
math-practice-app/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Main application component
│   └── globals.css          # Global styles
├── public/                  # Static assets
└── README.md                # This file
```

## Features in Detail

### Problem Generation
- Problems are dynamically generated based on grade level
- Difficulty scales appropriately (larger numbers for higher grades)
- Division problems ensure whole number answers
- Subtraction problems ensure positive results

### Scoring System
- **Score**: Total number of correct answers
- **Accuracy**: Percentage of correct answers out of total attempts
- **Streak**: Number of consecutive correct answers (resets on wrong answer or skip)

### Visual Feedback
- Correct answers show green highlight with checkmark
- Incorrect answers show red highlight with X
- Selected problem type is highlighted in purple
- Stats cards use color-coded borders (green, blue, orange)

## Future Enhancements

- [ ] Implement Fractions problems with visual representations
- [ ] Add Word Problems with real-world scenarios
- [ ] Create interactive Graphs problems
- [ ] Add Mixed mode (random problem types)
- [ ] Save progress to local storage
- [ ] Add timer challenges
- [ ] Create leaderboards
- [ ] Add sound effects and animations
- [ ] Support for more operations (exponents, roots, etc.)
- [ ] Add user profiles and achievements

## Building for Production

```bash
npm run build
npm start
```

## License

This project is created for educational purposes.

## Credits

Design based on the Figma specification provided by the user.
