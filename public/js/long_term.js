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
  measurementId: "G-WDFCQQ7JX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { 
    getDatabase, ref, set, child, update, remove, get, onValue
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js"

const db = getDatabase()



let i = 0
let initialList = []
function getAllPatients(myPatientList){
    const dbRef = ref(db, "Long-term-treatment")

    onValue(dbRef, (snapshot) => {
        snapshot.forEach(childSnapshot => {
            myPatientList.push(childSnapshot.val())
        });

        if(i === 0){
            let j, k = 0
            const pageNumber = document.querySelector('.page-number')
            pageNumber.innerHTML = i+1
            j = i*5 
            while(j < 5*(i+1) && k < 5){
                const fullname = document.querySelector(`.fullname${k+1}`)
                const sex = document.querySelector(`.sex${k+1}`)
                const contact = document.querySelector(`.contact${k+1}`)
                const bhyt = document.querySelector(`.bhyt${k+1}`)
                const remove = document.querySelector(`.remove-button${k+1}`)

                if(j >= myPatientList.length){
                    const info = document.querySelector(`.info-button${k+1}`)
                    const remove = document.querySelector(`.remove-button${k+1}`)
                    fullname.innerHTML = ""
                    sex.innerHTML = ""
                    contact.innerHTML = ""
                    bhyt.innerHTML = ""            
                    info.innerHTML = ""
                    remove.innerHTML = ""
                }else{
                    fullname.innerHTML = myPatientList[j].name
                    sex.innerHTML = myPatientList[j].sex
                    contact.innerHTML = myPatientList[j].contact
                    bhyt.innerHTML = myPatientList[j].bhyt
                    remove.classList.add(myPatientList[j].patientId)
                }                
                ++j
                ++k
            }
            

            for(let l = 1; l <= 5; l++){
                if(l > myPatientList.length){
                    //neu so luong benh nhan nhieu hon so hang trong table thi break
                    break;
                }
                let infoButton = document.querySelector(`.info-button${l}`)
                infoButton.addEventListener('click', () => {
                    const id_of_patient = (infoButton.id - 1) + 5*i
                    console.log(infoButton.id)
                    const infoContainer = document.querySelector('.pop-up-container')
                    const layout = document.querySelector('.layout-browser')
                    const patientList = document.querySelector('.patients-list')
                    if(infoContainer.classList.contains('show-up0')){
                        infoContainer.classList.remove('show-up0')
                    }
                    if(layout.classList.contains('active10')){
                        layout.classList.remove('active10')
                    }
                    infoContainer.classList.add('show-up')
                    layout.classList.add('active1')
                    patientList.classList.add('active2')
    
                    let myOutput = `<h3>Information of Patient</h3>`
                    let myOutput1 = ""
                    
                    myOutput1 += `
                    <div class="self-information-container">
                    <div class="header-information">Thong tin ca nhan</div>
                    <div class="header-container">Name</div>
                    <div class="information-content">${myPatientList[id_of_patient].name}</div>
                    <div class="header-container">CCCD</div>
                    <div class="information-content">${myPatientList[id_of_patient].cccd}</div>
                    <div class="header-container">Birth</div>
                    <div class="information-content">${myPatientList[id_of_patient].birth}</div>
                    <div class="header-container">Que quan</div>
                    <div class="information-content">${myPatientList[id_of_patient].quequan}</div>
                    </div>
                    <div class="contact-information-container">
                        <div class="header-information">Thong tin lien lac</div>
                        <div class="header-container">Address</div>
                        <div class="information-content">${myPatientList[id_of_patient].address}</div>
                        <div class="header-container">Phone number</div>
                        <div class="information-content">${myPatientList[id_of_patient].contact}</div>
                    </div>
                    <div class="treat-information-container">
                        <div class="header-information">Thong tin kham benh</div>
                        <div class="information-content">Bi so mui, nhuc dau, ho, chong mat, buon non, ...</div>
                    </div>`
                    let res = myOutput + myOutput1
                    infoContainer.innerHTML = res
                })
            }
                        

            for(let l = 1; l <= 5; l++){
                if(l > myPatientList.length){
                    //neu so luong benh nhan nhieu hon so hang trong table thi break
                    break;
                }
                let removeButton = document.querySelector(`.remove-button${l}`)
                removeButton.addEventListener('click', () => {
                    //them class vao nut mau do
                    let id_of_patient = `${removeButton.classList[1]}`
                    const removePatient = document.querySelector('.remove-patient-button')            
                    removePatient.classList.add(id_of_patient)
                    
                    const remove = document.querySelector('.remove-patient-container')
                    const layout = document.querySelector('.layout-browser')
                    const patientList = document.querySelector('.patients-list')
                    if(remove.classList.contains('active0')){
                        remove.classList.remove('active0')
                    }
                    if(layout.classList.contains('active10')){
                        layout.classList.remove('active10')
                    }
                    remove.classList.add('active')
                    layout.classList.add('active1')
                    patientList.classList.add('active2')                  
                })
            }
        }
    })    
    
}

