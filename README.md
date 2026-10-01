# ⚡ Smart Utility Toolkit

**Node.js Backend Lab Assignment 1**  
Built strictly using **Node.js Core Modules** without any third-party npm dependencies or external frameworks.

---

## 👨‍🎓 Student & Academic Details

- **Student Name:** Vedansh
- **Roll Number:** 2501730211
- **Program & Branch:** B.Tech Computer Science & Engineering (Artificial Intelligence & Machine Learning)
- **Section:** F
- **Course / Lab:** Node.js Backend Development Lab Assignment 1

---

## 🚀 Overview & Architectural Principles

The **Smart Utility Toolkit** is an extensible backend utility suite developed strictly with native Node.js core modules. It illustrates foundational backend software engineering patterns:

1. **CommonJS Modularity:** Encapsulation and clean exports/imports (`require()` and `module.exports`).
2. **Asynchronous Non-Blocking I/O:** Core file system interactions via `fs` without blocking the single-threaded event loop.
3. **HTTP Server Architecture:** Request routing, content negotiation, status code handling, and 404 fallbacks via `http.createServer()`.
4. **Cryptographic Security:** Cryptographically secure pseudo-random number generation (CSPRNG) via `crypto.randomInt()`.
5. **Terminal User Experience:** ANSI color coding, ISO formatted timestamps, and CLI argument parsing via `process.argv`.

---

## 🛠️ Technology Stack & Constraints Adherence

| Category | Specification | Adherence Guarantee |
| :--- | :--- | :--- |
| **Runtime** | Node.js (v18+) | Native Node.js execution |
| **Language** | JavaScript (ES6+) | CommonJS modules |
| **Core Modules Used** | `process`, `http`, `fs`, `crypto`, `path` | **100% Core Built-in** |
| **Third-Party npm Packages** | **None** | **0 External Dependencies** |
| **Frameworks** | **No Express.js / Fastify** | Native `http` module |
| **Databases** | **No external DB** | Flat-file persistence (`fs.appendFile`) |

---

## 📁 Directory & File Structure

```text
smart-utility-toolkit/
├── package.json          # Project metadata, engine restrictions & npm scripts
├── calculator.js         # CLI calculator utility parsing process.argv
├── app.js                # Application entry point orchestrating custom modules
├── server.js             # Native HTTP web server with custom routing & 404 handler
├── fileManager.js        # Async File CRUD & Sync vs Async Event Loop execution demo
├── dice.js               # Cryptographic dice roll simulator with history logging
├── test.txt              # Sample initial file for file operations
├── modules/
│   ├── isEven.js         # Parity verification module
│   └── logger.js         # ANSI colorized terminal logger with ISO timestamps
└── README.md             # In-depth project documentation & verification guide
```

---

## 📝 Functional Components & Usage Guide

### 1. CLI Calculator (`calculator.js`)

Parses command-line arguments using `process.argv` and supports both symbolic and word-based operators, with robust guards against division and modulo by zero.

#### Supported Operations:
- **Addition:** `add`, `+`
- **Subtraction:** `subtract`, `sub`, `-`
- **Multiplication:** `multiply`, `mul`, `*`, `x`
- **Division:** `divide`, `div`, `/` *(Guarded against division by zero)*
- **Modulo:** `modulo`, `mod`, `%` *(Guarded against modulo by zero)*
- **Power:** `power`, `pow`, `^`, `**`

#### CLI Examples:
```bash
# Addition
node calculator.js add 10 5
# Output: 15

# Subtraction
node calculator.js sub 20 8
# Output: 12

# Multiplication
node calculator.js mul 6 7
# Output: 42

# Division
node calculator.js divide 100 4
# Output: 25

# Division by zero (Guarded)
node calculator.js divide 10 0
# Output: Error: Division by zero is not allowed.

# Modulo
node calculator.js mod 17 5
# Output: 2

# Exponentiation / Power
node calculator.js pow 2 8
# Output: 256
```

---

### 2. Custom Modules & Reusability (`modules/` & `app.js`)

#### `modules/isEven.js`
- Accepts an integer and returns `true` if even, `false` if odd.
- Validates that the input is a valid non-empty integer.
- Exports cleanly via `module.exports = isEven`.

#### `modules/logger.js`
- Custom logger functions utilizing standard ANSI escape sequences:
  - **`logInfo`:** Cyan (`\x1b[36m`)
  - **`logSuccess`:** Green (`\x1b[32m`)
  - **`logWarning`:** Yellow (`\x1b[33m`)
  - **`logError`:** Red (`\x1b[31m`)
- Automatically prefixes every log with an ISO 8601 formatted timestamp (`[YYYY-MM-DDTHH:mm:ss.sssZ]`).

#### `app.js`
- Imports `isEven.js` and `logger.js` using CommonJS `require()`.
- Supports CLI evaluation for a single number or runs an automated verification suite when executed without arguments.

