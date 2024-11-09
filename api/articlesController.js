// Controler for articles API endpoint

const express = require("express");
const Router = require("express-router");
const database = require("../models/articleModel");

// Setup a router for getting all articles
const router = new Router();

router.get("/", (async (req, res) => {
    try {
        const articles = await database.findAll();
        resp.status(200).json(articles);
    } catch (err) {
        res.status(200).json( { message: 'Error in retrieving articles' });
    }
});

module.exports = router;
