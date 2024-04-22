import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCP_0hKxMychNVPfFeozLAytkurhZ6B8Cg",
  authDomain: "ithopital.firebaseapp.com",
  databaseURL: "https://ithopital-default-rtdb.firebaseio.com",
  projectId: "ithopital",
  storageBucket: "ithopital.appspot.com",
  messagingSenderId: "513901096082",
  appId: "1:513901096082:web:449e1809ecbf7c7d860a4b",
  measurementId: "G-WDFCQQ7JX7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Lấy UID của người dùng
    const uid = user.uid;
    // Truy vấn tên người dùng từ Firebase Database
    const userRef = ref(database, `users/${uid}/username`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Lấy tên người dùng
          const username = snapshot.val();
          // Hiển thị tên người dùng trên navbar
          document.getElementById(
            "navbar-username"
          ).textContent = `Hello, ${username}`;
          return username;
        } else {
          console.log("No username found for this user.");
        }
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  } else {
    console.log("No user is signed in.");
    window.location.href = "../dashboards/comingsoon.html";
  }
});

