// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove,
  get,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// const db = getDatabase();
// setTimeout(async function () {
//   var id_doctor;
//   var userName = document.getElementById("navbar-username").textContent;
//   const dbRef = ref(db);
//   userName = userName.split(", ")[1];
//   var data = await get(child(dbRef, "Doctor")).then((snapshot) => {
//     if (snapshot.exists()) {
//       // console.log(snapshot.val());
//       return snapshot.val().filter((item) => item !== null);
//     } else {
//       console.log("ID does not exist");
//     }
//   });
//   console.log(data);
//   for (var i = 0; i < data.length; i++) {
//     console.log(data[i].username);
//     if (data[i] && data[i].username === userName) {
//       id_doctor = data[i].id;
//       break;
//     }
//   }
// }, 3000);

async function insertData(id_of_patient) {
  var id_doctor;
  var userName = document.getElementById("navbar-username").textContent;
  const dbRef = ref(db);
  userName = userName.split(", ")[1];
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
      break;
    }
  }
  let id_ = id_of_patient[0];
  const fullname = document.querySelector(`.fullname${id_}`);
  const sex = document.querySelector(`.sex${id_}`);
  const contact = document.querySelector(`.contact${id_}`);
  const bhyt = document.querySelector(`.bhyt${id_}`);
  fetch("/api/treatment")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(async (data) => {
      var idd = null;
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === fullname.textContent) {
          idd = data[i].idd;
          break;
        }
      }

      await get(ref(db, "Doctor/" + id_doctor + "/patientList/")).then(
        async (snapshot) => {
          var a = true;
          for (
            var l = Object.keys(snapshot.val()).length;
            l < Object.keys(snapshot.val()).length + 10;
            l++
          ) {
            await get(
              ref(db, "Doctor/" + id_doctor + "/patientList/" + l)
            ).then(async (snapshot) => {
              if (snapshot.val() == null) {
                await set(
                  ref(db, "Doctor/" + id_doctor + "/patientList/" + l),
                  {
                    idd: idd,
                  }
                )
                  .then(() => {
                    console.log("Add data successfully!");
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
                a = false;
              }
            });
            if (a == false) {
              break;
            }
          }
        }
      );
    });

  // if(td1 && td2 && td3 && td4){
  //     set(ref(db, "Long-term-treatment/" + id_of_patient) ,{
  //         name: td1.innerText,
  //         sex: td2.innerText,
  //         contact: td3.innerText,
  //         bhyt: td4.innerText
  //     })
  //     .then(() => {
  //         console.log('Add data successfully!')
  //     })
  //     .catch(err => {
  //         console.log(err.message)
  //     })
  // }
}
function findData(id_of_patient) {
  const dbRef = ref(db);

  get(child(dbRef, "Patients/" + id_of_patient))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // const treatButton = document.querySelector(`.${id_of_patient}`)
        const doctorFirstName = document.querySelector(".first-name");
        const doctorLastName = document.querySelector(".last-name");
        const doctorDegree = document.querySelector(".degree");
        const doctorNumber = document.querySelector(".number-contact");
        const doctorEmail = document.querySelector(".email-contact");

        doctorFirstName.innerHTML = snapshot.firstName;
        doctorLastName.innerHTML = snapshot.lastName;
        doctorDegree.innerHTML = snapshot.degree;
        doctorNumber.innerHTML = "0909000009";
        doctorEmail.innerHTML = snapshot.email;
      } else {
        console.log("ID does not exist");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function removeData(id_of_patient) {
  console.log(id_of_patient);

  // remove(ref(db, "Doctor/"+id_doctor+"/patientList/" + id_of_patient))
  // .then(() => {
  //     console.log('Remove successfully')
  // })
  // .catch(err => {
  //     console.log(err.message)
  // })
}

function removeDataDoctorlist(id_of_patient) {
  console.log(id_of_patient);
  //chỗ này sai
  let id_ = parseInt(id_of_patient[0]) + 1;
  const fullname = document.querySelector(`.fullname${id_}`);
  fetch("/api/treatment")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      var idd_del = null;
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === fullname.textContent) {
          idd_del = data[i].idd;
          break;
        }
      }
      for (let k = 0; k < data.length; k++) {
        get(ref(db, "Doctor/" + id_doctor + "/patientList/" + k)).then(
          (snapshot) => {
            if (snapshot.val() != null && snapshot.val().idd == idd_del) {
              remove(ref(db, "Doctor/" + id_doctor + "/patientList/" + k))
                .then(() => {
                  console.log("Remove successfully");
                })
                .catch((err) => {
                  console.log(err.message);
                });
              console.log("remove " + k);
              return;
            }
          }
        );
      }
      // remove(ref(db, "Doctor/"+id_doctor+"/patientList/" + id_of_patient))
      // .then(() => {
      //     console.log('Remove successfully')
      // })
      // .catch(err => {
      //     console.log(err.message)
      // })
    });
}

const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", () => {
  if (submitButton.classList.contains(submitButton.classList[1])) {
    insertData(submitButton.classList[1]);
    submitButton.classList.remove(submitButton.classList[1]);
  }
});

const removeButton = document.querySelector(".remove-patient-button");
removeButton.addEventListener("click", () => {
  console.log(removeButton.classList[1]);
  if (removeButton.classList.contains(removeButton.classList[1])) {
    removeDataDoctorlist(removeButton.classList[1]);
    removeButton.classList.remove(removeButton.classList[1]);
    // location.reload()
  }
});

const myProfile = document.querySelector(".my-Profile");
myProfile.addEventListener("click", () => {
  // findData('0')
});
