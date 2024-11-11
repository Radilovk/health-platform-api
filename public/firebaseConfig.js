// Configuration settings for Firebase authentication on the frontend part
const firebaseConfig = {
  apiKey: "your-api-key-from-firebase",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-firebase-project-id",
  messagingSender: "your@firebaseapp.com",
  appId: "your-app-app-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messender-id",
  authState: true,
  databaseURL: "your-database-url",
  projectId: "your-firebase-project-id-new",
  storageBucket: "your-storage-bucket-new",
  appId: "your-app-app-id-new",
  messagingToken: "YourMessagingToken"
};

firebase.init(firebaseConfig);
module.exports = firebaseConfig;