const express = require('express');
const path = require('path');
const helmet = require('helmet');
const fs = require('fs');
const bodyParser = require('body-parser'); // Ново: За обработка на POST заявки
const questionnaireController = require('./api/questionnaireController'); // Ново: API контролер за въпросника
const app = express();

/** Server configuration **/
// Ensure build directory exists
if (!fs.existsSync(path.join(__dirname, 'build'))) {
  console.log("Build directory does not exist, creating now...");
  const { exec } = require('child_process');
  exec('npm run build').on('data', data => {
    console.log("Build completed successfully");
  }).on('error', e => {
    console.error(`npm run build failed: ${e.message}`);
    process.exit(1);
  });
}

/** Security middleware **/
app.use(helmet());

/** Middleware for parsing JSON requests **/
app.use(bodyParser.json()); // Ново: За обработка на JSON заявки

/** Static file handling **/
app.use(express.static(path.join(__dirname, 'build'), { maxAge: '1y' }));

/** API Routing **/
// Ново: API маршрути за въпросника
app.use('/api', questionnaireController);

/** SPA Routing **/
app.get('/*', (req, res) => {
  const filePath = path.join(__dirname, 'build', 'index.html');
  console.log(`Request to ${req.url} received at time: ${new Date()}`);
  if (!fs.existsSync(filePath)) {
    console.error(`index.html does not exist: ${filePath}`);
    return res.status(404).send('index.html does not exist!');
  }
  res.sendFile(filePath);
});

/** Middleware Default **/
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack + ' Status: ' + res.statusCode);
  res.status(500).send('Server error');
});

/** 404 handler **/
app.use((req, res) => {
  res.status(404).send('Page not found');
});

/** Server Start **/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
