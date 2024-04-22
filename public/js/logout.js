import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
      import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

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
      const auth = getAuth();

      // Log out event listener
      document.querySelector('.dropdown-item[href="../../index.html"]').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default behavior to ensure custom action is triggered

        signOut(auth)
          .then(() => {
            console.log('User signed out successfully');
            window.location.href = '../../index.html'; // Redirect to login page
          })
          .catch((error) => {
            console.error('Error signing out:', error);
          });
      });