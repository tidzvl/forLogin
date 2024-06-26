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

import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const db = getDatabase();


let i = 0;
let initialList = [];
function getAllPatients(myPatientList) {
  if (i === 0) {
    let j,
      k = 0;
    const pageNumber = document.querySelector(".page-number");
    pageNumber.innerHTML = i + 1;
    j = i * 5;
    while (j < 5 * (i + 1) && j < myPatientList.length && k < 5) {
      const fullname = document.querySelector(`.fullname${k + 1}`);
      const sex = document.querySelector(`.sex${k + 1}`);
      const contact = document.querySelector(`.contact${k + 1}`);
      const bhyt = document.querySelector(`.bhyt${k + 1}`);
      const longTerm = document.querySelector(`.treat-button${k + 1}`);
      const info = document.querySelector(`.info-button${k + 1}`);

      if(initialList.length === 0 || j >= initialList.length){
        fullname.innerHTML = "";
        sex.innerHTML = "";
        contact.innerHTML = "";
        bhyt.innerHTML = "";
        longTerm.innerHTML = "";
        info.innerHTML = "";
      }else{
        fullname.innerHTML = initialList[j].name;
        sex.innerHTML = initialList[j].sex;
        contact.innerHTML = initialList[j].phone;
        bhyt.innerHTML = initialList[j].healthInsurance;    

        longTerm.innerHTML = `<td class="long-term-content">
          <button id="${k+1}" class="treat-button${k+1}">Treat</button>
          </td>`
          info.innerHTML = `<td class="info-button-content">
          <button id="${k+1}" class="info-button${k+1}">Info</button>
          </td>`
      }
      ++j;
      ++k;
    }

    for (let l = 1; l <= 5; l++) {
      let infoButton = document.querySelector(`.info-button${l}`);
      infoButton.addEventListener("click", () => {
        const id_of_patient = infoButton.id - 1 + 5 * i;        
        const infoContainer = document.querySelector(".pop-up-container");
        const layout = document.querySelector(".layout-browser");
        const patientList = document.querySelector(".patients-list");
        if (infoContainer.classList.contains("show-up0")) {
          infoContainer.classList.remove("show-up0");
        }
        if (layout.classList.contains("active10")) {
          layout.classList.remove("active10");
        }
        infoContainer.classList.add("show-up");
        layout.classList.add("active1");
        patientList.classList.add("active2");

        let myOutput = `<h3>Information of Patient</h3>`;
        let myOutput1 = "";

        myOutput1 += `
                    <div class="self-information-container">
                    <div class="header-information">Thong tin ca nhan</div>
                    <div class="header-container">Name</div>
                    <div class="information-content">${myPatientList[id_of_patient].name}</div>
                    <div class="header-container">CCCD</div>
                    <div class="information-content">${myPatientList[id_of_patient].idd}</div>
                    <div class="header-container">Giới tính</div>
                    <div class="information-content">${myPatientList[id_of_patient].sex}</div>
                    <div class="header-container">Room</div>
                    <div class="information-content">${myPatientList[id_of_patient].room}</div>
                    </div>
                    <div class="contact-information-container">
                        <div class="header-information">Thong tin lien lac</div>
                        <div class="header-container">Phone number</div>
                        <div class="information-content">${myPatientList[id_of_patient].phone}</div>
                    </div>
                    <div class="treat-information-container">
                        <div class="header-information">Thong tin kham benh</div>
                        <div class="information-content">${myPatientList[id_of_patient].info}</div>
                    </div>`;
        let res = myOutput + myOutput1;
        infoContainer.innerHTML = res;
      });
    }

    for (let l = 1; l <= 5; l++) {
      let treatButton = document.querySelector(`.treat-button${l}`);
      treatButton.addEventListener("click", () => {
        let id_of_patient = `${treatButton.id}-${i}`;
        const treat = document.querySelector(".submit-button");
        if (treat.classList.contains(treat.classList[1])) {
          treat.classList.remove(treat.classList[1]);
        }
        treat.classList.add(id_of_patient);

        const longTerm = document.querySelector(".long-term-container");
        const layout = document.querySelector(".layout-browser");
        const patientList = document.querySelector(".patients-list");
        if (longTerm.classList.contains("active0")) {
          longTerm.classList.remove("active0");
        }
        if (layout.classList.contains("active10")) {
          layout.classList.remove("active10");
        }
        longTerm.classList.add("active");
        layout.classList.add("active1");
        patientList.classList.add("active2");
      });
    }    
  }
}

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
  var id_doctor;
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
      break;
    }
  }
  console.log(id_doctor);
  let benhnhan_full;
  fetch("/api/treatment")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      initialList = data;
      getAllPatients(initialList);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

