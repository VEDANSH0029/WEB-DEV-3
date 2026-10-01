/**
 * Module: logger
 * Student: Vedansh (Roll No: 2501730211)
 * Branch: B.Tech CSE AI-ML (Section F)
 * 
 * Provides colorized terminal logging using standard ANSI escape codes
 * and ISO timestamps.
 */

// ANSI Color Escape Codes
const COLORS = {
  RESET: '\x1b[0m',
  BRIGHT: '\x1b[1m',
  DIM: '\x1b[2m',
  CYAN: '\x1b[36m',    // Info
  GREEN: '\x1b[32m',   // Success
  YELLOW: '\x1b[33m',  // Warning
  RED: '\x1b[31m',     // Error
  GRAY: '\x1b[90m'     // Timestamp
};

/**
 * Returns current formatted ISO timestamp.
 * @returns {string} ISO timestamp
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * Log informational messages (Cyan)
 * @param {...any} messages 
 */
function logInfo(...messages) {
  const ts = `${COLORS.GRAY}[${getTimestamp()}]${COLORS.RESET}`;
  const tag = `${COLORS.CYAN}${COLORS.BRIGHT}[INFO]${COLORS.RESET}`;
  console.log(`${ts} ${tag} ${COLORS.CYAN}${messages.join(' ')}${COLORS.RESET}`);
}

/**
 * Log success messages (Green)
 * @param {...any} messages 
 */
function logSuccess(...messages) {
  const ts = `${COLORS.GRAY}[${getTimestamp()}]${COLORS.RESET}`;
  const tag = `${COLORS.GREEN}${COLORS.BRIGHT}[SUCCESS]${COLORS.RESET}`;
  console.log(`${ts} ${tag} ${COLORS.GREEN}${messages.join(' ')}${COLORS.RESET}`);
}

/**
 * Log warning messages (Yellow)
 * @param {...any} messages 
 */
function logWarning(...messages) {
  const ts = `${COLORS.GRAY}[${getTimestamp()}]${COLORS.RESET}`;
  const tag = `${COLORS.YELLOW}${COLORS.BRIGHT}[WARNING]${COLORS.RESET}`;
  console.warn(`${ts} ${tag} ${COLORS.YELLOW}${messages.join(' ')}${COLORS.RESET}`);
}

/**
 * Log error messages (Red)
 * @param {...any} messages 
 */
function logError(...messages) {
  const ts = `${COLORS.GRAY}[${getTimestamp()}]${COLORS.RESET}`;
  const tag = `${COLORS.RED}${COLORS.BRIGHT}[ERROR]${COLORS.RESET}`;
  console.error(`${ts} ${tag} ${COLORS.RED}${messages.join(' ')}${COLORS.RESET}`);
}

module.exports = {
  logInfo,
  logSuccess,
  logWarning,
  logError,
  COLORS
};
