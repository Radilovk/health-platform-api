// Firebase configuration for user-side integration
export const firebaseConfig = {
  apiKey: "FAKE_API_KEY",
  authDomain: "fake-project.firebaseapp.com",
  projectId: "fake-project",
  storageBucket: "fake-project.appspot.com",
  messagingEnd:FAKE_MESS_END",
  appId: "fake://fake-project"
};

// Initialize Firebase app with config
if ((function() {
  firebase.init(firebaseConfig);
})();