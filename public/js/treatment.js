// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc,
    Timestamp,
    QuerySnapshot,
    updateDoc
} from 'firebase/firestore'
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

// Initialize service
const database = getFirestore();

// collection ref
const colRefTreatment = collection(database, 'treatment');

/* DISPLAY BOOKING LIST */
onSnapshot(colRefTreatment, (snapshot) => {

    let list = [];
    snapshot.docs.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
    })
    // console.log(list);
    addAllItemToTable(list);
});

var no = 0;
var tbody = document.getElementById('tbody1');

function addItemToTable(id, idd, name, sex, healthInsurance, admissionDate, room, precription) {
    
    var trow = document.createElement('tr');
    var td0 = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    var td8 = document.createElement('td');

    td0.value = id;
    td1.innerHTML = no++;
    td2.innerHTML = idd;
    td3.innerHTML = name;
    td4.innerHTML = sex;
    td5.innerHTML = healthInsurance;
    td6.innerHTML = admissionDate;
    td7.innerHTML = room;
    td8.innerHTML = precription;

    
    trow.appendChild(td0); td0.className = 'hide'; td0.style.display = 'none';
    trow.appendChild(td1); 
    trow.appendChild(td2); td2.className = 'idd';
    trow.appendChild(td3); td3.className = 'name';
    trow.appendChild(td4); td4.className = 'sex';
    trow.appendChild(td5); td5.className = 'health-insurance';
    trow.appendChild(td6); td6.className = 'addmision-date';
    trow.appendChild(td7); td7.className = 'room';
    trow.appendChild(td8); td8.className = 'precription';

    var controlDiv = document.createElement('div');
    controlDiv.id = 'controlDiv';
    controlDiv.innerHTML = `<button type="button" class="btn-remove"><i class='bx bx-trash' ></i></button>`;
    controlDiv.innerHTML += `<button type="button" class="btn-modify"><i class='bx bx-edit' ></i></button>`;

    trow.appendChild(controlDiv);
    tbody.appendChild(trow);
}

function addAllItemToTable(treatmentList) {
    no = 1;
    tbody.innerHTML = "";
    treatmentList.forEach(element => {
        addItemToTable( element.id,
                        element.idd, 
                        element.name, 
                        element.sex, 
                        element.healthInsurance, 
                        element.admissionDate, 
                        element.room,
                        element.precription);
    });
}
/* END DISPLAY BOOKING LIST */

/* REMOVE FROM LIST */  
function confirmRemove() {
    document.querySelector(".popup-confirm-remove").classList.add("active");
    document.querySelector(".main-window").classList.add("active");
    document.querySelector(".sidebar").classList.add("active");
}

document.querySelector(".popup-confirm-remove .close").addEventListener("click", () =>{
    document.querySelector(".popup-confirm-remove").classList.remove("active");
    document.querySelector(".main-window").classList.remove("active");
    document.querySelector(".sidebar").classList.remove("active");
});
document.addEventListener('click', (e) => {
    if (e.target && (e.target.classList.contains('btn-remove') || e.target.classList.contains('bx-trash'))) {

        confirmRemove();

        const confirm = document.querySelector(".submit");
        const close = document.querySelector(".close");

        confirm.onclick = function() {
            
            deleteDoc(doc(database, 'treatment', e.target.closest('tr').querySelector('.hide').value));

            // close confirm
            document.querySelector(".popup-confirm-remove").classList.remove("active");
            document.querySelector(".main-window").classList.remove("active");
            document.querySelector(".sidebar").classList.remove("active");
        }

        close.onclick = function() {
            document.querySelector(".popup-confirm-remove").classList.remove("active");
            document.querySelector(".main-window").classList.remove("active");
            document.querySelector(".sidebar").classList.remove("active");
        }
    }
});
/* END REMOVE FROM LIST */

/* MODIFY */
function openModify() {

    document.querySelector(".modify").classList.add("active");
    document.querySelector(".main-window").classList.add("active");
    document.querySelector(".sidebar").classList.add("active");
}

document.querySelector(".modify .close-btn").addEventListener("click", () =>{
    
    document.querySelector(".modify").classList.remove("active");
    document.querySelector(".main-window").classList.remove("active");
    document.querySelector(".sidebar").classList.remove("active");
});

document.addEventListener('click', (e) => {
    if (e.target && (e.target.classList.contains('btn-modify') || e.target.classList.contains('bx-edit'))) {
        
        openModify();

        const form = document.querySelector('.modify');

        // Get information
        const row = e.target.closest('tr');
        var id = row.querySelector('.hide').value;
        var name = row.querySelector('.name').innerHTML;
        var idd = row.querySelector('.idd').innerHTML;
        var sex = row.querySelector('.sex').innerHTML;
        var admisionDate = row.querySelector('.addmision-date').innerHTML;
        var healthInsurance = row.querySelector('.health-insurance').innerHTML;
        var room = row.querySelector('.room').innerHTML;

        form.querySelector('.name').value = name;
        form.querySelector('.id').value = idd;
        form.querySelector('.sex').value = sex;
        form.querySelector('.healthInsurance').value = healthInsurance;
        form.querySelector('.room').value = room;

        const parts = admisionDate.split(" ");
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames.indexOf(parts[1]);
        const day = parseInt(parts[2]);
        const year = parseInt(parts[3]);
        const date = new Date(year, month, day + 1).toISOString().split("T")[0];
        console.log(date);
        form.querySelector('.admissionDate').value = date;

        // Modify
        form.addEventListener('submit', (e) => {

            e.preventDefault();

            const docRef = doc(database, 'treatment', id);
            updateDoc(docRef, {
                name: form.querySelector('.name').value,
                idd: form.querySelector('.id').value,
                sex: form.querySelector('.sex').value,
                healthInsurance: form.querySelector('.healthInsurance').value,
                room: form.querySelector('.room').value = room,
                admissionDate: new Date(form.admissionDated.value).toDateString()
            })
            .then(() => {
                form.reset();
            });
        });
    }
});
/* END MODIFY */

/* SEARCH */
var searchBar = document.getElementById("searchBar");
var searchBtn = document.getElementById("searchButton");
var category = document.getElementById("categorySelected");
var tbody = document.getElementById("tbody1");

function searchTable(Category) {

    var filter = searchBar.value.toUpperCase();
    var tr = tbody.getElementsByTagName("tr");
    var found;

    for (let i = 0; i < tr.length; i++) {

        var td = tr[i].getElementsByClassName(Category);

        for (let j = 0; j < td.length; j++) {
            
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }

        if (found) {
            tr[i].style.display = "table-row";
            found = false;
        }
        else {
            tr[i].style.display = "none";
        }
    }
}

searchBtn.onclick = function() {

    if (searchBar.value == "") searchTable("idd");
    else if (category.value == 1) searchTable("idd");
    else if (category.value == 2) searchTable("name");
}

/* END SEARCH */