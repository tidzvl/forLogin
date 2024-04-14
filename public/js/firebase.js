import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js' 
import { getDatabase, ref, set, onValue, get, child, remove} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js' 

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
const database = getDatabase(app);


//func of users/ in firebcase - booking only
(function (){
	function readUser(userId){
		const dbRef = ref(database);
		get(child(dbRef, `users/${userId}`)).then((snapshot) => {
		  if (snapshot.exists()) {
		    console.log(snapshot.val());
		  } else {
		    console.log("No data available");
		  }
		}).catch((error) => {
		  console.error(error);
		});
	}

	function getLastID() {
	  return new Promise((resolve, reject) => {
	    const dbRef = ref(database);
	    get(child(dbRef, `booking/`)).then((snapshot) => {
	      if (snapshot.exists()) {
	        var output = snapshot.val().length;
	        resolve(output);
	      } else {
	        resolve("0");
	      }
	    }).catch((error) => {
	      console.error(error);
	      reject(error);
	    });
	  });
	}

	function getSDT(userId){
		const dbRef = ref(database);
		get(child(dbRef, `booking/${userId}`)).then((snapshot) => {
		  if (snapshot.exists()) {
		    console.log(snapshot.val().contact);
		  } else {
		    console.log("No data available");
		  }
		}).catch((error) => {
		  console.error(error);
		});
	}

	function findBySdt(sdt){
		const dbRef = ref(database);
		get(child(dbRef, `booking/${sdt}`)).then((snapshot) => {
		  if (snapshot.exists()) {
		    console.log("Sdt tồn tại, thông tin:");
			console.log("Tên:"+snapshot.val().fullname);
			console.log("Contact:"+snapshot.val().contact);
			console.log("Tuổi:"+snapshot.val().year_old);
		  } else {
		    console.log("No data available");
		  }
		}).catch((error) => {
		  console.error(error);
		});
	}

	function validateForm() {
	  var form = document.getElementById('bookingform');
	  for (var i = 0; i < form.elements.length; i++) {
	    if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
	      return false;
	    }
	  }
	  return true;
	}

	function removeData(id){
		remove(ref(database, 'admin/medicine/data/' + id));
		console.log("User id "+id+" have been deleted!");
	}

	async function insertNewBooking(name, yo, sex, contact, address = "", bhyt = "No", bhytnum = "0", des = "", khoa = "Kham thuong"){
		let id = await getLastID();
		set(ref(database, 'booking/' + id), {
	    fullname: name,
	    year_old: yo,
	    sex: sex,
	    contact: contact,
	    address: address,
	    bhyt: bhyt,
	    bhytnum: bhytnum,
	    des: des,
	    khoa: khoa
	  });
	  console.log("User id "+id+" have been create! Run console: readUser("+id+") to view this!");
	}

	// document.getElementById('book').addEventListener('click', () => {writeUser("2","TiDz","tidz@ti.com","22");}, true);
	document.getElementById('test').addEventListener('click', () => {removeData("4");}, true);
	document.getElementById('submit').addEventListener('click', async () => {
		if(validateForm()){
			var booking_in4 = document.getElementById('bookingform');
			var booking_data = new FormData(booking_in4);
			var arr = Array.from(booking_data.entries());
			var khoa = document.getElementById('khoa').value;
			await insertNewBooking(arr[0][1],arr[1][1],arr[2][1],arr[3][1],arr[4][1],arr[5][1],arr[6][1],arr[7][1],khoa);
			window.location.href = "html/submit.html";
		}
	}, true);
})();
export {database};