```bash
# Test a specific number
node app.js 14
# [2026-10-01T...] [INFO] Processing single input via CLI: "14"
# [2026-10-01T...] [SUCCESS] The number 14 is EVEN.

# Test an odd number
node app.js 7
# [2026-10-01T...] [INFO] Processing single input via CLI: "7"
# [2026-10-01T...] [WARNING] The number 7 is ODD.

# Run full automated verification suite
node app.js
```

---

### 3. Native HTTP Web Server (`server.js`)

Constructed with Node.js built-in `http` module listening on port `3000` (or `process.env.PORT`).

#### Endpoints:
- `GET /` or `GET /home`: Landing page detailing toolkit architecture (Status 200).
- `GET /about`: Profile page highlighting student name (Vedansh, Roll No: 2501730211, B.Tech CSE AI-ML Section F) and assignment specifications (Status 200).
- `GET /contact`: Academic and developer contact details (Status 200).
- **Wildcard / Unhandled Routes:** Clean custom 404 Not Found error page (Status 404).

#### Running the Server:
```bash
node server.js
```
Open in browser or test via curl:
```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/about
curl -i http://localhost:3000/contact
curl -i http://localhost:3000/unknown-route
```

---

### 4. File Manager (`fileManager.js`)

Implements asynchronous CRUD operations using the native `fs` module, plus an Event Loop execution flow demo.

#### Supported Commands:
1. **Create / Overwrite File:**
   ```bash
   node fileManager.js create test.txt "Hello Node.js"
   ```
2. **Read File Content:**
   ```bash
   node fileManager.js read test.txt
   ```
   *(Handles missing files gracefully with `ENOENT` error handling).*
3. **Append / Update File:**
   ```bash
   node fileManager.js update test.txt "\nAppended text"
   ```
4. **Delete File:**
   ```bash
   node fileManager.js delete test.txt
   ```
5. **Synchronous vs Asynchronous Execution Flow Demo:**
   ```bash
   node fileManager.js demo
   ```

#### 🔬 Execution Flow Demo Explanation (libuv & Node.js Event Loop)
When running `node fileManager.js demo`:
- **Main Call Stack (Synchronous):** Executes statements [1], [2], and [3] sequentially.
- **Background I/O Delegation (libuv):** When `fs.readFile()` is invoked, libuv offloads file reading to its thread pool without pausing the main thread.
- **Non-blocking Progression:** Statement [4] logs **before** the asynchronous callbacks execute.
- **Event Loop Phases:**
  - `setTimeout` callback executes during the **Timers phase** [5].
  - `fs.readFile` callback runs in the **Poll phase** [6], reading content and scheduling unlinking [7].

---

### 5. Cryptographic Random Dice Generator (`dice.js`)

Simulates a standard 6-sided die using cryptographically secure random integers (`crypto.randomInt(1, 7)`), which avoids the predictability flaws of `Math.random()`.

#### Features:
- Supports single roll or multiple rolls via CLI arguments.
- Terminal ASCII art rendering for dice faces.
- Automatic roll history recording with timestamps appended to `dice_history.txt`.

#### CLI Examples:
```bash
# Single roll
node dice.js

# Multiple rolls (e.g., 4 rolls)
node dice.js 4
```

---

## 🧪 Comprehensive Verification Checklist

You can execute every command listed below directly from the terminal to verify the entire toolkit:

```bash
# 1. Calculator verification
node calculator.js add 10 5
node calculator.js divide 100 4
node calculator.js divide 10 0
node calculator.js mod 19 4
node calculator.js pow 3 4

# 2. Custom Modules & App verification
node app.js 14
node app.js 27
node app.js

# 3. File Manager CRUD & Demo verification
node fileManager.js create test.txt "Hello Node.js"
node fileManager.js read test.txt
node fileManager.js update test.txt "\nAppended text"
node fileManager.js read test.txt
node fileManager.js delete test.txt
node fileManager.js demo

# 4. Cryptographic Dice verification
node dice.js 4

# 5. Native HTTP Server
node server.js
```

---

## 📦 Convenient npm Execution Scripts

Defined in `package.json`:

```bash
npm start          # Runs app.js
npm run test       # Runs app.js automated verification suite
npm run calc       # Displays calculator usage
npm run dice       # Runs dice simulator
npm run file:demo  # Runs Event Loop sync vs async demo
npm run server     # Starts native HTTP server on port 3000
```

---

## ⚖️ Academic Integrity & Compliance

- **Zero External Dependencies:** Verified with `npm list` (no `node_modules` required).
- **Core Node.js APIs Only:** Strictly adheres to native Node.js specifications.
- **Code Author:** Vedansh (Roll No: 2501730211, B.Tech CSE AI-ML Section F).
