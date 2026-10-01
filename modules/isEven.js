/**
 * Module: isEven
 * Student: Vedansh (Roll No: 2501730211)
 * Branch: B.Tech CSE AI-ML (Section F)
 * 
 * Determines whether a given number is even or odd.
 */

/**
 * Checks if a number is even.
 * @param {number|string} num - The number to evaluate.
 * @returns {boolean} True if the number is even, false otherwise.
 * @throws {TypeError} If the input is not a valid number or integer.
 */
function isEven(num) {
  if (num === null || num === undefined || num === '') {
    throw new TypeError('Input must be a valid number.');
  }

  const parsed = Number(num);

  if (Number.isNaN(parsed)) {
    throw new TypeError(`'${num}' is not a valid number.`);
  }

  if (!Number.isInteger(parsed)) {
    throw new TypeError(`'${num}' is a float. Even/odd parity is only defined for integers.`);
  }

  return parsed % 2 === 0;
}

module.exports = isEven;
