/**
 * Native HTTP Web Server
 * Student: Vedansh (Roll No: 2501730211)
 * Branch: B.Tech CSE AI-ML (Section F)
 * 
 * Features:
 *   - Native Node.js http module (Zero external dependencies)
 *   - Custom routing for /, /home, /about, /contact
 *   - 404 Not Found handler
 *   - Clean modern HTML/CSS responses
 */

const http = require('http');
const { logInfo, logSuccess, logWarning, logError } = require('./modules/logger');

const PORT = process.env.PORT || 3000;

/**
 * Base layout wrapper with modern styling
 */
function renderLayout(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Smart Utility Toolkit</title>
  <style>
    :root {
      --bg: #0f172a;
      --card-bg: #1e293b;
      --card-border: #334155;
      --primary: #38bdf8;
      --primary-glow: rgba(56, 189, 248, 0.25);
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent-green: #4ade80;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 2rem 1rem;
    }
    header {
      width: 100%;
      max-width: 800px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0 2rem 0;
      border-bottom: 1px solid var(--card-border);
    }
    .logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary);
      letter-spacing: -0.5px;
    }
    nav a {
      color: var(--text-muted);
      text-decoration: none;
      margin-left: 1.25rem;
      font-weight: 500;
      font-size: 0.95rem;
      transition: color 0.2s ease;
    }
    nav a:hover {
      color: var(--primary);
    }
    main {
      width: 100%;
      max-width: 800px;
      margin: 2rem 0;
    }
    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 1rem;
      padding: 2.5rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #ffffff 0%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      color: var(--text-muted);
      line-height: 1.7;
      margin-bottom: 1.25rem;
      font-size: 1.05rem;
    }
    .badge {
      display: inline-block;
      background: var(--primary-glow);
      color: var(--primary);
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1rem;
      border: 1px solid rgba(56, 189, 248, 0.4);
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .info-item {
      background: rgba(15, 23, 42, 0.6);
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--card-border);
    }
    .info-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 0.25rem;
    }
    .info-value {
      font-weight: 600;
      color: var(--text);
    }
    footer {
      width: 100%;
      max-width: 800px;
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid var(--card-border);
      color: var(--text-muted);
      font-size: 0.85rem;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--accent-green);
      font-size: 0.85rem;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      background-color: var(--accent-green);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent-green);
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">⚡ Smart Utility Toolkit</div>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <main>
    ${content}
  </main>

  <footer>
    <div style="margin-bottom: 0.5rem;">
      <span class="status-pill"><span class="status-dot"></span> Node.js Native HTTP Server Running</span>
    </div>
    <p>Node.js Backend Lab Assignment 1 &bull; Vedansh (Roll No: 2501730211)</p>
  </footer>
</body>
</html>`;
}

// Router map
const routes = {
  '/': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    const content = `
      <div class="card">
        <span class="badge">Welcome</span>
        <h1>Welcome to Smart Utility Toolkit</h1>
        <p>A modular, high-performance backend utility suite built strictly with Node.js built-in core modules. No external packages, no third-party web frameworks—just clean, pure native JavaScript execution.</p>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Runtime</div>
            <div class="info-value">Node.js Core (HTTP, FS, Crypto)</div>
          </div>
          <div class="info-item">
            <div class="info-label">Port</div>
            <div class="info-value">${PORT}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Framework</div>
            <div class="info-value">Pure Native http.createServer()</div>
          </div>
        </div>
      </div>
    `;
    res.end(renderLayout('Home', content));
  },

  '/home': (req, res) => {
    // Reuse root handler for /home
    routes['/'](req, res);
  },

  '/about': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    const content = `
      <div class="card">
        <span class="badge">Student Profile</span>
        <h1>About the Developer & Project</h1>
        <p>This application was developed as part of Node.js Backend Lab Assignment 1, demonstrating common architectural patterns with native Node.js core modules, non-blocking I/O, and CommonJS modularity.</p>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Student Name</div>
            <div class="info-value">Vedansh</div>
          </div>
          <div class="info-item">
            <div class="info-label">University Roll No</div>
            <div class="info-value">2501730211</div>
          </div>
          <div class="info-item">
            <div class="info-label">Program & Branch</div>
            <div class="info-value">B.Tech CSE (AI & ML)</div>
          </div>
          <div class="info-item">
            <div class="info-label">Section</div>
            <div class="info-value">Section F</div>
          </div>
          <div class="info-item">
            <div class="info-label">Module Architecture</div>
            <div class="info-value">CommonJS (require / module.exports)</div>
          </div>
          <div class="info-item">
            <div class="info-label">Dependencies</div>
            <div class="info-value">0 External Packages (Pure Native)</div>
          </div>
        </div>
      </div>
    `;
    res.end(renderLayout('About', content));
  },

  '/contact': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    const content = `
      <div class="card">
        <span class="badge">Contact Details</span>
        <h1>Get in Touch</h1>
        <p>For inquiries, code review, or evaluation regarding the Smart Utility Toolkit backend implementation:</p>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Developer</div>
            <div class="info-value">Vedansh</div>
          </div>
          <div class="info-item">
            <div class="info-label">Roll Number</div>
            <div class="info-value">2501730211</div>
          </div>
          <div class="info-item">
            <div class="info-label">Academic Department</div>
            <div class="info-value">Department of Computer Science & Engineering</div>
          </div>
          <div class="info-item">
            <div class="info-label">Specialization</div>
            <div class="info-value">Artificial Intelligence & Machine Learning (Section F)</div>
          </div>
        </div>
      </div>
    `;
    res.end(renderLayout('Contact', content));
  }
};

// 404 Handler
function handleNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  const content = `
    <div class="card" style="border-color: #ef4444;">
      <span class="badge" style="background: rgba(239, 68, 68, 0.2); color: #f87171; border-color: rgba(239, 68, 68, 0.4);">404 Error</span>
      <h1>Page Not Found</h1>
      <p>The requested route <code>${req.url}</code> does not exist on this server.</p>
      <p style="margin-top: 1rem;"><a href="/" style="color: var(--primary); text-decoration: underline;">Return to Home</a></p>
    </div>
  `;
  res.end(renderLayout('404 Not Found', content));
}

// Server creation
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  logInfo(`${req.method} ${pathname}`);

  if (req.method === 'GET' && routes[pathname]) {
    routes[pathname](req, res);
  } else {
    logWarning(`Route not found (404): ${pathname}`);
    handleNotFound(req, res);
  }
});

server.listen(PORT, () => {
  logSuccess(`HTTP Server running at http://localhost:${PORT}/`);
  logInfo(`Available Routes:`);
  logInfo(`  -> http://localhost:${PORT}/`);
  logInfo(`  -> http://localhost:${PORT}/home`);
  logInfo(`  -> http://localhost:${PORT}/about`);
  logInfo(`  -> http://localhost:${PORT}/contact`);
});
