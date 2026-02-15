export type ProblemType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'fractions' | 'word' | 'graphs' | 'mixed' | 'decimals' | 'percentages' | 'patterns' | 'ratios';
export type Grade = '1st' | '2nd' | '3rd' | '4th' | '5th' | '6th';

export interface ChartData {
  labels: string[];
  values: number[];
  chartType: 'bar' | 'line' | 'pie';
}

export interface Problem {
  question: string;
  answer: number;
  type: ProblemType;
  chartData?: ChartData;
}

export interface ProblemTypeInfo {
  id: ProblemType;
  label: string;
  grades: number[];
}

export const allProblemTypes: ProblemTypeInfo[] = [
  { id: 'addition', label: 'Addition', grades: [1, 2, 3] },
  { id: 'subtraction', label: 'Subtraction', grades: [1, 2, 3] },
  { id: 'patterns', label: 'Patterns', grades: [1, 2] },
  { id: 'multiplication', label: 'Multiplication', grades: [2, 3, 4, 5] },
  { id: 'division', label: 'Division', grades: [2, 3, 4, 5] },
  { id: 'word', label: 'Word Problems', grades: [2, 3, 4, 5] },
  { id: 'fractions', label: 'Fractions', grades: [3, 4, 5] },
  { id: 'decimals', label: 'Decimals', grades: [4, 5] },
  { id: 'graphs', label: 'Graphs', grades: [4, 5] },
  { id: 'percentages', label: 'Percentages', grades: [5] },
  { id: 'ratios', label: 'Ratios', grades: [5] },
  { id: 'mixed', label: 'Mixed', grades: [3, 4, 5] },
];

export const grades: Grade[] = ['1st', '2nd', '3rd', '4th', '5th'];

export const getProblemTypesForGrade = (grade: Grade): ProblemTypeInfo[] => {
  const gradeNum = parseInt(grade);
  return allProblemTypes.filter(type => type.grades.includes(gradeNum));
};