const nextButton = document.querySelector(".next-button");
const previousButton = document.querySelector(".previous-button");

previousButton.addEventListener("click", () => {
  let j  
  i--
  if (i <= 0) {
    i = 0
  }    
  const pageNumber = document.getElementById("page-number");

  pageNumber.innerHTML = i + 1;
  j = i * 5;
  let k = 0
  for(let f = j; f < 5 *(i + 1); f++){
    const fullname = document.querySelector(`.fullname${k + 1}`);
    const sex = document.querySelector(`.sex${k + 1}`);
    const contact = document.querySelector(`.contact${k + 1}`);
    const bhyt = document.querySelector(`.bhyt${k + 1}`);
    const longTerm = document.querySelector(`.treat-button${k + 1}`);
    const info = document.querySelector(`.info-button${k + 1}`);
    
    if(initialList.length === 0 || f >= initialList.length){
      fullname.innerHTML = "";
      sex.innerHTML = "";
      contact.innerHTML = "";
      bhyt.innerHTML = "";
      longTerm.innerHTML = "";
      info.innerHTML = "";
    }else{
      fullname.innerHTML = initialList[f].name;
      sex.innerHTML = initialList[f].sex;
      contact.innerHTML = initialList[f].phone;
      bhyt.innerHTML = initialList[f].healthInsurance;    

      longTerm.innerHTML = `<td class="long-term-content">
        <button id="${k+1}" class="treat-button${k+1}">Treat</button>
        </td>`
        info.innerHTML = `<td class="info-button-content">
        <button id="${k+1}" class="info-button${k+1}">Info</button>
        </td>`
    }    
    k++;
  }  

  for (let l = 1; l <= 5; l++) {
    let infoButton = document.querySelector(`.info-button${l}`);
    infoButton.addEventListener("click", () => {
      const id_of_patient = infoButton.id - 1 + 5 * i;
      console.log(infoButton.id);
      const infoContainer = document.querySelector(".pop-up-container");
      const layout = document.querySelector(".layout-browser");
      const patientList = document.querySelector(".patients-list");
      if (infoContainer.classList.contains("show-up0")) {
        infoContainer.classList.remove("show-up0");
      }
      if (layout.classList.contains("active10")) {
        layout.classList.remove("active10");
      }
      infoContainer.classList.add("show-up");
      layout.classList.add("active1");
      patientList.classList.add("active2");

      let myOutput = `<h3>Information of Patient</h3>`;
      let myOutput1 = "";

      myOutput1 += `
            <div class="self-information-container">
                    <div class="header-information">Thong tin ca nhan</div>
                    <div class="header-container">Name</div>
                    <div class="information-content">${initialList[id_of_patient].name}</div>
                    <div class="header-container">CCCD</div>
                    <div class="information-content">${initialList[id_of_patient].idd}</div>
                    <div class="header-container">Giới tính</div>
                    <div class="information-content">${initialList[id_of_patient].sex}</div>
                    <div class="header-container">Room</div>
                    <div class="information-content">${initialList[id_of_patient].room}</div>
                    </div>
                    <div class="contact-information-container">
                        <div class="header-information">Thong tin lien lac</div>
                        <div class="header-container">Phone number</div>
                        <div class="information-content">${initialList[id_of_patient].phone}</div>
                    </div>
                    <div class="treat-information-container">
                        <div class="header-information">Thong tin kham benh</div>
                        <div class="information-content">${initialList[id_of_patient].info}</div>
                    </div>`;
      let res = myOutput + myOutput1;
      infoContainer.innerHTML = res;
    });
  }

  for (let l = 1; l <= 5; l++) {
    let treatButton = document.querySelector(`.treat-button${l}`);
    treatButton.addEventListener("click", () => {
      let id_of_patient = `${treatButton.id}-${i}`;
      const treat = document.querySelector(".submit-button");
      if (treat.classList.contains(treat.classList[1])) {
        treat.classList.remove(treat.classList[1]);
      }
      treat.classList.add(id_of_patient);

      const longTerm = document.querySelector(".long-term-container");
      const layout = document.querySelector(".layout-browser");
      const patientList = document.querySelector(".patients-list");
      if (longTerm.classList.contains("active0")) {
        longTerm.classList.remove("active0");
      }
      if (layout.classList.contains("active10")) {
        layout.classList.remove("active10");
      }
      longTerm.classList.add("active");
      layout.classList.add("active1");
      patientList.classList.add("active2");
    });
  }

  for (let l = 1; l <= 5; l++) {
    let removeButton = document.querySelector(`.remove-button${l}`);
    removeButton.addEventListener("click", () => {
      let id_of_patient = `${removeButton.id}-${i}`;
      const removePatient = document.querySelector(".remove-patient-button");
      if (removePatient.classList.contains(removePatient.classList[1])) {
        removePatient.classList.remove(removePatient.classList[1]);
      }
      removePatient.classList.add(id_of_patient);

      const remove = document.querySelector(".remove-patient-container");
      const layout = document.querySelector(".layout-browser");
      const patientList = document.querySelector(".patients-list");
      if (remove.classList.contains("active0")) {
        remove.classList.remove("active0");
      }
      if (layout.classList.contains("active10")) {
        layout.classList.remove("active10");
      }
      remove.classList.add("active");
      layout.classList.add("active1");
      patientList.classList.add("active2");
    });
  }
});

