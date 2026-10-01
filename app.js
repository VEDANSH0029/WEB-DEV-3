/**
 * Application Entry Point - Module Reusability Demo
 * Student: Vedansh (Roll No: 2501730211)
 * Branch: B.Tech CSE AI-ML (Section F)
 * 
 * Orchestrates custom modules:
 *   - ./modules/isEven.js
 *   - ./modules/logger.js
 */

const isEven = require('./modules/isEven');
const { logInfo, logSuccess, logWarning, logError } = require('./modules/logger');

// Retrieve CLI arguments
const cliArgs = process.argv.slice(2);

function runAutomatedVerification() {
  logInfo('========================================');
  logInfo('Smart Utility Toolkit - Module Test Suite');
  logInfo('Author: Vedansh | Roll No: 2501730211 | B.Tech CSE AI-ML (Sec F)');
  logInfo('========================================');
  logInfo('Running automated verification suite for isEven & logger modules...\n');

  const testCases = [
    { value: 0, label: 'Zero' },
    { value: 14, label: 'Positive Even' },
    { value: 7, label: 'Positive Odd' },
    { value: -4, label: 'Negative Even' },
    { value: -9, label: 'Negative Odd' },
    { value: 1000002, label: 'Large Even' },
    { value: '42', label: 'String Number "42"' },
    { value: 3.14, label: 'Float Number (Invalid integer)' },
    { value: 'hello', label: 'String Non-Number' }
  ];

  testCases.forEach(({ value, label }) => {
    try {
      const result = isEven(value);
      if (result) {
        logSuccess(`[${label}] Input: ${value} -> Result: EVEN`);
      } else {
        logWarning(`[${label}] Input: ${value} -> Result: ODD`);
      }
    } catch (err) {
      logError(`[${label}] Input: ${value} -> Threw expected error: ${err.message}`);
    }
  });

  logInfo('\nAutomated verification suite completed successfully.');
}

function processSingleInput(input) {
  logInfo(`Processing single input via CLI: "${input}"`);
  try {
    const result = isEven(input);
    if (result) {
      logSuccess(`The number ${input} is EVEN.`);
    } else {
      logWarning(`The number ${input} is ODD.`);
    }
  } catch (err) {
    logError(`Invalid input error: ${err.message}`);
    process.exit(1);
  }
}

// Execution logic
if (cliArgs.length === 0) {
  runAutomatedVerification();
} else if (cliArgs.length === 1 && (cliArgs[0] === '-h' || cliArgs[0] === '--help')) {
  logInfo('Usage:');
  logInfo('  node app.js <number>       (Check specific number)');
  logInfo('  node app.js                (Run full automated test suite)');
} else {
  // If multiple arguments are provided, evaluate each
  cliArgs.forEach((arg) => processSingleInput(arg));
}
