import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,child,
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
const db = getDatabase(app);

var id_doctor;
var userNamePromise = new Promise(function (resolve, reject) {
  var observer = new MutationObserver(function (mutations, obs) {
    var userNameElement = document.getElementById("navbar-username");
    if (userNameElement && userNameElement.textContent) {
      resolve(userNameElement.textContent);
      obs.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
userNamePromise.then(async function (userName) {
  userName = userName.split(", ")[1];
  console.log(userName);
  const dbRef = ref(db);
  var data = await get(child(dbRef, "Doctor")).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      return snapshot.val().filter((item) => item !== null);
    } else {
      console.log("ID does not exist");
    }
  });
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].username);
    if (data[i] && data[i].username === userName) {
      id_doctor = data[i].id;
      document.getElementById("username").textContent = data[i].firstName;
      document.getElementById("role").textContent = data[i].role;
      document.getElementById("email").textContent = data[i].email;
      document.getElementById("contact").textContent = data[i].contact;
      document.getElementById("special").textContent = data[i].specialist;
      break;
    }
  }
});
