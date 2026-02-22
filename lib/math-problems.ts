export type ProblemType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'fractions' | 'word' | 'graphs' | 'mixed' | 'decimals' | 'percentages' | 'patterns' | 'ratios' | 'time' | 'measurement' | 'interpretData' | 'random' | 'perimeter' | 'geometry';
export type Grade = '1st' | '2nd' | '3rd' | '4th' | '5th' | '6th';

export interface ChartData {
  labels: string[];
  values: number[];
  chartType: 'bar' | 'line' | 'pie' | 'clock' | 'ruler';
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
  { id: 'addition', label: 'Addition', grades: [1, 2] },
  { id: 'subtraction', label: 'Subtraction', grades: [1, 2] },
  { id: 'patterns', label: 'Patterns', grades: [1, 2] },
  { id: 'multiplication', label: 'Multiplication', grades: [2, 3] },
  { id: 'division', label: 'Division', grades: [2, 3] },
  { id: 'word', label: 'Word Problems', grades: [2, 3] },
  { id: 'fractions', label: 'Fractions', grades: [3] },
  { id: 'time', label: 'Time', grades: [2, 3] },
  { id: 'measurement', label: 'Measurement', grades: [2, 3] },
  { id: 'interpretData', label: 'Interpret Data', grades: [2, 3] },
  { id: 'perimeter', label: 'Perimeter', grades: [3] },
  { id: 'geometry', label: 'Geometry', grades: [3] },
  { id: 'random', label: 'Random', grades: [1, 2, 3] },
  { id: 'mixed', label: 'Mixed', grades: [3] },
];