getAllPatients(initialList)
const nextButton = document.querySelector('.next-button')
const previousButton = document.querySelector('.previous-button')

previousButton.addEventListener('click', () => {
    let j
    let k = 0
    i--
    if(i < 0){
        i = 0 
    }
    const pageNumber = document.querySelector('.page-number')

    pageNumber.innerHTML = i+1
    j = i*5 
    while(j < 5*(i+1) && k < 5){
        const fullname = document.querySelector(`.fullname${k+1}`)
        const sex = document.querySelector(`.sex${k+1}`)
        const contact = document.querySelector(`.contact${k+1}`)
        const bhyt = document.querySelector(`.bhyt${k+1}`)        
        const info = document.querySelector(`.info-button${k+1}`)
        const remove = document.querySelector(`.remove-button${k+1}`)

        if(j >= myPatientList.length){
            const info = document.querySelector(`.info-button${k+1}`)
            const remove = document.querySelector(`.remove-button${k+1}`)
            fullname.innerHTML = ""
            sex.innerHTML = ""
            contact.innerHTML = ""
            bhyt.innerHTML = ""            
            info.innerHTML = ""
            remove.innerHTML = ""
        }else{
            fullname.innerHTML = initialList[j].name
            sex.innerHTML = initialList[j].sex
            contact.innerHTML = initialList[j].contact
            bhyt.innerHTML = initialList[j].bhyt                
        }            
        
        info.innerHTML = `<td class="info-button-content">
        <button id="${k+1}" class="info-button${k+1}">Info</button>
        </td>`
        remove.innerHTML = `<td class="remove-button-content">
        <button id="${k+1}" class="remove-button${k+1} ${initialList[j].patientId}">Remove</button>
        </td>`
        ++j
        ++k 
    }

    for(let l = 1; l <= 5; l++){
        if(l > initialList.length){
            //neu so luong benh nhan nhieu hon so hang trong table thi break
            break;
        }
        let infoButton = document.querySelector(`.info-button${l}`)
        infoButton.addEventListener('click', () => {
            const id_of_patient = (infoButton.id - 1) + 5*i
            console.log(infoButton.id)
            const infoContainer = document.querySelector('.pop-up-container')
            const layout = document.querySelector('.layout-browser')
            const patientList = document.querySelector('.patients-list')
            if(infoContainer.classList.contains('show-up0')){
                infoContainer.classList.remove('show-up0')
            }
            if(layout.classList.contains('active10')){
                layout.classList.remove('active10')
            }
            infoContainer.classList.add('show-up')
            layout.classList.add('active1')
            patientList.classList.add('active2')

            let myOutput = `<h3>Information of Patient</h3>`
            let myOutput1 = ""
            
            myOutput1 += `
            <div class="self-information-container">
            <div class="header-information">Thong tin ca nhan</div>
            <div class="header-container">Name</div>
            <div class="information-content">${initialList[id_of_patient].name}</div>
            <div class="header-container">CCCD</div>
            <div class="information-content">${initialList[id_of_patient].cccd}</div>
            <div class="header-container">Birth</div>
            <div class="information-content">${initialList[id_of_patient].birth}</div>
            <div class="header-container">Que quan</div>
            <div class="information-content">${initialList[id_of_patient].quequan}</div>
            </div>
            <div class="contact-information-container">
                <div class="header-information">Thong tin lien lac</div>
                <div class="header-container">Address</div>
                <div class="information-content">${initialList[id_of_patient].address}</div>
                <div class="header-container">Phone number</div>
                <div class="information-content">${initialList[id_of_patient].contact}</div>
            </div>
            <div class="treat-information-container">
                <div class="header-information">Thong tin kham benh</div>
                <div class="information-content">Bi so mui, nhuc dau, ho, chong mat, buon non, ...</div>
            </div>`
            let res = myOutput + myOutput1
            infoContainer.innerHTML = res
        })
    }
    

    for(let l = 1; l <= 5; l++){
        if(l > initialList.length){
            //neu so luong benh nhan nhieu hon so hang trong table thi break
            break;
        }
        let removeButton = document.querySelector(`.remove-button${l}`)
        removeButton.addEventListener('click', () => {   
            let id_of_patient = `${removeButton.classList[1]}`
            const removePatient = document.querySelector('.remove-patient-button')            
            removePatient.classList.add(id_of_patient)

            const remove = document.querySelector('.remove-patient-container')
            const layout = document.querySelector('.layout-browser')
            const patientList = document.querySelector('.patients-list')
            if(remove.classList.contains('active0')){
                remove.classList.remove('active0')
            }
            if(layout.classList.contains('active10')){
                layout.classList.remove('active10')
            }
            remove.classList.add('active')
            layout.classList.add('active1')
            patientList.classList.add('active2')
        })
    }
});

