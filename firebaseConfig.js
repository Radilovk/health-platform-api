// Configuration for Firebase Authentication
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_FIREBASE_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageCurrentId: "YOUR_STORAGE_QUID",
  messagingSender: "YOUR_MESSAGING_SENDER",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.init(firebaseConfig);

export default firebaseConfig;