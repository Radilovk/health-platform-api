// Configuration file for Firebase integration
const firebase = require('firebase-admin');

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

// Initialize Firebase with service account key
firebase.initialize({
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
});

module.exports = firebase;