nextButton.addEventListener('click', () => {
    let j, k = 0
    i++
    j = i*5
    if(j >= initialList.length){
        j = initialList.length - 1
        i--
        return 
    }
    const pageNumber = document.querySelector('.page-number')
    pageNumber.innerHTML = i+1
    while(j < 5*(i+1) && k < 5 && k < initialList.length){
        const fullname = document.querySelector(`.fullname${k+1}`)
        const sex = document.querySelector(`.sex${k+1}`)
        const contact = document.querySelector(`.contact${k+1}`)
        const bhyt = document.querySelector(`.bhyt${k+1}`)        
        const remove = document.querySelector(`.remove-button${k+1}`)

        if(j >= initialList.length){            
            const info = document.querySelector(`.info-button${k+1}`)
            const remove = document.querySelector(`.remove-button${k+1}`)
            fullname.innerHTML = ""
            sex.innerHTML = ""
            contact.innerHTML = ""
            bhyt.innerHTML = ""            
            info.innerHTML = ""
            remove.innerHTML = ""
        }else{
            fullname.innerHTML = initialList[j].name
            sex.innerHTML = initialList[j].sex
            contact.innerHTML = initialList[j].contact
            bhyt.innerHTML = initialList[j].bhyt
            remove.classList.add(initialList[j].patientId)    
        }
        j++
        ++k
    }

    for(let l = 1; l <= 5; l++){
        if(l > initialList.length){
            //neu so luong benh nhan nhieu hon so hang trong table thi break
            break;
        }
        let infoButton = document.querySelector(`.info-button${l}`)
        infoButton.addEventListener('click', () => {
            const id_of_patient = (infoButton.id - 1) + 5*i
            console.log(infoButton.id)
            const infoContainer = document.querySelector('.pop-up-container')
            const layout = document.querySelector('.layout-browser')
            const patientList = document.querySelector('.patients-list')
            if(infoContainer.classList.contains('show-up0')){
                infoContainer.classList.remove('show-up0')
            }
            if(layout.classList.contains('active10')){
                layout.classList.remove('active10')
            }
            infoContainer.classList.add('show-up')
            layout.classList.add('active1')
            patientList.classList.add('active2')

            let myOutput = `<h3>Information of Patient</h3>`
            let myOutput1 = ""
            
            myOutput1 += `
            <div class="self-information-container">
            <div class="header-information">Thong tin ca nhan</div>
            <div class="header-container">Name</div>
            <div class="information-content">${initialList[id_of_patient].name}</div>
            <div class="header-container">CCCD</div>
            <div class="information-content">${initialList[id_of_patient].cccd}</div>
            <div class="header-container">Birth</div>
            <div class="information-content">${initialList[id_of_patient].birth}</div>
            <div class="header-container">Que quan</div>
            <div class="information-content">${initialList[id_of_patient].quequan}</div>
            </div>
            <div class="contact-information-container">
                <div class="header-information">Thong tin lien lac</div>
                <div class="header-container">Address</div>
                <div class="information-content">${initialList[id_of_patient].address}</div>
                <div class="header-container">Phone number</div>
                <div class="information-content">${initialList[id_of_patient].contact}</div>
            </div>
            <div class="treat-information-container">
                <div class="header-information">Thong tin kham benh</div>
                <div class="information-content">Bi so mui, nhuc dau, ho, chong mat, buon non, ...</div>
            </div>`
            let res = myOutput + myOutput1
            infoContainer.innerHTML = res
        })
    }
    

    for(let l = 1; l <= 5; l++){
        if(l > initialList.length){
            //neu so luong benh nhan nhieu hon so hang trong table thi break
            break;
        }
        let removeButton = document.querySelector(`.remove-button${l}`)
        removeButton.addEventListener('click', () => {                        
            //them class vao nut remove mau đỏ
            let id_of_patient = `${removeButton.classList[1]}`
            const removePatient = document.querySelector('.remove-patient-button')            
            removePatient.classList.add(id_of_patient)

            const remove = document.querySelector('.remove-patient-container')
            const layout = document.querySelector('.layout-browser')
            const patientList = document.querySelector('.patients-list')
            if(remove.classList.contains('active0')){
                remove.classList.remove('active0')
            }
            if(layout.classList.contains('active10')){
                layout.classList.remove('active10')
            }
            remove.classList.add('active')
            layout.classList.add('active1')
            patientList.classList.add('active2')
        })
    }
});


