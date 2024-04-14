document.querySelector('.invoice-btn').onclick = function(){
    print();
}

document.querySelector(".invoice-wrapper .close-btn").addEventListener("click", () =>{


    document.querySelector(".invoice-wrapper").classList.remove("active");
    document.querySelector(".main-window").classList.remove("active");
    document.querySelector(".sidebar").classList.remove("active");
});

function PrintBill() {
    document.querySelector(".invoice-wrapper").classList.add("active");
    document.querySelector(".main-window").classList.add("active");
    document.querySelector(".sidebar").classList.add("active");
};

Window.onload = function() {
    document.getElementById("download")
    .addEventListener("click", () => {
        const invoice = this.document.getElementById("print-area");
        html2pdf().from(invoice).save();
    })
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
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
const colRefBill = collection(database, 'bill');

// fetch(`https://console.firebase.google.com/project/ithopital/firestore/databases/-default-/data/~2Fbill~2FDa171297399574.json`) 
//     .then(function(response) {
//         return response.json();
//     })
//     .then (function(data) {
//         let placeholder = document.querySelector("#table-body");
//         let out = "";
//         for (let product of data) {
//             out += `
//             <tr>
//                 <td>${product.bhyt}</td>
//                 <td>${product.med_name}</td>
//                 <td>${product.price}</td>
//                 <td></td>
//                 <td></td>
//             </tr>
//         `;
//         }

//         placeholder.innerHTML = out;
//     });

/* DISPLAY BILL LIST */
onSnapshot(colRefBill, (snapshot) => {

    let billList = [];
    snapshot.docs.forEach((doc) => {
        billList.push({ ...doc.data(), id: doc.id });
    })
    // console.log(billList);
    addAllItemToTable(billList);
});

var no = 0;
var tbody = document.getElementById('tbody1');

function addItemToTable(bhyt, name, phone, id, status) {
    
    var trow = document.createElement('tr');
    var td0 = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');

    td0.innerHTML = no++;
    td1.innerHTML = bhyt;
    td2.innerHTML = name;
    td3.innerHTML = phone;
    td4.innerHTML = id;
    if (status) {
        td5.innerHTML = `<input type="checkbox" class="check" checked>`
    }
    else {
        td5.innerHTML = `<input type="checkbox" class="check">`
    }
 
    trow.appendChild(td0); td0.className = 'no';
    trow.appendChild(td1); td1.className = 'bhyt'
    trow.appendChild(td2); td2.className = 'name';
    trow.appendChild(td3); td3.className = 'phone';
    trow.appendChild(td4); td4.className = 'precription';
    trow.appendChild(td5); td5.className = 'status';

    var controlDiv = document.createElement('div');
    controlDiv.id = 'controlDiv';
    controlDiv.innerHTML = `<button type="button" class="btn-bill"><i class='bx bx-credit-card-alt'></i></button>`;

    trow.appendChild(controlDiv);
    tbody.appendChild(trow);
}

document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('check')) {

        const row = e.target.closest('tr');
        let precription = row.querySelector('.precription').innerHTML;

        const docRef = doc(database, 'bill', precription);
        let status = row.querySelector('.check');

        if (status.checked) {
            updateDoc(docRef, {
                status: true
            });
        }
        else {
            updateDoc(docRef, {
                status: false
            });
        }
        
    }
});

function addAllItemToTable(billList) {

    no = 1;
    tbody.innerHTML = "";
    billList.forEach(element => {
        addItemToTable( element.bhyt,
                        element.patient, 
                        element.contact, 
                        element.id,
                        element.status);
    });
}

var bill_table = document.getElementById('table-body');
document.addEventListener('click', (e) => {
    if (e.target && (e.target.classList.contains('btn-bill') || e.target.classList.contains('bx-credit-card-alt'))) {
        PrintBill();

        const row = e.target.closest('tr');
        let precription = row.querySelector('.precription').innerHTML;
        // console.log(precription);
        
        const docRef = doc(database, 'bill', precription)
        getDoc(docRef).then((doc) => {
            // console.log(doc.data(), doc.id)

            const bill = document.querySelector('.invoice-wrapper');

            bill.querySelector('.precription').innerHTML = doc.data().precription;
            bill.querySelector('.name').innerHTML = doc.data().patient;
            bill.querySelector('.bhyt').innerHTML = doc.data().bhyt;

            let currentDate = new Date();
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let seconds = currentDate.getSeconds();

            bill.querySelector('.date').innerHTML = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;

            document.getElementById('sub-total').innerHTML = doc.data().money.subtotal;
            document.getElementById('tax').innerHTML = doc.data().money.tax;
            document.getElementById('total').innerHTML = doc.data().money.total;
            
            let medications = doc.data().medications;
            // console.log(medications);
            addAllItemToBill(medications);

            document.querySelector(".invoice-wrapper .close-btn").onclick = function() {

                bill_table.innerHTML = "";
                bill.querySelector('.precription').innerHTML = "";
                bill.querySelector('.name').innerHTML = "";
                bill.querySelector('.bhyt').innerHTML = "";
                bill.querySelector('.date').innerHTML = "";

                document.getElementById('sub-total').innerHTML = "";
                document.getElementById('tax').innerHTML = "";
                document.getElementById('total').innerHTML = "";
            }
        });
    }
});

function addAllItemToBill(bill) {

    bill_table.innerHTML = "";
    bill.forEach(element => {
        addItemToBill( element.item,
                        element.price, 
                        element.qty, 
                        element.thuoc_info,
                        element.total_price);
    });
}

function addItemToBill(item, price, qty, thuoc_info, total_price) {
    
    var trow = document.createElement('tr');
    var td0 = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');

    td0.innerHTML = item;
    td1.innerHTML = price;
    td2.innerHTML = qty;
    td3.innerHTML = thuoc_info;
    td4.innerHTML = total_price;

    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);

    bill_table.appendChild(trow);
}
/* END DISPLAY BILL LIST */

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

    if (searchBar.value == "") searchTable("precription");
    else if (category.value == 1) searchTable("precription");
    else if (category.value == 2) searchTable("bhyt");
    else if (category.value == 3) searchTable("name");
    else if (category.value == 4) searchTable("phone");
}

/* END SEARCH */

