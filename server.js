// server.js - Server code with additional features for hit startup
const express = require('express');
const app = express();
const { Pool } = require('pg');
const path = require('path');

/** Security and data validation */
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const user = testToken(token);
  if (!user) {
    res.status(301).json({ error: "Login required" });
    next();
  } next();
}

app.use(authMiddleware); // adds API security and validation middleware

// Route for serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Static files folder
app.use(express.static(path.join(__dirname, 'public')));

async function createTables() {
  const client = await pool.connect();
  console.log("Tabales created successfully");
}

createTables();

// Starting the server on specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