nextButton.addEventListener("click", () => {
  let j,
    k = 0;
  i++;
  j = i * 5;
  if (j >= initialList.length) {
    j = initialList.length - 1;
    i--;
    return;
  }
  const pageNumber = document.getElementById("page-number");
  pageNumber.innerHTML = i + 1;
  while (j < 5 * (i + 1) && k < 5) {
    const fullname = document.querySelector(`.fullname${k + 1}`);
    const sex = document.querySelector(`.sex${k + 1}`);
    const contact = document.querySelector(`.contact${k + 1}`);
    const bhyt = document.querySelector(`.bhyt${k + 1}`);
    const longTerm = document.querySelector(`.treat-button${k + 1}`);
    const info = document.querySelector(`.info-button${k + 1}`);
    const remove = document.querySelector(`.remove-button${k + 1}`);
    if (initialList.length === 0 || j >= initialList.length) {
      
      fullname.innerHTML = "";
      sex.innerHTML = "";
      contact.innerHTML = "";
      bhyt.innerHTML = "";
      longTerm.innerHTML = "";
      info.innerHTML = "";
      remove.innerHTML = "";
    } else {
      fullname.innerHTML = initialList[j].name;
      sex.innerHTML = initialList[j].sex;
      contact.innerHTML = initialList[j].phone;
      bhyt.innerHTML = initialList[j].healthInsurance;

      longTerm.innerHTML = `<td class="long-term-content">
        <button id="${k+1}" class="treat-button${k+1}">Treat</button>
        </td>`
        info.innerHTML = `<td class="info-button-content">
        <button id="${k+1}" class="info-button${k+1}">Info</button>
        </td>`
    }
    j++;
    ++k;
  }

  for (let l = 1; l <= 5; l++) {
    let infoButton = document.querySelector(`.info-button${l}`);
    infoButton.addEventListener("click", () => {
      const id_of_patient = infoButton.id - 1 + 5 * i;
      console.log(infoButton.id);
      const infoContainer = document.querySelector(".pop-up-container");
      const layout = document.querySelector(".layout-browser");
      const patientList = document.querySelector(".patients-list");
      if (infoContainer.classList.contains("show-up0")) {
        infoContainer.classList.remove("show-up0");
      }
      if (layout.classList.contains("active10")) {
        layout.classList.remove("active10");
      }
      infoContainer.classList.add("show-up");
      layout.classList.add("active1");
      patientList.classList.add("active2");

      let myOutput = `<h3>Information of Patient</h3>`;
      let myOutput1 = "";

      myOutput1 += `
            <div class="self-information-container">
                    <div class="header-information">Thong tin ca nhan</div>
                    <div class="header-container">Name</div>
                    <div class="information-content">${initialList[id_of_patient].name}</div>
                    <div class="header-container">CCCD</div>
                    <div class="information-content">${initialList[id_of_patient].idd}</div>
                    <div class="header-container">Giới tính</div>
                    <div class="information-content">${initialList[id_of_patient].sex}</div>
                    <div class="header-container">Room</div>
                    <div class="information-content">${initialList[id_of_patient].room}</div>
                    </div>
                    <div class="contact-information-container">
                        <div class="header-information">Thong tin lien lac</div>
                        <div class="header-container">Phone number</div>
                        <div class="information-content">${initialList[id_of_patient].phone}</div>
                    </div>
                    <div class="treat-information-container">
                        <div class="header-information">Thong tin kham benh</div>
                        <div class="information-content">${initialList[id_of_patient].info}</div>
                    </div>`;
      let res = myOutput + myOutput1;
      infoContainer.innerHTML = res;
    });
  }

  for (let l = 1; l <= 5; l++) {
    let treatButton = document.querySelector(`.treat-button${l}`);
    treatButton.addEventListener("click", () => {
      let id_of_patient = `${treatButton.id}-${i}`;
      const treat = document.querySelector(".submit-button");
      if (treat.classList.contains(treat.classList[1])) {
        treat.classList.remove(treat.classList[1]);
      }
      treat.classList.add(id_of_patient);

      const longTerm = document.querySelector(".long-term-container");
      const layout = document.querySelector(".layout-browser");
      const patientList = document.querySelector(".patients-list");
      if (longTerm.classList.contains("active0")) {
        longTerm.classList.remove("active0");
      }
      if (layout.classList.contains("active10")) {
        layout.classList.remove("active10");
      }
      longTerm.classList.add("active");
      layout.classList.add("active1");
      patientList.classList.add("active2");
    });
  }

  // for (let l = 1; l <= 5; l++) {
  //   let removeButton = document.querySelector(`.remove-button${l}`);
  //   removeButton.addEventListener("click", () => {
  //     let id_of_patient = `${removeButton.id}-${i}`;
  //     const removePatient = document.querySelector(".remove-patient-button");
  //     if (removePatient.classList.contains(removePatient.classList[1])) {
  //       removePatient.classList.remove(removePatient.classList[1]);
  //     }
  //     removePatient.classList.add(id_of_patient);

  //     const remove = document.querySelector(".remove-patient-container");
  //     const layout = document.querySelector(".layout-browser");
  //     const patientList = document.querySelector(".patients-list");
  //     if (remove.classList.contains("active0")) {
  //       remove.classList.remove("active0");
  //     }
  //     if (layout.classList.contains("active10")) {
  //       layout.classList.remove("active10");
  //     }
  //     remove.classList.add("active");
  //     layout.classList.add("active1");
  //     patientList.classList.add("active2");
  //   });
  // }
});