function treatButton(id_of_patient){
    const longTerm = document.querySelector('.long-term-container')
    const layout = document.querySelector('.layout-browser')
    const patientList = document.querySelector('.patients-list')
    if(longTerm.classList.contains('active0')){
        longTerm.classList.remove('active0')
    }
    if(layout.classList.contains('active10')){
        layout.classList.remove('active10')
    }
    longTerm.classList.add('active')
    layout.classList.add('active1')
    patientList.classList.add('active2')

    const treatButton = document.querySelector('.submit-button')
    treatButton.classList.add(`${id_of_patient}`)
}

const layout = document.querySelector('.layout-browser')
layout.addEventListener('click', () => {
    const infoContainer = document.querySelector('.pop-up-container')
    const longTerm = document.querySelector('.long-term-container')
    const removePatient = document.querySelector('.remove-patient-container')
    const patientList = document.querySelector('.patients-list')
    if(longTerm.classList.contains('active')){
        longTerm.classList.remove('active')
        longTerm.classList.add('active0')
        if(layout.classList.contains('active1')){
            layout.classList.remove('active1')
            layout.classList.add('active10')
        }
        if(patientList.classList.contains('active2')){
            patientList.classList.remove('active2')
        }
    }
    if(removePatient.classList.contains('active')){
        removePatient.classList.remove('active')
        removePatient.classList.add('active0')
        if(layout.classList.contains('active1')){
            layout.classList.remove('active1')
            layout.classList.add('active10')
        }
        if(patientList.classList.contains('active2')){
            patientList.classList.remove('active2')
        }
    }
    if(infoContainer.classList.contains('show-up')){
        infoContainer.classList.remove('show-up')
        infoContainer.classList.add('show-up0')
        if(layout.classList.contains('active1')){
            layout.classList.remove('active1')
            layout.classList.add('active10')
        }
        if(patientList.classList.contains('active2')){
            patientList.classList.remove('active2')
        }
    }
    const treat = document.querySelector('.submit-button')
    if(treat.classList.contains(treat.classList[1])){
        treat.classList.remove(treat.classList[1])
    }
})



function removePatient(id_of_patient){
    const removePatient = document.querySelector('.remove-patient-container')
    const layout = document.querySelector('.layout-browser')
    const patientList = document.querySelector('.patients-list')
    if(removePatient.classList.contains('active0')){
        removePatient.classList.remove('active0')
    }
    if(layout.classList.contains('active10')){
        layout.classList.remove('active10')
    }
    removePatient.classList.add('active')
    layout.classList.add('active1')
    patientList.classList.add('active2')

    const removeButton = document.querySelector('.remove-patient-button')
    removeButton.classList.add(`${id_of_patient}`)
}

const submitButton = document.querySelector('.submit-button')    
submitButton.addEventListener('click', () => {
    const longTerm = document.querySelector('.long-term-container')
    const layoutBrowser = document.querySelector('.layout-browser')
    const patientList = document.querySelector('.patients-list')
    if(longTerm.classList.contains('active')){
        longTerm.classList.remove('active')
        longTerm.classList.add('active0')
        if(layoutBrowser.classList.contains('active1')){
            layoutBrowser.classList.remove('active1')
            layoutBrowser.classList.add('active10')
        }
        if(patientList.classList.contains('active2')){
            patientList.classList.remove('active2')
        }
    }
})
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