export const grades: Grade[] = ['1st', '2nd', '3rd'];

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
    case 'time': {
      const problemType = Math.floor(Math.random() * (gradeLevel <= 2 ? 13 : 15));

      if (problemType === 0) {
        // Analog clock: read the hour (exact hour)
        const hour = Math.floor(Math.random() * 12) + 1;
        return {
          question: `Look at the clock. What hour is it showing? (Enter the hour number)`,
          answer: hour,
          type,
          chartData: { labels: ['hour', 'minutes'], values: [hour, 0], chartType: 'clock' },
        };
      } else if (problemType === 1) {
        // Analog clock: read half past
        const hour = Math.floor(Math.random() * 12) + 1;
        return {
          question: `Look at the clock. How many minutes past ${hour} does it show?`,
          answer: 30,
          type,
          chartData: { labels: ['hour', 'minutes'], values: [hour, 30], chartType: 'clock' },
        };
      } else if (problemType === 2) {
        // Analog clock: read quarter past
        const hour = Math.floor(Math.random() * 12) + 1;
        return {
          question: `Look at the clock. How many minutes past the hour does it show?`,
          answer: 15,
          type,
          chartData: { labels: ['hour', 'minutes'], values: [hour, 15], chartType: 'clock' },
        };
      } else if (problemType === 3) {
        // Analog clock: read quarter to
        const hour = Math.floor(Math.random() * 12) + 1;
        return {
          question: `Look at the clock. How many minutes past ${hour} does it show?`,
          answer: 45,
          type,
          chartData: { labels: ['hour', 'minutes'], values: [hour, 45], chartType: 'clock' },
        };
      } else if (problemType === 4) {
        // Analog clock: read 5-minute intervals
        const hour = Math.floor(Math.random() * 12) + 1;
        const minutes = (Math.floor(Math.random() * 12)) * 5;
        return {
          question: `Look at the clock. How many minutes past the hour does it show?`,
          answer: minutes,
          type,
          chartData: { labels: ['hour', 'minutes'], values: [hour, minutes], chartType: 'clock' },
        };
      } else if (problemType === 5) {
        // Elapsed time in hours
        const start = Math.floor(Math.random() * 10) + 1;
        const elapsed = Math.floor(Math.random() * 4) + 1;
        const end = start + elapsed;
        return {
          question: `If you start at ${start}:00 and finish at ${end}:00, how many hours did it take?`,
          answer: elapsed,
          type,
        };
      } else if (problemType === 6) {
        // How many minutes in hours
        const hours = Math.floor(Math.random() * 3) + 1;
        return {
          question: `How many minutes are in ${hours} hour${hours > 1 ? 's' : ''}?`,
          answer: hours * 60,
          type,
        };
      } else if (problemType === 7) {
        // Days in a week
        const weeks = Math.floor(Math.random() * 3) + 1;
        return {
          question: `How many days are in ${weeks} week${weeks > 1 ? 's' : ''}?`,
          answer: weeks * 7,
          type,
        };
      } else if (problemType === 8) {
        // Elapsed time in half hours
        const startHour = Math.floor(Math.random() * 10) + 1;
        const halfHours = Math.floor(Math.random() * 4) + 1;
        const totalMinutes = halfHours * 30;
        return {
          question: `You start reading at ${startHour}:00. You read for ${totalMinutes} minutes. How many minutes did you read?`,
          answer: totalMinutes,
          type,
        };
      } else if (problemType === 9) {
        // AM/PM understanding
        const activities = [
          { activity: 'breakfast', hour: 7, period: 'morning' },
          { activity: 'lunch', hour: 12, period: 'afternoon' },
          { activity: 'dinner', hour: 6, period: 'evening' },
          { activity: 'school starts', hour: 8, period: 'morning' },
          { activity: 'bedtime', hour: 9, period: 'night' },
        ];
        const picked = activities[Math.floor(Math.random() * activities.length)];
        return {
          question: `${picked.activity.charAt(0).toUpperCase() + picked.activity.slice(1)} is usually in the ${picked.period}. What hour does it usually happen? (1-12)`,
          answer: picked.hour,
          type,
        };
      } else if (problemType === 10) {
        // Analog clock: what hour will it be in N hours?
        const hour = Math.floor(Math.random() * 12) + 1;
        const add = Math.floor(Math.random() * 4) + 1;
        const resultHour = ((hour + add - 1) % 12) + 1;
        return {
          question: `The clock shows ${hour}:00. What hour will it be in ${add} hour${add > 1 ? 's' : ''}? (Enter 1-12)`,
          answer: resultHour,
          type,
          chartData: { labels: ['hour', 'minutes'], values: [hour, 0], chartType: 'clock' },
        };
      } else if (problemType === 11) {
        // Analog clock: elapsed minutes between two shown times
        const hour = Math.floor(Math.random() * 12) + 1;
        const startMin = 0;
        const endMin = [15, 30, 45][Math.floor(Math.random() * 3)];
        return {
          question: `The clock shows ${hour}:${endMin < 10 ? '0' : ''}${endMin}. How many minutes have passed since ${hour}:00?`,
          answer: endMin,
          type,
          chartData: { labels: ['hour', 'minutes'], values: [hour, endMin], chartType: 'clock' },
        };
      } else if (problemType === 12) {
        // Analog clock: identify hour hand position
        const hour = Math.floor(Math.random() * 12) + 1;
        const minutes = [0, 30][Math.floor(Math.random() * 2)];
        return {
          question: `Look at the clock. What number is the short (hour) hand pointing to or closest to?`,
          answer: hour,
          type,
          chartData: { labels: ['hour', 'minutes'], values: [hour, minutes], chartType: 'clock' },
        };
      } else if (problemType === 13) {
        // Grade 3: 5-minute intervals on analog clock
        const hour = Math.floor(Math.random() * 12) + 1;
        const fiveMin = (Math.floor(Math.random() * 11) + 1) * 5;
        return {
          question: `Look at the clock. What time does it show? Enter just the minutes.`,
          answer: fiveMin,
          type,
          chartData: { labels: ['hour', 'minutes'], values: [hour, fiveMin], chartType: 'clock' },
        };
      } else {
        // Grade 3: elapsed time in minutes
        const startMin = Math.floor(Math.random() * 4) * 15;
        const elapsed = (Math.floor(Math.random() * 4) + 1) * 15;
        const hour = Math.floor(Math.random() * 10) + 1;
        return {
          question: `You start a task at ${hour}:${startMin === 0 ? '00' : startMin}. It takes ${elapsed} minutes. How many minutes did the task take?`,
          answer: elapsed,
          type,
        };
      }
    }
    case 'measurement': {
      const problemType = Math.floor(Math.random() * (gradeLevel <= 2 ? 12 : 14));

      if (problemType === 0) {
        // Comparing lengths
        const a = Math.floor(Math.random() * 20) + 3;
        const b = Math.floor(Math.random() * 20) + 3;
        const diff = Math.abs(a - b);
        const longer = Math.max(a, b);
        const shorter = Math.min(a, b);
        return {
          question: `Look at the ruler. A pencil is ${longer} cm and a crayon is ${shorter} cm. How many cm longer is the pencil?`,
          answer: diff,
          type,
          chartData: { labels: ['Pencil', 'Crayon'], values: [longer, shorter], chartType: 'ruler' },
        };
      } else if (problemType === 1) {
        // Adding lengths
        const a = Math.floor(Math.random() * 15) + 2;
        const b = Math.floor(Math.random() * 15) + 2;
        return {
          question: `Look at the ruler. A ribbon is ${a} cm and another is ${b} cm. How long are they together?`,
          answer: a + b,
          type,
          chartData: { labels: ['Ribbon 1', 'Ribbon 2'], values: [a, b], chartType: 'ruler' },
        };
      } else if (problemType === 2) {
        // Feet to inches
        const feet = Math.floor(Math.random() * 3) + 1;
        return {
          question: `How many inches are in ${feet} foot${feet > 1 ? '' : ''}? (1 foot = 12 inches)`,
          answer: feet * 12,
          type,
        };
      } else if (problemType === 3) {
        // Measuring with a ruler
        const objects = ['book', 'eraser', 'marker', 'paper clip', 'shoe'];
        const obj = objects[Math.floor(Math.random() * objects.length)];
        const length = Math.floor(Math.random() * 10) + 3;
        const start = Math.floor(Math.random() * 5) + 1;
        const end = start + length;
        return {
          question: `Look at the ruler. The ${obj} starts at ${start} cm and ends at ${end} cm. How long is it?`,
          answer: length,
          type,
          chartData: { labels: [obj.charAt(0).toUpperCase() + obj.slice(1)], values: [start, end], chartType: 'ruler' },
        };
      } else if (problemType === 4) {
        // Weight comparison
        const a = Math.floor(Math.random() * 20) + 5;
        const b = Math.floor(Math.random() * 20) + 5;
        const heavier = Math.max(a, b);
        const lighter = Math.min(a, b);
        return {
          question: `Look at the chart. Apples weigh ${heavier} lbs and oranges weigh ${lighter} lbs. How much heavier are the apples?`,
          answer: heavier - lighter,
          type,
          chartData: { labels: ['Apples', 'Oranges'], values: [heavier, lighter], chartType: 'bar' },
        };
      } else if (problemType === 5) {
        // Liquid measurement
        const cups = Math.floor(Math.random() * 6) + 2;
        const more = Math.floor(Math.random() * 4) + 1;
        return {
          question: `Look at the chart. A jug has ${cups} cups of water. You add ${more} more cups. How many cups total?`,
          answer: cups + more,
          type,
          chartData: { labels: ['In Jug', 'Adding'], values: [cups, more], chartType: 'bar' },
        };
      } else if (problemType === 6) {
        // Perimeter of a rectangle
        const length = Math.floor(Math.random() * 8) + 2;
        const width = Math.floor(Math.random() * 6) + 1;
        return {
          question: `Look at the ruler. A rectangle is ${length} cm long and ${width} cm wide. What is its perimeter? (Add all sides)`,
          answer: 2 * (length + width),
          type,
          chartData: { labels: ['Length', 'Width'], values: [length, width], chartType: 'ruler' },
        };
      } else if (problemType === 7) {
        // Estimating length
        const objects = [
          { name: 'a banana', approxCm: 20 },
          { name: 'a pencil', approxCm: 19 },
          { name: 'a book', approxCm: 25 },
          { name: 'a hand span', approxCm: 18 },
        ];
        const obj = objects[Math.floor(Math.random() * objects.length)];
        const itemCount = Math.floor(Math.random() * 3) + 2;
        return {
          question: `Look at the ruler. ${obj.name.charAt(0).toUpperCase() + obj.name.slice(1)} is about ${obj.approxCm} cm. How many cm would ${itemCount} of them be end to end?`,
          answer: obj.approxCm * itemCount,
          type,
          chartData: { labels: [obj.name.charAt(0).toUpperCase() + obj.name.slice(1)], values: [obj.approxCm], chartType: 'ruler' },
        };
      } else if (problemType === 8) {
        // Bar chart: heights of plants — find the tallest
        const plants = ['Sunflower', 'Tulip', 'Daisy', 'Rose'];
        const heights = plants.map(() => Math.floor(Math.random() * 15) + 5);
        const maxHeight = Math.max(...heights);
        return {
          question: `Look at the chart showing plant heights in cm. What is the height of the tallest plant?`,
          answer: maxHeight,
          type,
          chartData: { labels: plants, values: heights, chartType: 'bar' },
        };
      } else if (problemType === 9) {
        // Bar chart: heights of objects — find the difference
        const items = ['Chair', 'Table', 'Shelf', 'Lamp'];
        const heights = items.map(() => Math.floor(Math.random() * 20) + 10);
        const idx1 = Math.floor(Math.random() * items.length);
        let idx2 = Math.floor(Math.random() * items.length);
        while (idx2 === idx1) idx2 = Math.floor(Math.random() * items.length);
        const diff = Math.abs(heights[idx1] - heights[idx2]);
        return {
          question: `Look at the chart showing heights in inches. How much taller is ${items[idx1]} than ${items[idx2]}? (Use absolute difference)`,
          answer: diff,
          type,
          chartData: { labels: items, values: heights, chartType: 'bar' },
        };
      } else if (problemType === 10) {
        // Bar chart: weights — find total
        const fruits = ['Apples', 'Oranges', 'Bananas'];
        const weights = fruits.map(() => Math.floor(Math.random() * 8) + 2);
        const total = weights.reduce((a, b) => a + b, 0);
        return {
          question: `Look at the chart showing weights in pounds. What is the total weight of all fruits?`,
          answer: total,
          type,
          chartData: { labels: fruits, values: weights, chartType: 'bar' },
        };
      } else if (problemType === 11) {
        // Bar chart: lengths of rivers/paths — find shortest
        const paths = ['Trail A', 'Trail B', 'Trail C', 'Trail D'];
        const lengths = paths.map(() => Math.floor(Math.random() * 12) + 3);
        const minLen = Math.min(...lengths);
        return {
          question: `Look at the chart showing trail lengths in km. What is the length of the shortest trail?`,
          answer: minLen,
          type,
          chartData: { labels: paths, values: lengths, chartType: 'bar' },
        };
      } else if (problemType === 12) {
        // Centimeters to meters (grade 3)
        const meters = Math.floor(Math.random() * 5) + 1;
        return {
          question: `How many centimeters are in ${meters} meter${meters > 1 ? 's' : ''}? (1 meter = 100 cm)`,
          answer: meters * 100,
          type,
        };
      } else {
        // Multi-step measurement (grade 3)
        const pieces = Math.floor(Math.random() * 4) + 2;
        const each = Math.floor(Math.random() * 8) + 3;
        const cut = Math.floor(Math.random() * (pieces * each - 5)) + 2;
        const total = pieces * each;
        return {
          question: `You have ${pieces} pieces of string, each ${each} cm long. You tie them together (total ${total} cm) and cut off ${cut} cm. How long is the remaining string?`,
          answer: total - cut,
          type,
        };
      }
    }
    case 'interpretData': {
      const problemType = Math.floor(Math.random() * (gradeLevel <= 2 ? 10 : 12));

      if (problemType === 0) {
        // Bar chart: pet survey — find the most popular
        const pets = ['Dogs', 'Cats', 'Birds', 'Fish'];
        const counts = pets.map(() => Math.floor(Math.random() * 10) + 2);
        const maxVal = Math.max(...counts);
        return {
          question: `Look at the bar chart showing a class pet survey. How many students chose the most popular pet?`,
          answer: maxVal,
          type,
          chartData: { labels: pets, values: counts, chartType: 'bar' },
        };
      } else if (problemType === 1) {
        // Bar chart: ice cream flavors — find the total
        const flavors = ['Vanilla', 'Chocolate', 'Strawberry'];
        const counts = flavors.map(() => Math.floor(Math.random() * 8) + 2);
        const total = counts.reduce((a, b) => a + b, 0);
        return {
          question: `Look at the bar chart of favorite ice cream flavors. How many students were surveyed in total?`,
          answer: total,
          type,
          chartData: { labels: flavors, values: counts, chartType: 'bar' },
        };
      } else if (problemType === 2) {
        // Bar chart: sports — how many more
        const sports = ['Soccer', 'Basketball', 'Baseball'];
        const counts = sports.map(() => Math.floor(Math.random() * 12) + 3);
        const maxIdx = counts.indexOf(Math.max(...counts));
        const minIdx = counts.indexOf(Math.min(...counts));
        const diff = counts[maxIdx] - counts[minIdx];
        return {
          question: `Look at the bar chart of favorite sports. How many more students chose ${sports[maxIdx]} than ${sports[minIdx]}?`,
          answer: diff,
          type,
          chartData: { labels: sports, values: counts, chartType: 'bar' },
        };
      } else if (problemType === 3) {
        // Bar chart: fruits sold — combine two categories
        const fruits = ['Apples', 'Bananas', 'Grapes', 'Oranges'];
        const counts = fruits.map(() => Math.floor(Math.random() * 10) + 2);
        const idx1 = Math.floor(Math.random() * fruits.length);
        let idx2 = Math.floor(Math.random() * fruits.length);
        while (idx2 === idx1) idx2 = Math.floor(Math.random() * fruits.length);
        const sum = counts[idx1] + counts[idx2];
        return {
          question: `Look at the bar chart of fruit sold. How many ${fruits[idx1]} and ${fruits[idx2]} were sold combined?`,
          answer: sum,
          type,
          chartData: { labels: fruits, values: counts, chartType: 'bar' },
        };
      } else if (problemType === 4) {
        // Bar chart: favorite colors — how many fewer
        const colors = ['Red', 'Blue', 'Green', 'Yellow'];
        const counts = colors.map(() => Math.floor(Math.random() * 12) + 2);
        const idx1 = Math.floor(Math.random() * colors.length);
        let idx2 = Math.floor(Math.random() * colors.length);
        while (idx2 === idx1) idx2 = Math.floor(Math.random() * colors.length);
        const bigger = Math.max(counts[idx1], counts[idx2]);
        const smaller = Math.min(counts[idx1], counts[idx2]);
        const bigLabel = counts[idx1] >= counts[idx2] ? colors[idx1] : colors[idx2];
        const smallLabel = counts[idx1] < counts[idx2] ? colors[idx1] : colors[idx2];
        return {
          question: `Look at the bar chart of favorite colors. How many fewer students chose ${smallLabel} than ${bigLabel}?`,
          answer: bigger - smaller,
          type,
          chartData: { labels: colors, values: counts, chartType: 'bar' },
        };
      } else if (problemType === 5) {
        // Pie chart: snacks — find a specific value
        const snacks = ['Chips', 'Cookies', 'Fruit', 'Crackers'];
        const counts = snacks.map(() => Math.floor(Math.random() * 8) + 3);
        const idx = Math.floor(Math.random() * snacks.length);
        return {
          question: `Look at the pie chart of favorite snacks. How many students chose ${snacks[idx]}?`,
          answer: counts[idx],
          type,
          chartData: { labels: snacks, values: counts, chartType: 'pie' },
        };
      } else if (problemType === 6) {
        // Pie chart: yes/no survey — total
        const labels = ['Yes', 'No'];
        const yes = Math.floor(Math.random() * 15) + 5;
        const no = Math.floor(Math.random() * 15) + 3;
        const total = yes + no;
        const topics = ['like pizza', 'have a pet', 'walk to school', 'like math'];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        return {
          question: `Look at the pie chart for the survey: "Do you ${topic}?" How many students were surveyed in total?`,
          answer: total,
          type,
          chartData: { labels, values: [yes, no], chartType: 'pie' },
        };
      } else if (problemType === 7) {
        // Line chart: daily temperature — find highest
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const temps = days.map(() => Math.floor(Math.random() * 15) + 10);
        const maxTemp = Math.max(...temps);
        return {
          question: `Look at the line chart showing daily temperatures. What was the highest temperature this week?`,
          answer: maxTemp,
          type,
          chartData: { labels: days, values: temps, chartType: 'line' },
        };
      } else if (problemType === 8) {
        // Line chart: books read — find the difference between two days
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const books = days.map(() => Math.floor(Math.random() * 8) + 1);
        const idx1 = Math.floor(Math.random() * days.length);
        let idx2 = Math.floor(Math.random() * days.length);
        while (idx2 === idx1) idx2 = Math.floor(Math.random() * days.length);
        const diff = Math.abs(books[idx1] - books[idx2]);
        return {
          question: `Look at the line chart showing books read each day. How many more books were read on ${days[idx1]} than ${days[idx2]}? (Use absolute difference)`,
          answer: diff,
          type,
          chartData: { labels: days, values: books, chartType: 'line' },
        };
      } else if (problemType === 9) {
        // Bar chart: find the least popular
        const animals = ['Cats', 'Dogs', 'Rabbits', 'Hamsters'];
        const votes = animals.map(() => Math.floor(Math.random() * 12) + 2);
        const minVal = Math.min(...votes);
        return {
          question: `Look at the bar chart of favorite animals. How many votes did the least popular animal get?`,
          answer: minVal,
          type,
          chartData: { labels: animals, values: votes, chartType: 'bar' },
        };
      } else if (problemType === 10) {
        // Line chart: steps walked — total (grade 3)
        const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
        const counts = days.map(() => Math.floor(Math.random() * 6) + 2);
        const total = counts.reduce((a, b) => a + b, 0);
        return {
          question: `Look at the line chart showing laps walked each day. How many laps were walked in total?`,
          answer: total,
          type,
          chartData: { labels: days, values: counts, chartType: 'line' },
        };
      } else {
        // Pie chart: t-shirt sizes — most popular (grade 3)
        const sizes = ['Small', 'Medium', 'Large'];
        const counts = sizes.map(() => Math.floor(Math.random() * 8) + 2);
        const maxIdx = Math.floor(Math.random() * 3);
        counts[maxIdx] = Math.max(...counts) + Math.floor(Math.random() * 3) + 1;
        return {
          question: `Look at the pie chart of t-shirt sizes ordered. How many of the most popular size were ordered?`,
          answer: counts[maxIdx],
          type,
          chartData: { labels: sizes, values: counts, chartType: 'pie' },
        };
      }
    }
    case 'perimeter': {
      const problemType = Math.floor(Math.random() * 8);

      if (problemType === 0) {
        // Perimeter of a rectangle
        const length = Math.floor(Math.random() * 10) + 3;
        const width = Math.floor(Math.random() * 8) + 2;
        return {
          question: `A rectangle is ${length} cm long and ${width} cm wide. What is its perimeter?`,
          answer: 2 * (length + width),
          type,
          chartData: { labels: ['Length', 'Width'], values: [length, width], chartType: 'ruler' },
        };
      } else if (problemType === 1) {
        // Perimeter of a square
        const side = Math.floor(Math.random() * 10) + 2;
        return {
          question: `A square has sides of ${side} cm. What is its perimeter?`,
          answer: 4 * side,
          type,
        };
      } else if (problemType === 2) {
        // Perimeter of a triangle
        const a = Math.floor(Math.random() * 8) + 3;
        const b = Math.floor(Math.random() * 8) + 3;
        const c = Math.floor(Math.random() * 8) + 3;
        return {
          question: `A triangle has sides of ${a} cm, ${b} cm, and ${c} cm. What is its perimeter?`,
          answer: a + b + c,
          type,
        };
      } else if (problemType === 3) {
        // Find missing side of rectangle given perimeter
        const length = Math.floor(Math.random() * 8) + 3;
        const width = Math.floor(Math.random() * 6) + 2;
        const perimeter = 2 * (length + width);
        return {
          question: `A rectangle has a perimeter of ${perimeter} cm. One side is ${length} cm. How long is the other side?`,
          answer: width,
          type,
        };
      } else if (problemType === 4) {
        // Perimeter word problem — garden fence
        const length = Math.floor(Math.random() * 12) + 5;
        const width = Math.floor(Math.random() * 8) + 3;
        return {
          question: `A garden is ${length} m long and ${width} m wide. How many meters of fence are needed to go around it?`,
          answer: 2 * (length + width),
          type,
        };
      } else if (problemType === 5) {
        // Perimeter word problem — picture frame
        const side = Math.floor(Math.random() * 8) + 4;
        return {
          question: `A square picture frame has sides of ${side} inches. How many inches of border are needed to go around it?`,
          answer: 4 * side,
          type,
        };
      } else if (problemType === 6) {
        // Perimeter of an equilateral triangle
        const side = Math.floor(Math.random() * 8) + 3;
        return {
          question: `An equilateral triangle has all sides equal to ${side} cm. What is its perimeter?`,
          answer: 3 * side,
          type,
        };
      } else {
        // Add all sides of irregular shape
        const sides = [
          Math.floor(Math.random() * 5) + 2,
          Math.floor(Math.random() * 5) + 2,
          Math.floor(Math.random() * 5) + 2,
          Math.floor(Math.random() * 5) + 2,
          Math.floor(Math.random() * 5) + 2,
        ];
        const total = sides.reduce((a, b) => a + b, 0);
        return {
          question: `A shape has 5 sides measuring ${sides.join(' cm, ')} cm. What is the perimeter?`,
          answer: total,
          type,
        };
      }
    }
    case 'geometry': {
      const problemType = Math.floor(Math.random() * 10);

      if (problemType === 0) {
        // How many sides does a shape have?
        const shapes = [
          { name: 'triangle', sides: 3 },
          { name: 'square', sides: 4 },
          { name: 'rectangle', sides: 4 },
          { name: 'pentagon', sides: 5 },
          { name: 'hexagon', sides: 6 },
          { name: 'octagon', sides: 8 },
        ];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        return {
          question: `How many sides does a ${shape.name} have?`,
          answer: shape.sides,
          type,
        };
      } else if (problemType === 1) {
        // How many corners/vertices?
        const shapes = [
          { name: 'triangle', corners: 3 },
          { name: 'square', corners: 4 },
          { name: 'rectangle', corners: 4 },
          { name: 'pentagon', corners: 5 },
          { name: 'hexagon', corners: 6 },
          { name: 'octagon', corners: 8 },
        ];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        return {
          question: `How many corners (vertices) does a ${shape.name} have?`,
          answer: shape.corners,
          type,
        };
      } else if (problemType === 2) {
        // Area of rectangle
        const length = Math.floor(Math.random() * 10) + 2;
        const width = Math.floor(Math.random() * 8) + 2;
        return {
          question: `A rectangle is ${length} cm long and ${width} cm wide. What is its area? (length × width)`,
          answer: length * width,
          type,
          chartData: { labels: ['Length', 'Width'], values: [length, width], chartType: 'ruler' },
        };
      } else if (problemType === 3) {
        // Area of square
        const side = Math.floor(Math.random() * 8) + 2;
        return {
          question: `A square has sides of ${side} cm. What is its area? (side × side)`,
          answer: side * side,
          type,
        };
      } else if (problemType === 4) {
        // Right angles in shapes
        const shapes = [
          { name: 'square', angles: 4 },
          { name: 'rectangle', angles: 4 },
          { name: 'right triangle', angles: 1 },
        ];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        return {
          question: `How many right angles (90°) does a ${shape.name} have?`,
          answer: shape.angles,
          type,
        };
      } else if (problemType === 5) {
        // Lines of symmetry
        const shapes = [
          { name: 'square', lines: 4 },
          { name: 'rectangle', lines: 2 },
          { name: 'equilateral triangle', lines: 3 },
          { name: 'circle', lines: 0 },
        ];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        if (shape.name === 'circle') {
          return {
            question: `Does a circle have a finite number of lines of symmetry? Enter 0 for no (it has infinite).`,
            answer: 0,
            type,
          };
        }
        return {
          question: `How many lines of symmetry does a ${shape.name} have?`,
          answer: shape.lines,
          type,
        };
      } else if (problemType === 6) {
        // Find missing side of rectangle given area
        const length = Math.floor(Math.random() * 8) + 2;
        const width = Math.floor(Math.random() * 6) + 2;
        const area = length * width;
        return {
          question: `A rectangle has an area of ${area} sq cm. One side is ${length} cm. How long is the other side?`,
          answer: width,
          type,
        };
      } else if (problemType === 7) {
        // Faces of 3D shapes
        const shapes = [
          { name: 'cube', faces: 6 },
          { name: 'rectangular prism (box)', faces: 6 },
          { name: 'triangular prism', faces: 5 },
          { name: 'cylinder', faces: 3 },
          { name: 'cone', faces: 2 },
          { name: 'sphere', faces: 1 },
        ];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        return {
          question: `How many faces does a ${shape.name} have?`,
          answer: shape.faces,
          type,
        };
      } else if (problemType === 8) {
        // Edges of 3D shapes
        const shapes = [
          { name: 'cube', edges: 12 },
          { name: 'rectangular prism', edges: 12 },
          { name: 'triangular prism', edges: 9 },
          { name: 'square pyramid', edges: 8 },
          { name: 'triangular pyramid', edges: 6 },
        ];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        return {
          question: `How many edges does a ${shape.name} have?`,
          answer: shape.edges,
          type,
        };
      } else {
        // Shape from description
        const descriptions = [
          { desc: '4 equal sides and 4 right angles', answer: 4, name: 'square' },
          { desc: '3 sides and 3 corners', answer: 3, name: 'triangle' },
          { desc: '2 long sides, 2 short sides, and 4 right angles', answer: 4, name: 'rectangle' },
          { desc: '6 equal sides', answer: 6, name: 'hexagon' },
          { desc: '8 sides', answer: 8, name: 'octagon' },
        ];
        const item = descriptions[Math.floor(Math.random() * descriptions.length)];
        return {
          question: `I have ${item.desc}. How many sides do I have? (I am a ${item.name})`,
          answer: item.answer,
          type,
        };
      }
    }
    case 'random': {
      const gradeNum = parseInt(grade);
      const availableTypes = allProblemTypes
        .filter(t => t.grades.includes(gradeNum) && t.id !== 'random' && t.id !== 'mixed')
        .map(t => t.id);
      const pickedType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
      return generateProblem(pickedType, grade);
    }
    case 'mixed': {
      // Get available types for this grade (excluding mixed itself)
      const gradeNum = parseInt(grade);
      const availableTypes = allProblemTypes
        .filter(t => t.grades.includes(gradeNum) && t.id !== 'mixed' && t.id !== 'random')
        .map(t => t.id);
      const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
      return generateProblem(randomType, grade);
    }
    default:
      return generateProblem('addition', grade);
  }
};
