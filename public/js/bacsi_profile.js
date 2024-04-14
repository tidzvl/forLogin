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
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const db = getDatabase();

function insertData(id_of_patient) {
  let id_ = id_of_patient[0];
  const fullname = document.querySelector(`.fullname${id_}`);
  const sex = document.querySelector(`.sex${id_}`);
  const contact = document.querySelector(`.contact${id_}`);
  const bhyt = document.querySelector(`.bhyt${id_}`);

  set(ref(db, "Long-term-treatment/" + id_of_patient), {
    name: fullname.innerHTML,
    sex: sex.innerHTML,
    contact: contact.innerHTML,
    bhyt: bhyt.innerHTML,
  })
    .then(() => {
      console.log("Add data successfully!");
    })
    .catch((err) => {
      console.log(err.message);
    });
}
function findData(id_of_patient) {
  const dbRef = ref(db);

  get(child(dbRef, "Doctor/" + id_of_patient))
    .then((snapshot) => {
      console.log(snapshot.val());
      if (snapshot.exists()) {
        // const treatButton = document.querySelector(`.${id_of_patient}`)
        const doctorFirstName = document.querySelector(".name-content");
        const doctorLastName = document.querySelector(".last-name");
        const doctorDegree = document.querySelector(".degree");
        const doctorNumber = document.querySelector(".number-contact");
        const doctorEmail = document.querySelector(".email-contact");

        doctorFirstName.innerHTML = snapshot.val().firstName;
        doctorLastName.innerHTML = snapshot.val().lastName;
        doctorDegree.innerHTML = snapshot.val().degree;
        doctorNumber.innerHTML = "0909000009";
        doctorEmail.innerHTML = snapshot.val().email;
      } else {
        console.log("ID does not exist");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
function findPatientData(id_of_patient) {
  const dbRef1 = ref(db, `Doctor/${id_of_patient}`);
  get(child(dbRef1, "patientList/" + id_of_patient))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const patient = document.querySelector(".patients1");
        patient.innerHTML = snapshot.val().name;
      } else {
        console.log("no");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  // get(child(dbRef, "Doctor/" + id_of_patient))
  // .then((snapshot) => {
  //     if(snapshot.exists()){
  //         console.log("yes")

  //     }else{
  //         console.log("id not exist")
  //     }
  // })
  // .catch(err => {
  //     console.log(err.message)
  // })
}
function removeData(id_of_patient) {
  remove(ref(db, "booking/" + id_of_patient))
    .then(() => {
      console.log("Remove successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function renderWorkTime(id_of_doctor) {
  const dbRef = ref(db);
  let workTime;
  get(child(dbRef, "Doctor/" + id_of_doctor))
    .then((snapshot) => {
      if (snapshot.exists()) {
        workTime = snapshot.val().workTime || [];
        for (let index = 0; index < workTime.length; index++) {
          const element = workTime[index];
          var acti =
            '<li class="timeline-item timeline-item-transparent">' +
            '<span class="timeline-point timeline-point-primary"></span>' +
            '<div class="timeline-event">' +
            '<div class="timeline-header mb-1">' +
            '<h6 class="mb-0">' +
            element["DoW:"] +
            "</h6>" +
            '<small class="text-muted">' +
            Math.floor(
              (new Date("2024-04-14 " + element.endTime) -
                new Date("2024-04-14 " + element.startTime)) /
                (1000 * 60 * 60)
            ) +
            " tiếng " +
            Math.floor(
              ((new Date("2024-04-14 " + element.endTime) -
                new Date("2024-04-14 " + element.startTime)) %
                (1000 * 60 * 60)) /
                (1000 * 60)
            ) +
            " phút." +
            "</small>" +
            "</div>" +
            '<p class="mb-2">' +
            element.startTime +
            "-" +
            element.endTime +
            "</p>" +
            '<div class="d-flex">' +
            '<a href="javascript:void(0)" class="me-3">' +
            "</a>" +
            "</div>" +
            "</div>" +
            "</li>";
          document.getElementById("timeline_activity").innerHTML += acti;
        }
      } else {
        console.log("ID does not exist");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function findPatientList(id_of_doctor) {
  const dbRef = ref(db);
  get(child(dbRef, "Doctor/" + id_of_doctor))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val().patientList);
      } else {
        console.log("ID does not exist");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

$(function () {
  "use strict";
  function renderInfo(id_of_doctor, callback) {
    const dbRef = ref(db);
    get(child(dbRef, "Doctor/" + id_of_doctor))
      .then((snapshot) => {
        console.log(snapshot.val());
        if (snapshot.exists()) {
          document.getElementById("count").textContent = snapshot.val()
            .patientList
            ? snapshot.val().patientList.length
            : "";
          document.getElementById("name").textContent =
            snapshot.val().firstName || "";
          document.getElementById("fullname").textContent =
            (snapshot.val().lastName || "") +
            " " +
            (snapshot.val().firstName || "");
          document.getElementById("email").textContent =
            snapshot.val().email || "";
          document.getElementById("degree").textContent =
            snapshot.val().degree || "";
          document.getElementById("role").textContent =
            snapshot.val().role || "";
          document.getElementById("year").textContent =
            snapshot.val().graduationYear || "";
          document.getElementById("contact").textContent =
            snapshot.val().contact || "";
          document.getElementById("chuyen_khoa").textContent =
            snapshot.val().specialist || "";
          document.getElementById("dep").textContent =
            snapshot.val().department || "";
          const patientl = snapshot.val().patientList || [];
          callback(patientl);
        } else {
          console.log("ID does not exist");
          callback([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  let benhnhan;
  let benhnhan_full;
  fetch("/api/treatment")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let patient_of_doctor;
      benhnhan_full = data;
      benhnhan = data.map((item) => item.name);
      let filteredItems;
      renderInfo("8", function (patient_list) {
        renderWorkTime("8");
        console.log(benhnhan_full);
        console.log(patient_list);
        filteredItems = benhnhan_full.filter((item1) => {
          return patient_list.some((item2) => item1.name === item2.name);
        });
        console.log(filteredItems);
        // Variable declaration for table
        var dt_project_table = $(".datatable-project"),
          dt_invoice_table = $(".datatable-invoice");

        // Project datatable
        // --------------------------------------------------------------------
        if (dt_project_table.length) {
          var dt_project = dt_project_table.DataTable({
            data: filteredItems, // JSON file to add data
            columns: [
              // columns according to JSON
              { data: "name" },
              { data: "healthInsurance" },
              { data: "phone" },
              { data: "room" },
            ],
            displayLength: 7,
            lengthMenu: [7, 10, 25, 50, 75, 100],
            language: {
              sLengthMenu: "Show _MENU_",
              // search: '',
              searchPlaceholder: "Search Patient",
            },
            // For responsive popup
            responsive: {
              details: {
                display: $.fn.dataTable.Responsive.display.modal({
                  header: function (row) {
                    var data = row.data();
                    return "Details of " + data["full_name"];
                  },
                }),
                type: "column",
                renderer: function (api, rowIdx, columns) {
                  var data = $.map(columns, function (col, i) {
                    return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                      ? '<tr data-dt-row="' +
                          col.rowIndex +
                          '" data-dt-column="' +
                          col.columnIndex +
                          '">' +
                          "<td>" +
                          col.title +
                          ":" +
                          "</td> " +
                          "<td>" +
                          col.data +
                          "</td>" +
                          "</tr>"
                      : "";
                  }).join("");

                  return data
                    ? $('<table class="table"/><tbody />').append(data)
                    : false;
                },
              },
            },
          });
        }
        // On each datatable draw, initialize tooltip
        dt_invoice_table.on("draw.dt", function () {
          var tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
          );
          var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
              boundary: document.body,
            });
          });
        });
      }).catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    });
  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $(".dataTables_filter .form-control").removeClass("form-control-sm");
    $(".dataTables_length .form-select").removeClass("form-select-sm");
  }, 300);
});

// findPatientList("0")

// findData("0")
// findPatientData("0")
// const myProfile = document.querySelector('.self-profile')
// myProfile.addEventListener('click', () => {
//     location.href='../../doctor/profile/bacsi_profile.html'
// })
