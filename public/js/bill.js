document.querySelector('.invoice-btn').onclick = function(){
    print();
}

document.querySelector(".invoice-wrapper .close-btn").addEventListener("click", () =>{

    document.querySelector(".invoice-wrapper").classList.remove("active");
    document.querySelector(".main-window").classList.remove("active");
    document.querySelector(".sidebar").classList.remove("active");
});

Window.onload = function() {
    document.getElementById("download")
    .addEventListener("click", () => {
        const invoice = this.document.getElementById("print-area");
        html2pdf().from(invoice).save();
    })
}

// fetch(`./json/data.json`) 
//     .then(function(response) {
//         return response.json();
//     })
//     .then (function(data) {
//         let placeholder = document.querySelector("#table-body");
//         let out = "";
//         for (let product of data) {
//             out += `
//             <tr>
//                 <td>${product.med_Id}</td>
//                 <td>${product.med_name}</td>
//                 <td>${product.price}</td>
//                 <td></td>
//                 <td></td>
//             </tr>
//         `;
//         }

//         placeholder.innerHTML = out;
//     });

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
const db = getDatabase();

// collection ref
const colRefBill = collection(database, 'bill');

/* SEARCH */
var searchBar = document.getElementById("searchBar");
var searchBtn = document.getElementById("searchButton");
var tbody = document.getElementById('table-body');

searchBtn.onclick = function() {
    tbody.innerHTML = "";
    var filter = searchBar.value;

    const docRef = doc(database, 'bill', filter);
    onSnapshot(docRef, (doc) => {
        var name = doc.data().patient;
        var medications = doc.data().medications;
        var precription = doc.id;

        const bill = document.querySelector('.invoice-wrapper');
        
        bill.querySelector('.name').innerHTML = name;
        bill.querySelector('.precription').innerHTML = precription;

        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();
        bill.querySelector('.day').innerHTML = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
        
        addAllMedToTable(medications)
        .then(() => {
            var sum = 0;
            var tax = 0;
            var total = 0;
            var sums = document.getElementsByClassName('sum');
            for(var i = 0; i < sums.length; i++){
                sum += parseFloat(sums[i].innerText.replace('$', ''));
            }
            tax = (sum / 100 * 10).toFixed(2);
            total = parseFloat(sum) + parseFloat(tax);

            document.getElementById('sub-total').innerHTML = '$' + sum;
            document.getElementById('tax').innerHTML = '$' + tax;
            document.getElementById('total').innerHTML = '$' + total;
        })
        .catch((error) => {
            console.log('Có lỗi xảy ra:', error);
        });
    });
}

function addItemToTable(name, price, description, quantity) {

    var trow = document.createElement('tr');
    var td0 = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');

    td0.innerHTML = name;
    td1.innerHTML = price;
    td2.innerHTML = description;
    td3.innerHTML = quantity;

    var realPrice = price.replace('$', '');

    let part = description.split(" ");
    var realDes = part[0];

    var sum = (realPrice * realDes).toFixed(2);
    td4.innerHTML = '$' + sum;

    trow.appendChild(td0); td0.className = 'medname';
    trow.appendChild(td1); td1.className = 'price'
    trow.appendChild(td2); td2.className = 'description';
    trow.appendChild(td3); td3.className = 'quantity';
    trow.appendChild(td4); td4.className = 'sum';

    tbody.appendChild(trow);
}

function addAllMedToTable(medList) {
    tbody.innerHTML = "";

    const data = ref(db, 'admin/medicine/data');
    onValue(data, (snapshot) => {
        const dt = snapshot.val();
        let list = dt;
        medList.forEach(element => {
            var medName = element.name;
            var price = 0;
            // find price
            for (let element of list) {
                if (element.name == medName) {
                    price = element.price;
                    break;
                }
            }

            addItemToTable( element.name,
                            price, 
                            element.description, 
                            element.quantity);
        }); 
    });

    return new Promise((resolve, reject) => {

        try {
            setTimeout(() => {
                resolve();  
            }, 2000);
        } catch (error) {
            reject(error); 
        }
    });
}