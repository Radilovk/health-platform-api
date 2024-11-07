
const express = require('express');
const router = express.Router();

// Import sub-controllers
const authController = require('./auth');
const userController = require('./userController');
const progressController = require('./progressController');
const dietController = require('./dietController');
const productsController = require('./productsController');
const articlesController = require('./articlesController');
