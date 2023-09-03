// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAcc-sG4R6xvGLasASz6-LajTVpz7qOSWU",
  authDomain: "fbvia-d80ab.firebaseapp.com",
  projectId: "fbvia-d80ab",
  storageBucket: "fbvia-d80ab.appspot.com",
  messagingSenderId: "580865326893",
  appId: "1:580865326893:web:42fc7f2f889725d01a1da4",
  databaseURL:
    "https://fbvia-d80ab-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// test;
// const firebaseConfig = {
//   apiKey: "AIzaSyBHY1qkkbjtejpktF5Q0m4KwoaPxsd5fRo",
//   authDomain: "test-database-57ff0.firebaseapp.com",
//   databaseURL:
//     "https://test-database-57ff0-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "test-database-57ff0",
//   storageBucket: "test-database-57ff0.appspot.com",
//   messagingSenderId: "652625426295",
//   appId: "1:652625426295:web:297a53afae010322445372",
//   measurementId: "G-QQ5JCBDFNK",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
export { database };

export default app;
