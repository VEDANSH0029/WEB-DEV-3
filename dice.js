/**
 * Cryptographic Random Dice Simulator
 * Student: Vedansh (Roll No: 2501730211)
 * Branch: B.Tech CSE AI-ML (Section F)
 * 
 * Features:
 *   - Cryptographically secure pseudo-random numbers using crypto.randomInt(1, 7)
 *   - Supports single roll or multiple rolls via CLI argument (e.g., node dice.js 4)
 *   - Automatically logs roll history with ISO timestamps into dice_history.txt
 *   - ASCII visual dice representations
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { logInfo, logSuccess, logError } = require('./modules/logger');

const HISTORY_FILE = path.resolve(__dirname, 'dice_history.txt');

// ASCII Art representations for a 6-sided die
const DICE_FACES = {
  1: [
    '+-------+',
    '|       |',
    '|   *   |',
    '|       |',
    '+-------+'
  ],
  2: [
    '+-------+',
    '| *     |',
    '|       |',
    '|     * |',
    '+-------+'
  ],
  3: [
    '+-------+',
    '| *     |',
    '|   *   |',
    '|     * |',
    '+-------+'
  ],
  4: [
    '+-------+',
    '| *   * |',
    '|       |',
    '| *   * |',
    '+-------+'
  ],
  5: [
    '+-------+',
    '| *   * |',
    '|   *   |',
    '| *   * |',
    '+-------+'
  ],
  6: [
    '+-------+',
    '| *   * |',
    '| *   * |',
    '| *   * |',
    '+-------+'
  ]
};

/**
 * Generates a single cryptographically secure dice roll between 1 and 6
 * @returns {number} Integer between 1 and 6
 */
function rollSingleDice() {
  return crypto.randomInt(1, 7);
}

/**
 * Appends dice roll result to history file asynchronously
 */
function recordHistory(rolls, callback) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] Rolls: [${rolls.join(', ')}] | Count: ${rolls.length} | Sum: ${rolls.reduce((a, b) => a + b, 0)}\n`;

  fs.appendFile(HISTORY_FILE, entry, 'utf8', (err) => {
    if (err) {
      logError(`Failed to save history: ${err.message}`);
    } else {
      logSuccess(`Roll saved to "${path.basename(HISTORY_FILE)}".`);
    }
    if (callback) callback();
  });
}

function printDiceFace(val) {
  const face = DICE_FACES[val];
  if (face) {
    console.log(face.join('\n'));
  }
}

// Execution
const args = process.argv.slice(2);
let rollCount = 1;

if (args.length > 0) {
  const parsed = parseInt(args[0], 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    logError('Error: Please provide a valid positive integer for the number of rolls.');
    console.log('Usage: node dice.js [numberOfRolls]');
    process.exit(1);
  }
  rollCount = parsed;
}

logInfo(`🎲 Cryptographic Dice Simulator (crypto.randomInt)`);
logInfo(`Rolling ${rollCount} time${rollCount > 1 ? 's' : ''}...\n`);

const results = [];
for (let i = 1; i <= rollCount; i++) {
  const value = rollSingleDice();
  results.push(value);
  console.log(`Roll #${i}: Value = ${value}`);
  if (rollCount <= 5) {
    printDiceFace(value);
    console.log('');
  }
}

if (rollCount > 1) {
  const sum = results.reduce((acc, curr) => acc + curr, 0);
  const avg = (sum / rollCount).toFixed(2);
  logInfo(`Summary: [${results.join(', ')}] | Total Sum: ${sum} | Average: ${avg}`);
}

recordHistory(results);
