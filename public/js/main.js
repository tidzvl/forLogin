import {database} from '/js/firebase.js';

(function (){
	function writeUser(userId, name, email, yo){
		set(ref(db, 'users/' + userId), {
		    username: name,
		    email: email,
		    year_old : yo
		  });
		  console.log("Writed!");
	}
	document.getElementById('book').addEventListener('click', () => {writeUser("1","TiDz","tidz@ti.com","22");}, true);
})();