export const generateProblem = (type: ProblemType, grade: Grade): Problem => {
  const gradeLevel = parseInt(grade);
  // Grade-based difficulty scaling
  const baseMax = gradeLevel === 1 ? 20 : gradeLevel === 2 ? 50 : gradeLevel === 3 ? 100 : gradeLevel === 4 ? 300 : gradeLevel === 5 ? 500 : 1000;
  const variation = Math.floor(Math.random() * baseMax * 0.2);
  const maxNum = baseMax + variation;

  // Limit advanced question formats for lower grades
  const maxFormats = gradeLevel <= 2 ? 6 : gradeLevel <= 4 ? 10 : 14;

  switch (type) {
    case 'addition': {
      const a = Math.floor(Math.random() * maxNum) + 1;
      const b = Math.floor(Math.random() * maxNum) + 1;
      const sum = a + b;
      const format = Math.floor(Math.random() * Math.min(12, maxFormats));

      switch (format) {
        case 0:
          return { question: `${a} + ${b} = ?`, answer: sum, type };
        case 1:
          return { question: `What is ${a} plus ${b}?`, answer: sum, type };
        case 2:
          return { question: `Add ${a} and ${b}`, answer: sum, type };
        case 3:
          return { question: `? = ${a} + ${b}`, answer: sum, type };
        case 4:
          return { question: `${a} + ? = ${sum}`, answer: b, type };
        case 5:
          return { question: `? + ${b} = ${sum}`, answer: a, type };
        case 6:
          return { question: `If you have ${a} and get ${b} more, how many do you have?`, answer: sum, type };
        case 7:
          return { question: `${a} increased by ${b} equals what?`, answer: sum, type };
        case 8:
          return { question: `Find the sum: ${a} + ${b}`, answer: sum, type };
        case 9:
          return { question: `Calculate ${a} + ${b}`, answer: sum, type };
        case 10:
          return { question: `${sum} = ${a} + ?`, answer: b, type };
        case 11:
          return { question: `Combine ${a} and ${b}. What's the total?`, answer: sum, type };
        default:
          return { question: `${a} + ${b} = ?`, answer: sum, type };
      }
    }
    case 'subtraction': {
      const a = Math.floor(Math.random() * maxNum) + 1;
      const b = Math.floor(Math.random() * a) + 1;
      const diff = a - b;
      const format = Math.floor(Math.random() * Math.min(12, maxFormats));

      switch (format) {
        case 0:
          return { question: `${a} - ${b} = ?`, answer: diff, type };
        case 1:
          return { question: `What is ${a} minus ${b}?`, answer: diff, type };
        case 2:
          return { question: `Subtract ${b} from ${a}`, answer: diff, type };
        case 3:
          return { question: `? = ${a} - ${b}`, answer: diff, type };
        case 4:
          return { question: `${a} - ? = ${diff}`, answer: b, type };
        case 5:
          return { question: `? - ${b} = ${diff}`, answer: a, type };
        case 6:
          return { question: `If you have ${a} and lose ${b}, how many remain?`, answer: diff, type };
        case 7:
          return { question: `${a} decreased by ${b} equals what?`, answer: diff, type };
        case 8:
          return { question: `Find the difference: ${a} - ${b}`, answer: diff, type };
        case 9:
          return { question: `Calculate ${a} - ${b}`, answer: diff, type };
        case 10:
          return { question: `${diff} = ${a} - ?`, answer: b, type };
        case 11:
          return { question: `Take ${b} away from ${a}. What's left?`, answer: diff, type };
        default:
          return { question: `${a} - ${b} = ?`, answer: diff, type };
      }
    }
    case 'multiplication': {
      // Grade-based multiplication ranges
      const multMax = gradeLevel === 1 ? 5 : gradeLevel === 2 ? 10 : gradeLevel === 3 ? 12 : gradeLevel === 4 ? 15 : gradeLevel === 5 ? 20 : 25;
      const a = Math.floor(Math.random() * multMax) + 1;
      const b = Math.floor(Math.random() * multMax) + 1;
      const product = a * b;
      const format = Math.floor(Math.random() * Math.min(14, maxFormats));

      switch (format) {
        case 0:
          return { question: `${a} × ${b} = ?`, answer: product, type };
        case 1:
          return { question: `${a} * ${b} = ?`, answer: product, type };
        case 2:
          return { question: `What is ${a} times ${b}?`, answer: product, type };
        case 3:
          return { question: `Multiply ${a} by ${b}`, answer: product, type };
        case 4:
          return { question: `? = ${a} × ${b}`, answer: product, type };
        case 5:
          return { question: `${a} × ? = ${product}`, answer: b, type };
        case 6:
          return { question: `? × ${b} = ${product}`, answer: a, type };
        case 7:
          return { question: `If you have ${a} groups of ${b}, how many in total?`, answer: product, type };
        case 8:
          return { question: `${a} multiplied by ${b} equals what?`, answer: product, type };
        case 9:
          return { question: `What is the product of ${a} and ${b}?`, answer: product, type };
        case 10:
          return { question: `Calculate ${a} × ${b}`, answer: product, type };
        case 11:
          return { question: `${product} = ${a} × ?`, answer: b, type };
        case 12:
          return { question: `Find the product: ${a} × ${b}`, answer: product, type };
        case 13:
          return { question: `${a} rows with ${b} items each. How many total?`, answer: product, type };
        default:
          return { question: `${a} × ${b} = ?`, answer: product, type };
      }
    }
    case 'division': {
      // Grade-based division ranges
      const divMax = gradeLevel === 1 ? 5 : gradeLevel === 2 ? 10 : gradeLevel === 3 ? 12 : gradeLevel === 4 ? 15 : gradeLevel === 5 ? 20 : 25;
      const b = Math.floor(Math.random() * divMax) + 1;
      const quotient = Math.floor(Math.random() * divMax) + 1;
      const a = b * quotient;
      const format = Math.floor(Math.random() * Math.min(14, maxFormats));

      switch (format) {
        case 0:
          return { question: `${a} ÷ ${b} = ?`, answer: quotient, type };
        case 1:
          return { question: `${a} / ${b} = ?`, answer: quotient, type };
        case 2:
          return { question: `What is ${a} divided by ${b}?`, answer: quotient, type };
        case 3:
          return { question: `Divide ${a} by ${b}`, answer: quotient, type };
        case 4:
          return { question: `? = ${a} ÷ ${b}`, answer: quotient, type };
        case 5:
          return { question: `${a} ÷ ? = ${quotient}`, answer: b, type };
        case 6:
          return { question: `? ÷ ${b} = ${quotient}`, answer: a, type };
        case 7:
          return { question: `If ${a} items are split into ${b} equal groups, how many per group?`, answer: quotient, type };
        case 8:
          return { question: `How many times does ${b} go into ${a}?`, answer: quotient, type };
        case 9:
          return { question: `What is the quotient of ${a} and ${b}?`, answer: quotient, type };
        case 10:
          return { question: `Calculate ${a} ÷ ${b}`, answer: quotient, type };
        case 11:
          return { question: `${quotient} = ${a} ÷ ?`, answer: b, type };
        case 12:
          return { question: `Find the quotient: ${a} ÷ ${b}`, answer: quotient, type };
        case 13:
          return { question: `Share ${a} equally among ${b} people. Each gets how many?`, answer: quotient, type };
        default:
          return { question: `${a} ÷ ${b} = ?`, answer: quotient, type };
      }
    }
    case 'fractions': {
      // Limit fraction complexity for lower grades
      const maxFractionTypes = gradeLevel <= 2 ? 2 : gradeLevel <= 4 ? 4 : 6;
      const problemType = Math.floor(Math.random() * maxFractionTypes);

      // Grade-appropriate fraction denominators
      const maxDenom = gradeLevel <= 2 ? 4 : gradeLevel <= 4 ? 8 : 12;

      if (problemType === 0) {
        // Simplify fractions (grades 3+)
        if (gradeLevel < 3) {
          // For lower grades, do fraction of a number instead
          const denominator = [2, 3, 4][Math.floor(Math.random() * 3)];
          const number = denominator * (Math.floor(Math.random() * 6) + 2);
          const numerator = 1;
          return {
            question: `What is ${numerator}/${denominator} of ${number}?`,
            answer: (numerator * number) / denominator,
            type,
          };
        }
        const numerator = Math.floor(Math.random() * 16) + 4;
        const denominator = Math.floor(Math.random() * 8) + 3;
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const commonDivisor = gcd(numerator, denominator);
        const simplifiedNum = numerator / commonDivisor;
        const variations = [
          `Simplify ${numerator}/${denominator}. What is the numerator?`,
          `Reduce ${numerator}/${denominator} to lowest terms. What is the numerator?`,
          `${numerator}/${denominator} in simplest form has what numerator?`,
        ];
        return {
          question: variations[Math.floor(Math.random() * variations.length)],
          answer: simplifiedNum,
          type,
        };
      } else if (problemType === 1) {
        // Add fractions with same denominator
        const denominator = Math.floor(Math.random() * Math.min(6, maxDenom - 2)) + 2;
        const num1 = Math.floor(Math.random() * (denominator - 1)) + 1;
        const num2 = Math.floor(Math.random() * (denominator - 1)) + 1;
        return {
          question: `${num1}/${denominator} + ${num2}/${denominator} = ?/${denominator}. What is the numerator?`,
          answer: num1 + num2,
          type,
        };
      } else if (problemType === 2) {
        // Subtract fractions with same denominator (grades 3+)
        const denominator = Math.floor(Math.random() * Math.min(6, maxDenom - 2)) + 2;
        const num1 = Math.floor(Math.random() * (denominator - 1)) + 2;
        const num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
        return {
          question: `${num1}/${denominator} - ${num2}/${denominator} = ?/${denominator}. What is the numerator?`,
          answer: num1 - num2,
          type,
        };
      } else if (problemType === 3) {
        // Fraction of a number
        const possibleDenoms = gradeLevel <= 2 ? [2, 3, 4] : gradeLevel <= 4 ? [2, 3, 4, 5, 6] : [2, 3, 4, 5, 6, 8, 10];
        const denominator = possibleDenoms[Math.floor(Math.random() * possibleDenoms.length)];
        const multiplier = gradeLevel <= 2 ? 5 : gradeLevel <= 4 ? 10 : 15;
        const number = denominator * (Math.floor(Math.random() * multiplier) + 2);
        const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
        const variations = [
          `What is ${numerator}/${denominator} of ${number}?`,
          `Find ${numerator}/${denominator} × ${number}`,
          `Calculate ${numerator}/${denominator} of ${number}`,
        ];
        return {
          question: variations[Math.floor(Math.random() * variations.length)],
          answer: (numerator * number) / denominator,
          type,
        };
      } else if (problemType === 4) {
        // Compare fractions (grades 4+)
        const possibleDenoms = gradeLevel <= 4 ? [4, 6, 8] : [4, 6, 8, 10, 12];
        const denom = possibleDenoms[Math.floor(Math.random() * possibleDenoms.length)];
        const num1 = Math.floor(Math.random() * (denom - 2)) + 1;
        let num2 = Math.floor(Math.random() * (denom - 2)) + 1;
        while (num1 === num2) num2 = Math.floor(Math.random() * (denom - 2)) + 1;
        const answer = num1 > num2 ? num1 : num2;
        return {
          question: `Which is larger: ${num1}/${denom} or ${num2}/${denom}? Enter the larger numerator.`,
          answer: answer,
          type,
        };
      } else {
        // Convert mixed number to improper fraction (grades 5+)
        const maxWhole = gradeLevel <= 4 ? 3 : 5;
        const whole = Math.floor(Math.random() * maxWhole) + 1;
        const possibleDenoms = gradeLevel <= 4 ? [2, 3, 4] : [2, 3, 4, 5, 6];
        const denominator = possibleDenoms[Math.floor(Math.random() * possibleDenoms.length)];
        const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
        const improper = whole * denominator + numerator;
        return {
          question: `Convert ${whole} and ${numerator}/${denominator} to an improper fraction. What is the numerator? (Keep denominator as ${denominator})`,
          answer: improper,
          type,
        };
      }
    }
    case 'word': {
      // Grade-based number ranges for word problems
      const wordMax = gradeLevel === 1 ? 15 : gradeLevel === 2 ? 30 : gradeLevel === 3 ? 50 : gradeLevel === 4 ? 100 : 200;

      const wordProblems = [
        // Addition problems
        () => {
          const items = ['apples', 'stickers', 'marbles', 'cards', 'coins'][Math.floor(Math.random() * 5)];
          const names = ['Sarah', 'Alex', 'Maya', 'Jake', 'Emma'][Math.floor(Math.random() * 5)];
          const has = Math.floor(Math.random() * wordMax) + Math.floor(wordMax * 0.2);
          const gets = Math.floor(Math.random() * wordMax * 0.6) + Math.floor(wordMax * 0.1);
          return {
            question: `${names} has ${has} ${items}. A friend gives ${names} ${gets} more ${items}. How many ${items} does ${names} have now?`,
            answer: has + gets,
          };
        },
        () => {
          const num1 = Math.floor(Math.random() * wordMax) + Math.floor(wordMax * 0.3);
          const num2 = Math.floor(Math.random() * wordMax) + Math.floor(wordMax * 0.3);
          return {
            question: `There are ${num1} birds in one tree and ${num2} birds in another tree. How many birds are there in total?`,
            answer: num1 + num2,
          };
        },
        // Subtraction problems
        () => {
          const items = ['cookies', 'cupcakes', 'candies', 'muffins', 'donuts'][Math.floor(Math.random() * 5)];
          const made = Math.floor(Math.random() * wordMax) + Math.floor(wordMax * 0.5);
          const eaten = Math.floor(Math.random() * (made - Math.floor(made * 0.2))) + Math.floor(made * 0.1);
          return {
            question: `A bakery made ${made} ${items}. They sold ${eaten} ${items}. How many ${items} are left?`,
            answer: made - eaten,
          };
        },
        () => {
          const had = Math.floor(Math.random() * wordMax) + Math.floor(wordMax * 0.5);
          const gave = Math.floor(Math.random() * (had - Math.floor(had * 0.2))) + Math.floor(had * 0.1);
          return {
            question: `Lisa had ${had} toy blocks. She gave ${gave} blocks to her brother. How many blocks does Lisa have left?`,
            answer: had - gave,
          };
        },
        // Multiplication problems
        () => {
          const containers = ['boxes', 'bags', 'baskets', 'rows', 'groups'][Math.floor(Math.random() * 5)];
          const items = ['pencils', 'erasers', 'books', 'toys', 'crayons'][Math.floor(Math.random() * 5)];
          const multMax = gradeLevel <= 2 ? 5 : gradeLevel <= 4 ? 8 : 12;
          const num = Math.floor(Math.random() * multMax) + 2;
          const per = Math.floor(Math.random() * multMax) + 2;
          return {
            question: `There are ${num} ${containers}. Each has ${per} ${items}. How many ${items} are there in total?`,
            answer: num * per,
          };
        },
        () => {
          const priceMax = gradeLevel <= 2 ? 5 : gradeLevel <= 4 ? 10 : 20;
          const price = Math.floor(Math.random() * priceMax) + 2;
          const itemsMax = gradeLevel <= 2 ? 4 : gradeLevel <= 4 ? 7 : 10;
          const items = Math.floor(Math.random() * itemsMax) + 2;
          const things = ['notebooks', 'pens', 'toys', 'books', 'snacks'][Math.floor(Math.random() * 5)];
          return {
            question: `Each ${things.slice(0, -1)} costs $${price}. How much do ${items} ${things} cost in total?`,
            answer: price * items,
          };
        },
        // Division problems
        () => {
          const possibleGroups = gradeLevel <= 2 ? [2, 3, 4] : gradeLevel <= 4 ? [2, 3, 4, 5, 6] : [2, 3, 4, 5, 6, 7, 8];
          const groups = possibleGroups[Math.floor(Math.random() * possibleGroups.length)];
          const divMax = gradeLevel <= 2 ? 6 : gradeLevel <= 4 ? 10 : 15;
          const perGroup = Math.floor(Math.random() * divMax) + 2;
          const total = groups * perGroup;
          const items = ['stickers', 'candies', 'toys', 'cards', 'coins'][Math.floor(Math.random() * 5)];
          return {
            question: `${total} ${items} are shared equally among ${groups} friends. How many ${items} does each friend get?`,
            answer: perGroup,
          };
        },
        () => {
          const possiblePeople = gradeLevel <= 2 ? [2, 3, 4] : gradeLevel <= 4 ? [3, 4, 5, 6] : [4, 5, 6, 8];
          const people = possiblePeople[Math.floor(Math.random() * possiblePeople.length)];
          const divMax = gradeLevel <= 2 ? 6 : gradeLevel <= 4 ? 8 : 12;
          const each = Math.floor(Math.random() * divMax) + 2;
          const total = people * each;
          return {
            question: `A pizza has ${total} slices. If ${people} people share it equally, how many slices does each person get?`,
            answer: each,
          };
        },
        // Money problems
        () => {
          const moneyMax = gradeLevel <= 2 ? 20 : gradeLevel <= 4 ? 50 : 100;
          const had = Math.floor(Math.random() * moneyMax) + Math.floor(moneyMax * 0.3);
          const spent = Math.floor(Math.random() * (had - Math.floor(had * 0.2))) + Math.floor(had * 0.1);
          const items = ['a toy', 'a book', 'lunch', 'a game', 'snacks'][Math.floor(Math.random() * 5)];
          return {
            question: `Omar had $${had}. He spent $${spent} on ${items}. How much money does he have left?`,
            answer: had - spent,
          };
        },
        () => {
          const moneyMax = gradeLevel <= 2 ? 20 : gradeLevel <= 4 ? 40 : 80;
          const saved = Math.floor(Math.random() * moneyMax) + Math.floor(moneyMax * 0.3);
          const earned = Math.floor(Math.random() * (moneyMax * 0.6)) + Math.floor(moneyMax * 0.2);
          return {
            question: `Mia saved $${saved}. She earned $${earned} more by doing chores. How much money does Mia have now?`,
            answer: saved + earned,
          };
        },
        // Time and measurement
        () => {
          const pageMax = gradeLevel <= 2 ? 30 : gradeLevel <= 4 ? 60 : 120;
          const started = Math.floor(Math.random() * pageMax) + Math.floor(pageMax * 0.4);
          const read = Math.floor(Math.random() * (started - Math.floor(started * 0.2))) + Math.floor(started * 0.2);
          return {
            question: `A book has ${started} pages. Chen read ${read} pages. How many pages are left to read?`,
            answer: started - read,
          };
        },
        () => {
          const maxHours = gradeLevel <= 2 ? 3 : gradeLevel <= 4 ? 5 : 8;
          const hours = Math.floor(Math.random() * maxHours) + 2;
          const perMax = gradeLevel <= 2 ? 5 : gradeLevel <= 4 ? 8 : 12;
          const per = Math.floor(Math.random() * perMax) + 2;
          return {
            question: `A factory makes ${per} toys per hour. How many toys are made in ${hours} hours?`,
            answer: hours * per,
          };
        },
      ];
      const problem = wordProblems[Math.floor(Math.random() * wordProblems.length)]();
      return {
        question: problem.question,
        answer: problem.answer,
        type,
      };
    }
    case 'graphs': {
      // Lower grades: simpler charts with fewer items and smaller numbers
      const useSimpleChart = gradeLevel <= 2;
      const chartTypeRandom = useSimpleChart ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3); // No pie charts for grades 1-2
      const chartTypes: ('bar' | 'line' | 'pie')[] = ['bar', 'line', 'pie'];
      const selectedChartType = chartTypes[chartTypeRandom];

      let labels: string[];
      let values: number[];

      // Grade-based value ranges
      const graphMax = gradeLevel === 1 ? 10 : gradeLevel === 2 ? 15 : gradeLevel === 3 ? 20 : gradeLevel === 4 ? 30 : 40;
      const graphMin = Math.max(3, Math.floor(graphMax * 0.2));

      // More varied label sets with grade-appropriate complexity
      const barLabelSets = useSimpleChart
        ? [
            ['Apples', 'Oranges', 'Bananas'],
            ['Dogs', 'Cats', 'Birds'],
            ['Red', 'Blue', 'Green'],
          ]
        : [
            ['Apples', 'Oranges', 'Bananas', 'Grapes', 'Peaches'],
            ['Dogs', 'Cats', 'Birds', 'Fish', 'Rabbits'],
            ['Soccer', 'Baseball', 'Basketball', 'Tennis', 'Swimming'],
            ['Math', 'Science', 'English', 'Art', 'Music'],
            ['Red', 'Blue', 'Green', 'Yellow', 'Purple'],
          ];

      const lineLabelSets = useSimpleChart
        ? [
            ['Mon', 'Tue', 'Wed'],
            ['Day 1', 'Day 2', 'Day 3'],
          ]
        : [
            ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
          ];

      const pieLabelSets = [
        ['Red', 'Blue', 'Green', 'Yellow'],
        ['Pizza', 'Burgers', 'Tacos', 'Pasta'],
        ['Spring', 'Summer', 'Fall', 'Winter'],
        ['North', 'South', 'East', 'West'],
      ];

      if (selectedChartType === 'bar') {
        labels = barLabelSets[Math.floor(Math.random() * barLabelSets.length)];
        values = labels.map(() => Math.floor(Math.random() * (graphMax - graphMin)) + graphMin);
      } else if (selectedChartType === 'line') {
        labels = lineLabelSets[Math.floor(Math.random() * lineLabelSets.length)];
        values = labels.map(() => Math.floor(Math.random() * (graphMax - graphMin)) + graphMin);
      } else {
        labels = pieLabelSets[Math.floor(Math.random() * pieLabelSets.length)];
        values = labels.map(() => Math.floor(Math.random() * (graphMax - graphMin)) + graphMin);
      }

      // Limit question types for lower grades (no average for grades 1-3)
      const maxQuestionTypes = gradeLevel <= 3 ? 6 : 7;
      const questionType = Math.floor(Math.random() * maxQuestionTypes);

      if (questionType === 0) {
        // Find maximum
        const maxValue = Math.max(...values);
        const variations = [
          'What is the highest value shown?',
          'Which category has the most?',
          'What is the maximum value?',
          'Find the largest number on the chart.',
        ];
        return {
          question: variations[Math.floor(Math.random() * variations.length)],
          answer: maxValue,
          type,
          chartData: { labels, values, chartType: selectedChartType },
        };
      } else if (questionType === 1) {
        // Find minimum
        const minValue = Math.min(...values);
        const variations = [
          'What is the lowest value shown?',
          'Which category has the least?',
          'What is the minimum value?',
          'Find the smallest number on the chart.',
        ];
        return {
          question: variations[Math.floor(Math.random() * variations.length)],
          answer: minValue,
          type,
          chartData: { labels, values, chartType: selectedChartType },
        };
      } else if (questionType === 2) {
        // Find total
        const total = values.reduce((a, b) => a + b, 0);
        const variations = [
          'What is the total of all values?',
          'Add all the values together. What do you get?',
          'What is the sum of all categories?',
          'If you combine all values, what is the total?',
        ];
        return {
          question: variations[Math.floor(Math.random() * variations.length)],
          answer: total,
          type,
          chartData: { labels, values, chartType: selectedChartType },
        };
      } else if (questionType === 3) {
        // Find difference
        const idx1 = Math.floor(Math.random() * labels.length);
        let idx2 = Math.floor(Math.random() * labels.length);
        while (idx2 === idx1) idx2 = Math.floor(Math.random() * labels.length);
        const diff = Math.abs(values[idx1] - values[idx2]);
        const variations = [
          `What is the difference between ${labels[idx1]} and ${labels[idx2]}?`,
          `How much more is ${labels[idx1]} than ${labels[idx2]}? (or vice versa)`,
          `Subtract ${labels[idx2]} from ${labels[idx1]}. What is the absolute difference?`,
        ];
        return {
          question: variations[Math.floor(Math.random() * variations.length)],
          answer: diff,
          type,
          chartData: { labels, values, chartType: selectedChartType },
        };
      } else if (questionType === 4) {
        // Find specific value
        const idx = Math.floor(Math.random() * labels.length);
        const variations = [
          `What is the value for ${labels[idx]}?`,
          `How many ${labels[idx]} are shown?`,
          `Find the number for ${labels[idx]}.`,
          `What number does ${labels[idx]} have?`,
        ];
        return {
          question: variations[Math.floor(Math.random() * variations.length)],
          answer: values[idx],
          type,
          chartData: { labels, values, chartType: selectedChartType },
        };
      } else if (questionType === 5) {
        // Find average
        const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
        return {
          question: 'What is the average of all values? (Round to nearest whole number)',
          answer: avg,
          type,
          chartData: { labels, values, chartType: selectedChartType },
        };
      } else {
        // Find sum of two categories
        const idx1 = Math.floor(Math.random() * labels.length);
        let idx2 = Math.floor(Math.random() * labels.length);
        while (idx2 === idx1) idx2 = Math.floor(Math.random() * labels.length);
        const sum = values[idx1] + values[idx2];
        return {
          question: `What is ${labels[idx1]} + ${labels[idx2]}?`,
          answer: sum,
          type,
          chartData: { labels, values, chartType: selectedChartType },
        };
      }
    }
    case 'patterns': {
      // Number patterns for grades 1-2
      const patternType = Math.floor(Math.random() * 3);

      if (patternType === 0) {
        // Addition pattern (e.g., 2, 4, 6, ?, 10)
        const start = Math.floor(Math.random() * 5) + 1;
        const step = Math.floor(Math.random() * 3) + 2;
        const missing = 3; // Always 4th position
        const answer = start + step * missing;
        return {
          question: `Complete the pattern: ${start}, ${start + step}, ${start + step * 2}, ?, ${start + step * 4}`,
          answer,
          type,
        };
      } else if (patternType === 1) {
        // Simple counting pattern
        const start = Math.floor(Math.random() * 10) + 1;
        const step = gradeLevel === 1 ? 1 : Math.floor(Math.random() * 3) + 1;
        const position = 5;
        const answer = start + step * (position - 1);
        return {
          question: `What comes next? ${start}, ${start + step}, ${start + step * 2}, ${start + step * 3}, ?`,
          answer,
          type,
        };
      } else {
        // Skip counting
        const skip = [2, 5, 10][Math.floor(Math.random() * 3)];
        const start = skip;
        const answer = start + skip * 3;
        return {
          question: `Count by ${skip}s: ${start}, ${start + skip}, ${start + skip * 2}, ?`,
          answer,
          type,
        };
      }
    }
    case 'decimals': {
      // Decimals for grades 4-6
      const decimalType = Math.floor(Math.random() * 4);

      if (decimalType === 0) {
        // Addition with decimals
        const a = (Math.floor(Math.random() * 50) + 1) + (Math.floor(Math.random() * 9) + 1) / 10;
        const b = (Math.floor(Math.random() * 50) + 1) + (Math.floor(Math.random() * 9) + 1) / 10;
        const sum = Math.round((a + b) * 10) / 10;
        return {
          question: `${a.toFixed(1)} + ${b.toFixed(1)} = ?`,
          answer: sum,
          type,
        };
      } else if (decimalType === 1) {
        // Subtraction with decimals
        const a = (Math.floor(Math.random() * 50) + 10) + (Math.floor(Math.random() * 9) + 1) / 10;
        const b = (Math.floor(Math.random() * (Math.floor(a) - 1)) + 1) + (Math.floor(Math.random() * 9) + 1) / 10;
        const diff = Math.round((a - b) * 10) / 10;
        return {
          question: `${a.toFixed(1)} - ${b.toFixed(1)} = ?`,
          answer: diff,
          type,
        };
      } else if (decimalType === 2) {
        // Multiplication with decimals
        const a = (Math.floor(Math.random() * 10) + 1) + (Math.floor(Math.random() * 9) + 1) / 10;
        const b = Math.floor(Math.random() * 10) + 1;
        const product = Math.round((a * b) * 10) / 10;
        return {
          question: `${a.toFixed(1)} × ${b} = ?`,
          answer: product,
          type,
        };
      } else {
        // Decimal to fraction or place value
        const whole = Math.floor(Math.random() * 10);
        const decimal = Math.floor(Math.random() * 9) + 1;
        const answer = whole * 10 + decimal;
        return {
          question: `${whole}.${decimal} = ? tenths. How many tenths in total?`,
          answer,
          type,
        };
      }
    }
    case 'percentages': {
      // Percentages for grades 5-6
      const percentType = Math.floor(Math.random() * 4);

      if (percentType === 0) {
        // Find percentage of a number
        const percent = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
        const number = Math.floor(Math.random() * 100) + 20;
        const answer = Math.round((percent / 100) * number);
        return {
          question: `What is ${percent}% of ${number}?`,
          answer,
          type,
        };
      } else if (percentType === 1) {
        // Convert fraction to percentage
        const fractions = [
          { frac: '1/2', percent: 50 },
          { frac: '1/4', percent: 25 },
          { frac: '3/4', percent: 75 },
          { frac: '1/5', percent: 20 },
          { frac: '2/5', percent: 40 },
          { frac: '1/10', percent: 10 },
        ];
        const chosen = fractions[Math.floor(Math.random() * fractions.length)];
        return {
          question: `Convert ${chosen.frac} to a percentage`,
          answer: chosen.percent,
          type,
        };
      } else if (percentType === 2) {
        // What percent is X of Y?
        const total = [20, 25, 50, 100][Math.floor(Math.random() * 4)];
        const part = Math.floor(total / [2, 4, 5][Math.floor(Math.random() * 3)]);
        const answer = Math.round((part / total) * 100);
        return {
          question: `${part} is what percent of ${total}?`,
          answer,
          type,
        };
      } else {
        // Increase/decrease by percentage
        const number = Math.floor(Math.random() * 50) + 20;
        const percent = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
        const answer = number + Math.round((percent / 100) * number);
        return {
          question: `Increase ${number} by ${percent}%. What is the result?`,
          answer,
          type,
        };
      }
    }
    case 'ratios': {
      // Ratios for grade 6
      const ratioType = Math.floor(Math.random() * 3);

      if (ratioType === 0) {
        // Simple ratio
        const a = Math.floor(Math.random() * 8) + 2;
        const b = Math.floor(Math.random() * 8) + 2;
        const multiplier = Math.floor(Math.random() * 5) + 2;
        const answer = a * multiplier;
        return {
          question: `If the ratio is ${a}:${b}, and the second number is ${b * multiplier}, what is the first number?`,
          answer,
          type,
        };
      } else if (ratioType === 1) {
        // Part to whole ratio
        const total = [12, 15, 18, 20, 24, 30][Math.floor(Math.random() * 6)];
        const ratio = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
        const part = Math.floor(total / ratio);
        return {
          question: `There are ${total} items. If the ratio is 1:${ratio - 1}, how many are in the first group?`,
          answer: part,
          type,
        };
      } else {
        // Recipe ratio
        const cups = [2, 3, 4][Math.floor(Math.random() * 3)];
        const servings = cups * 2;
        const newServings = servings * 2;
        const answer = cups * 2;
        return {
          question: `A recipe uses ${cups} cups for ${servings} servings. How many cups for ${newServings} servings?`,
          answer,
          type,
        };
      }
    }
    case 'mixed': {
      // Get available types for this grade (excluding mixed itself)
      const gradeNum = parseInt(grade);
      const availableTypes = allProblemTypes
        .filter(t => t.grades.includes(gradeNum) && t.id !== 'mixed')
        .map(t => t.id);
      const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
      return generateProblem(randomType, grade);
    }
    default:
      return generateProblem('addition', grade);
  }
};
