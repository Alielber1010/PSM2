const express = require('express');
const fs = require('fs');
const path = require('path');
const HtmlToDocx = require('html-to-docx');

const app = express();
const PORT = 3001;
const HTML_FILE = path.join(__dirname, 'PSM1Report_Full_.html');
const CHANGELOG_FILE = path.join(__dirname, 'CHANGELOG.md');

function getCurrentVersion() {
  if (!fs.existsSync(CHANGELOG_FILE)) return '1.0.0';
  const content = fs.readFileSync(CHANGELOG_FILE, 'utf8');
  const match = content.match(/## \[(\d+\.\d+\.\d+)\]/);
  return match ? match[1] : '1.0.0';
}

// Control panel
app.get('/', (req, res) => {
  const version = getCurrentVersion();
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PSM Report Viewer</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .card {
      background: white;
      border-radius: 12px;
      padding: 48px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      text-align: center;
      max-width: 480px;
      width: 100%;
    }
    h1 { font-size: 22px; color: #1a1a1a; margin-bottom: 8px; }
    .version { font-size: 13px; color: #888; margin-bottom: 36px; }
    .buttons { display: flex; flex-direction: column; gap: 12px; }
    a.btn {
      display: block;
      padding: 14px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      transition: opacity 0.15s;
    }
    a.btn:hover { opacity: 0.85; }
    .btn-view { background: #2563eb; color: white; }
    .btn-export { background: #16a34a; color: white; }
    .note {
      margin-top: 24px;
      font-size: 12px;
      color: #aaa;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>PSM Report</h1>
    <p class="version">Version ${version}</p>
    <div class="buttons">
      <a class="btn btn-view" href="/view" target="_blank">View as HTML</a>
      <a class="btn btn-export" href="/export">Export to Word (.docx)</a>
    </div>
    <p class="note">
      The exported Word document includes heading styles<br>
      that auto-populate the Table of Contents and navigation pane.
    </p>
  </div>
</body>
</html>`);
});

// View HTML report
app.get('/view', (req, res) => {
  res.sendFile(HTML_FILE);
});

// Export to DOCX with TOC
app.get('/export', async (req, res) => {
  const version = getCurrentVersion();
  try {
    const html = fs.readFileSync(HTML_FILE, 'utf8');

    const docxBuffer = await HtmlToDocx(html, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
      // Enables Word's built-in heading styles → headings appear in nav pane + TOC
      headingStyles: true,
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="PSM1Report_v${version}.docx"`);
    res.send(docxBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Export failed: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`PSM Report server running at http://localhost:${PORT}`);
});
