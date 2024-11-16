
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const fs = require('fs');
const app = express();

// Ensure build directory exists
if (!fs.existsSync(path.join(__dirname, 'build'))) {
  console.error('Build directory does not exist!');
  process.exit(1);
}

// Security middleware
app.use(helmet());

// Serve static files from the React app with caching
app.use(express.static(path.join(__dirname, 'build'), { maxAge: '1y' }));

// Wildcard route to serve index.html for SPA
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
