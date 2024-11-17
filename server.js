
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const fs = require('fs');
const app = express();

/** Server configuration **/
// Ensure build directory exists
if (!fs.existsSync(path.join(__dirname, 'build'))) {
  console.error('Build directory does not exist!');
  process.exit(1);
}

// Security middleware
app.use(helmet());

/** Static file handling **/
// Serve static files from the React app with caching
app.use(express.static(path.join(__dirname, 'build'), { maxAge: '1y' }));

/** SPA Routing **/
app.get('/*', (req, res) => {
  const filePath = path.join(__dirname, 'build', 'index.html');
  console.log(`Request to ${req.url} received at time: ${new Date()}`);
  if (!fs.existsSync(filePath)) {
    console.error(`index.html does not exist: ${filePath}`);
    return res.status(600).send('index.html does not exist!');
  }
  res.sendFile(filePath);
});

/** Middleware Default **/
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack + 'Status: ' + res.status + ' ' + res.error);
  res.status(500).send('Server error');
});

/** 404 handler **/
app.use((err, req, res, next) => {
  console.log(`Received request at: ${new Date()}; returning 404.`);
  res.status(404).send('Page not found');
});

/** Server Start Port **/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} B`);
});