function treatButton(id_of_patient) {
  const longTerm = document.querySelector(".long-term-container");
  const layout = document.querySelector(".layout-browser");
  const patientList = document.querySelector(".patients-list");
  if (longTerm.classList.contains("active0")) {
    longTerm.classList.remove("active0");
  }
  if (layout.classList.contains("active10")) {
    layout.classList.remove("active10");
  }
  longTerm.classList.add("active");
  layout.classList.add("active1");
  patientList.classList.add("active2");

  const treatButton = document.querySelector(".submit-button");
  treatButton.classList.add(`${id_of_patient}`);
}

const layout = document.querySelector(".layout-browser");
layout.addEventListener("click", () => {
  const infoContainer = document.querySelector(".pop-up-container");
  const longTerm = document.querySelector(".long-term-container");
  const removePatient = document.querySelector(".remove-patient-container");
  const patientList = document.querySelector(".patients-list");
  if (longTerm.classList.contains("active")) {
    longTerm.classList.remove("active");
    longTerm.classList.add("active0");
    if (layout.classList.contains("active1")) {
      layout.classList.remove("active1");
      layout.classList.add("active10");
    }
    if (patientList.classList.contains("active2")) {
      patientList.classList.remove("active2");
    }
  }
  if (removePatient.classList.contains("active")) {
    removePatient.classList.remove("active");
    removePatient.classList.add("active0");
    if (layout.classList.contains("active1")) {
      layout.classList.remove("active1");
      layout.classList.add("active10");
    }
    if (patientList.classList.contains("active2")) {
      patientList.classList.remove("active2");
    }
  }
  if (infoContainer.classList.contains("show-up")) {
    infoContainer.classList.remove("show-up");
    infoContainer.classList.add("show-up0");
    if (layout.classList.contains("active1")) {
      layout.classList.remove("active1");
      layout.classList.add("active10");
    }
    if (patientList.classList.contains("active2")) {
      patientList.classList.remove("active2");
    }
  }
  const treat = document.querySelector(".submit-button");
  if (treat.classList.contains(treat.classList[1])) {
    treat.classList.remove(treat.classList[1]);
  }
});

