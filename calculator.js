/**
 * CLI Calculator Utility
 * Student: Vedansh (Roll No: 2501730211)
 * Branch: B.Tech CSE AI-ML (Section F)
 * 
 * Usage:
 *   node calculator.js <operation> <num1> <num2>
 * 
 * Examples:
 *   node calculator.js add 10 5      -> 15
 *   node calculator.js divide 100 4  -> 25
 *   node calculator.js divide 10 0   -> Error: Division by zero is not allowed.
 */

const args = process.argv.slice(2);

function showHelp() {
  console.log(`
Smart Utility Toolkit - CLI Calculator
Author: Vedansh (Roll No: 2501730211 | B.Tech CSE AI-ML Sec F)

Usage:
  node calculator.js <operation> <operand1> <operand2>

Supported Operations:
  add, +         Addition
  subtract, sub, -  Subtraction
  multiply, mul, *  Multiplication
  divide, div, /    Division (Guarded against division by zero)
  modulo, mod, %    Modulo (Guarded against modulo by zero)
  power, pow, ^     Exponentiation

Examples:
  node calculator.js add 10 5
  node calculator.js sub 20 8
  node calculator.js mul 6 7
  node calculator.js div 100 4
  node calculator.js mod 17 5
  node calculator.js pow 2 8
`);
}

function calculate(op, a, b) {
  const num1 = Number(a);
  const num2 = Number(b);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    console.error('Error: Both operands must be valid numbers.');
    process.exit(1);
  }

  const normalizedOp = (op || '').toLowerCase();

  switch (normalizedOp) {
    case 'add':
    case '+':
      return num1 + num2;

    case 'subtract':
    case 'sub':
    case '-':
      return num1 - num2;

    case 'multiply':
    case 'mul':
    case '*':
    case 'x':
      return num1 * num2;

    case 'divide':
    case 'div':
    case '/':
      if (num2 === 0) {
        console.error('Error: Division by zero is not allowed.');
        process.exit(1);
      }
      return num1 / num2;

    case 'modulo':
    case 'mod':
    case '%':
      if (num2 === 0) {
        console.error('Error: Modulo by zero is not allowed.');
        process.exit(1);
      }
      return num1 % num2;

    case 'power':
    case 'pow':
    case '^':
    case '**':
      return Math.pow(num1, num2);

    default:
      console.error(`Error: Unsupported operation '${op}'.`);
      console.error('Supported operations: add (+), sub (-), mul (*), div (/), mod (%), pow (^)');
      process.exit(1);
  }
}

// Execution
if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  showHelp();
  process.exit(0);
}

if (args.length < 3) {
  console.error('Error: Insufficient arguments provided.');
  console.error('Usage: node calculator.js <operation> <num1> <num2>');
  process.exit(1);
}

const [operation, firstArg, secondArg] = args;
const result = calculate(operation, firstArg, secondArg);
console.log(result);
