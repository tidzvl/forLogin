/* Choose role to log in */

const admin = document.getElementById('admin');
const nurse = document.getElementById('nurse');
const doctor = document.getElementById('doctor');

nurse.onclick = function(){
    window.location.href = '/login-signup/';
}
doctor.onclick = function(){
    window.location.href = '/login-signup/';
}
admin.onclick = function(){
    window.location.href = '/login-signup/';
}