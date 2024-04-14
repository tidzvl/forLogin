document.querySelector(".main-window .bar .funct .add-booking").addEventListener("click", () =>{

    document.querySelector(".popup").classList.add("active");
    document.querySelector(".main-window").classList.add("active");
    document.querySelector(".sidebar").classList.add("active");
});


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc,
    Timestamp,
    QuerySnapshot,
    snapshotEqual
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
const db = getDatabase();

// collection ref
const colRefBooking = collection(database, 'booking');
const colRefTreatment = collection(database, 'treatment');

/* DISPLAY BOOKING LIST */
onSnapshot(colRefBooking, (snapshot) => {

    let list = [];
    snapshot.docs.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
    })
    // console.log(list);
    addAllItemToTable(list);
});

var no = 0;
var tbody = document.getElementById('tbody1');

function addItemToTable(id, idd, name, sex, phone, email, appointment) {
    
    var trow = document.createElement('tr');
    var td0 = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');

    td0.value = id;
    td1.innerHTML = no++;
    td2.innerHTML = idd;
    td3.innerHTML = name;
    td4.innerHTML = sex;
    td5.innerHTML = phone;
    td6.innerHTML = email;
    td7.innerHTML = appointment;
 
    trow.appendChild(td0); td0.className = 'hide'; td0.style.display = 'none';
    trow.appendChild(td1); 
    trow.appendChild(td2); td2.className = 'idd';
    trow.appendChild(td3); td3.className = 'name';
    trow.appendChild(td4); td4.className = 'sex';
    trow.appendChild(td5); td5.className = 'phone';
    trow.appendChild(td6); td6.className = 'email';
    trow.appendChild(td7); 

    var controlDiv = document.createElement('div');
    controlDiv.id = 'controlDiv';
    controlDiv.innerHTML = `<button type="button" class="btn-add"><i class='bx bx-add-to-queue'></i></button>`;
    controlDiv.innerHTML += `<button type="button" class="btn-remove"><i class='bx bx-trash'></i></button>`;

    trow.appendChild(controlDiv);
    tbody.appendChild(trow);
}

function addAllItemToTable(bookingList) {

    no = 1;
    tbody.innerHTML = "";
    bookingList.forEach(element => {
        addItemToTable( element.id,
                        element.idd, 
                        element.name, 
                        element.sex, 
                        element.phone, 
                        element.email, 
                        element.appointment);
    });
}
/* END DISPLAY BOOKING LIST */

/* ADD NEW BOOKING */
document.querySelector(".popup .close-btn").addEventListener("click", () =>{

    document.querySelector(".popup").classList.remove("active");
    document.querySelector(".main-window").classList.remove("active");
    document.querySelector(".sidebar").classList.remove("active");
});

const addBooking = document.querySelector('.popup');
addBooking.addEventListener('submit', (e) => {
    
    e.preventDefault();

    addDoc(colRefBooking, {

        name: addBooking.name.value,
        idd: addBooking.id.value,
        appointment: new Date(addBooking.appointment.value).toDateString(),
        sex: addBooking.sex.value,
        email: addBooking.email.value,
        phone: addBooking.phone.value
    })
    .then(() => {

        addBooking.reset();
    });
});
/* END ADD NEW BOOKING */

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

            deleteDoc(doc(database, 'booking', e.target.closest('tr').querySelector('.hide').value));

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

/* ADD TO TREATMENT LIST */
function confirmMove() {

    document.querySelector(".popup-confirm-add").classList.add("active");
    document.querySelector(".main-window").classList.add("active");
    document.querySelector(".sidebar").classList.add("active");
}

document.querySelector(".popup-confirm-add .close-btn").addEventListener("click", () =>{

    document.querySelector(".popup-confirm-add").classList.remove("active");
    document.querySelector(".main-window").classList.remove("active");
    document.querySelector(".sidebar").classList.remove("active");
});

document.addEventListener('click', (e) => {

    if (e.target && (e.target.classList.contains('btn-add') || e.target.classList.contains('bx-add-to-queue'))) {

        confirmMove();

        const form = document.querySelector('.popup-confirm-add');
        const close = form.querySelector('.close-btn');
        const confirm = form.querySelector('.confirm');

        // Fill in form with already available infomation
            // Get information
        const row = e.target.closest('tr');
        var id = row.querySelector('.hide').value;
        var name = row.querySelector('.name').innerHTML;
        var idd = row.querySelector('.idd').innerHTML;
        var sex = row.querySelector('.sex').innerHTML;
        var email = row.querySelector('.email').innerHTML;
        var phone = row.querySelector('.phone').innerHTML;
        
            // Fill in form
        form.querySelector('.name').value = name;
        form.querySelector('.id').value = idd;
        form.querySelector('.sex').value = sex;
        form.querySelector('.email').value = email;
        form.querySelector('.phone').value = phone;

            // Find room
        const data = ref(db, 'Room/');
        let room;
        let index = 1;
        let min;
        onValue(data, (snapshot) => {
            const dt = snapshot.val();
            let list = dt;
            
            min = list[1].count;
            for (let i = 1; i <= list.length - 1; i++) {
                if (list[i].count < min) {
                    min = list[i].count;
                    index = i;
                }
            }
            room = index;
            form.querySelector('.room').value = room;
        });
        
        form.querySelector('.confirm').onclick = function(e) {
            
            e.preventDefault();
            
            addDoc(colRefTreatment, {
        
                name: name,
                idd: idd,
                sex: sex,
                email: email,
                phone: phone,
                healthInsurance: form.healthInsuranced.value,
                room: room,
                admissionDate: new Date(form.admissionDated.value).toDateString()
            })
            .then(() => {
        
                form.reset();
                document.querySelector(".popup-confirm-add").classList.remove("active");
                document.querySelector(".main-window").classList.remove("active");
                document.querySelector(".sidebar").classList.remove("active");
                // Delete from booking list
                const docRef = doc(database, 'booking', id);
                deleteDoc(docRef);
                // Update room
                const data = ref(db, 'Room/' + index);
                set(data, {
                    count: min + 1
                });
            });
        };
    }
});
/* END ADD TO TREATMENT LIST */

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
    else if (category.value == 3) searchTable("phone");
}

/* END SEARCH */