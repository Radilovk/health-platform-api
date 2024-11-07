
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');

// User registration
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userRecord = await firebase.auth().createUser({email, password, displayName: name, });
    res.status(201).json({ userId: userRecord.uid });
  } catch (error) {
    res.status(400).json( { error: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await firebase.auth().getUserByEmail(email);
    if (user) {
      const customToken = await firebase.auth().createCustomToken(user.uid);
      res.status(200).json({ token: customToken });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
