/**
 * File Manager Utility & Event Loop Execution Demo
 * Student: Vedansh (Roll No: 2501730211)
 * Branch: B.Tech CSE AI-ML (Section F)
 * 
 * Supports:
 *   - create <file> <content> (fs.writeFile)
 *   - read <file>            (fs.readFile)
 *   - update <file> <content> (fs.appendFile)
 *   - delete <file>          (fs.unlink)
 *   - demo                   (Synchronous vs Asynchronous libuv execution flow)
 */

const fs = require('fs');
const path = require('path');
const { logInfo, logSuccess, logWarning, logError } = require('./modules/logger');

const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase() : null;

function showHelp() {
  console.log(`
Smart Utility Toolkit - File Manager
Author: Vedansh (Roll No: 2501730211 | B.Tech CSE AI-ML Sec F)

Usage:
  node fileManager.js create <filename> <content>
  node fileManager.js read <filename>
  node fileManager.js update <filename> <content>
  node fileManager.js delete <filename>
  node fileManager.js demo

Examples:
  node fileManager.js create test.txt "Hello Node.js"
  node fileManager.js read test.txt
  node fileManager.js update test.txt "\\nAppended text"
  node fileManager.js delete test.txt
  node fileManager.js demo
`);
}

/**
 * Normalizes escaped newlines and tabs from terminal arguments
 */
function parseContent(raw) {
  if (!raw) return '';
  return raw.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
}

/**
 * 1. Create File (fs.writeFile)
 */
function createFile(fileName, content) {
  if (!fileName) {
    logError('Please specify a filename to create.');
    process.exit(1);
  }
  const filePath = path.resolve(process.cwd(), fileName);
  const data = parseContent(content || '');

  fs.writeFile(filePath, data, 'utf8', (err) => {
    if (err) {
      logError(`Failed to create file "${fileName}": ${err.message}`);
      process.exit(1);
    }
    logSuccess(`File "${fileName}" created successfully.`);
  });
}

/**
 * 2. Read File (fs.readFile)
 */
function readFile(fileName) {
  if (!fileName) {
    logError('Please specify a filename to read.');
    process.exit(1);
  }
  const filePath = path.resolve(process.cwd(), fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        logError(`File "${fileName}" not found (ENOENT: No such file or directory).`);
      } else {
        logError(`Error reading file "${fileName}": ${err.message}`);
      }
      process.exit(1);
    }
    logSuccess(`Content of "${fileName}":`);
    console.log(data);
  });
}

/**
 * 3. Update File (fs.appendFile)
 */
function updateFile(fileName, content) {
  if (!fileName) {
    logError('Please specify a filename to update.');
    process.exit(1);
  }
  const filePath = path.resolve(process.cwd(), fileName);
  const data = parseContent(content || '');

  fs.appendFile(filePath, data, 'utf8', (err) => {
    if (err) {
      logError(`Failed to update file "${fileName}": ${err.message}`);
      process.exit(1);
    }
    logSuccess(`Data successfully appended to "${fileName}".`);
  });
}

/**
 * 4. Delete File (fs.unlink)
 */
function deleteFile(fileName) {
  if (!fileName) {
    logError('Please specify a filename to delete.');
    process.exit(1);
  }
  const filePath = path.resolve(process.cwd(), fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        logWarning(`Cannot delete "${fileName}". File does not exist.`);
      } else {
        logError(`Failed to delete file "${fileName}": ${err.message}`);
      }
      process.exit(1);
    }
    logSuccess(`File "${fileName}" was deleted successfully.`);
  });
}

/**
 * 5. Execution Flow Demo: Sync vs Async (Event Loop & libuv)
 */
function runExecutionDemo() {
  console.log('\n======================================================');
  console.log('--- Demonstration: Synchronous vs Asynchronous Flow ---');
  console.log('Author: Vedansh (Roll No: 2501730211)');
  console.log('======================================================\n');

  console.log('[1] [SYNC] Script starts executing line by line on the Main Call Stack.');

  const demoFile = path.resolve(process.cwd(), '.temp_demo.txt');
  fs.writeFileSync(demoFile, 'Temporary file for libuv async demo.', 'utf8');

  console.log('[2] [SYNC] Executing synchronous operation: fs.writeFileSync complete.');

  // Asynchronous operation offloaded to libuv thread pool / event loop
  console.log('[3] [SYNC -> ASYNC DISPATCH] Initiating asynchronous fs.readFile()...');
  fs.readFile(demoFile, 'utf8', (err, data) => {
    if (err) throw err;
    console.log('[6] [ASYNC CALLBACK] Asynchronous fs.readFile() callback executed via Event Loop queue!');
    console.log(`    -> Read Content: "${data.trim()}"`);

    // Clean up demo file
    fs.unlink(demoFile, () => {
      console.log('[7] [ASYNC CLEANUP] Temporary demo file unlinked.');
      console.log('\n--- Demo Complete: Notice how [4] and [5] executed BEFORE [6] and [7]! ---\n');
    });
  });

  // setImmediate / setTimeout demo
  setTimeout(() => {
    console.log('[5] [ASYNC TIMER] setTimeout callback executed (Timers phase of Event Loop).');
  }, 0);

  console.log('[4] [SYNC] Script reaches end of synchronous call stack without waiting for async I/O!');
}

// Command dispatcher
switch (command) {
  case 'create':
    createFile(args[1], args[2]);
    break;

  case 'read':
    readFile(args[1]);
    break;

  case 'update':
    updateFile(args[1], args[2]);
    break;

  case 'delete':
    deleteFile(args[1]);
    break;

  case 'demo':
    runExecutionDemo();
    break;

  case '-h':
  case '--help':
    showHelp();
    break;

  default:
    if (!command) {
      showHelp();
    } else {
      logError(`Unknown command "${command}".`);
      showHelp();
      process.exit(1);
    }
    break;
}
