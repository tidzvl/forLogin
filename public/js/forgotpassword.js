import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

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

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    document.getElementById('reset').addEventListener('click', function () {
      const email = document.getElementById('reset-email').value;
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('Yêu cầu thay đổi mật khẩu đã được gửi vào email của bạn!');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    });