function removePatient(id_of_patient) {
  const removePatient = document.querySelector(".remove-patient-container");
  const layout = document.querySelector(".layout-browser");
  const patientList = document.querySelector(".patients-list");
  if (removePatient.classList.contains("active0")) {
    removePatient.classList.remove("active0");
  }
  if (layout.classList.contains("active10")) {
    layout.classList.remove("active10");
  }
  removePatient.classList.add("active");
  layout.classList.add("active1");
  patientList.classList.add("active2");

  const removeButton = document.querySelector(".remove-patient-button");
  removeButton.classList.add(`${id_of_patient}`);
}

const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", () => {
  const longTerm = document.querySelector(".long-term-container");
  const layoutBrowser = document.querySelector(".layout-browser");
  const patientList = document.querySelector(".patients-list");
  if (longTerm.classList.contains("active")) {
    longTerm.classList.remove("active");
    longTerm.classList.add("active0");
    if (layoutBrowser.classList.contains("active1")) {
      layoutBrowser.classList.remove("active1");
      layoutBrowser.classList.add("active10");
    }
    if (patientList.classList.contains("active2")) {
      patientList.classList.remove("active2");
    }
  }
});

// function removePatient(){
//     const removeButton = document.querySelector('.remove-patient-button')
//     removeButton.addEventListener('click', () => {
//         const remove = document.querySelector('.remove-patient-container')
//         const layoutBrowser = document.querySelector('.layout-browser')
//         const patientList = document.querySelector('.patients-list')
//         if(remove.classList.contains('active')){
//             remove.classList.remove('active')
//             remove.classList.add('active0')
//             if(layoutBrowser.classList.contains('active1')){
//                 layoutBrowser.classList.remove('active1')
//                 layoutBrowser.classList.add('active10')
//             }
//             if(patientList.classList.contains('active2')){
//                 patientList.classList.remove('active2')
//             }
//         }
//     })
// }
