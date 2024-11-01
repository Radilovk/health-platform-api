// API for profile, recommendations, and progress 
const express = require('express');
const profileController = require('./controllers/profile');
const progressController = require('./controllers/progress');

const app = express();

// Profile information
app.get('/api/profile', (req, res) => {
  profileController.getProfile(res);
});

// Recommendations
app.get('/api/recommendations', (req, res) => {
  profileController.getRecommendations(res);
});

// Progress information
app.get('/api/progress', (req, res) => {
  progressController.getProgress(res);
});

module.exports = app; 