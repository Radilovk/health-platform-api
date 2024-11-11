// Configuration settings for Firebase authentication on the frontend part
const firebaseConfig = {
  apiKey: "your-api-key-from-firebase",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-firebase-project-id",
  messagingSender: "your@firebaseapp.com",
  appId: "your-app-app-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messender-id",
};

firebase.init(firebaseConfig);
module.exports = firebaseConfig;