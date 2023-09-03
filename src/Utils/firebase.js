// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXt2jTs23VPNFUm5ls_8RJL1CbhFLC6DY",
  authDomain: "fb-via-f2430.firebaseapp.com",
  projectId: "fb-via-f2430",
  storageBucket: "fb-via-f2430.appspot.com",
  messagingSenderId: "79987178830",
  appId: "1:79987178830:web:0aa21034e22e1fa54f721f",
  measurementId: "G-MYMMGXG9VR",
  databaseURL:
    "https://fb-via-f2430-default-rtdb.asia-southeast1.firebasedatabase.app",
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
