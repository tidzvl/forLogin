// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, set, ref, update, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP_0hKxMychNVPfFeozLAytkurhZ6B8Cg",
authDomain: "ithopital.firebaseapp.com",
databaseURL: "https://ithopital-default-rtdb.firebaseio.com",
projectId: "ithopital",
storageBucket: "ithopital.appspot.com",
messagingSenderId: "513901096082",
appId: "1:513901096082:web:449e1809ecbf7c7d860a4b",
measurementId: "G-WDFCQQ7JX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


login.addEventListener('click', (e) => {
  e.preventDefault(); // Ngăn chặn hành vi mặc định

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-pass').value;

  // Xác thực người dùng
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Lấy vai trò của người dùng
      const userRoleRef = ref(database, `roles/${user.uid}`);
      return get(userRoleRef);
    })
    .then((snapshot) => {
      if (snapshot.exists()) {
        const role = snapshot.val();

        // Chuyển hướng dựa trên vai trò
        switch (role) {
          case 'admin':
            window.location.href = '/dashboards/';
            break;
          case 'doctor':
            window.location.href = '/doctor/profile/';
            break;
          case 'nurse':
            window.location.href = '/dist/yta/';
            break;
          default:
            console.error('Vai trò không xác định');
        }
      } else {
        console.error('Không tìm thấy vai trò');
        alert('Không thể lấy vai trò người dùng.');
      }
    })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin đăng nhập');
  });
});