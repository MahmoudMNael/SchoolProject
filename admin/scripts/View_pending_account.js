/*
function student() {
  const student = document.getElementById("cards");
  const teacher = document.getElementById("cards_teacher");

  student.style.display = "block";
  teacher.style.display = "none";
}

function teacher() {
  const student = document.getElementById("cards");
  const teacher = document.getElementById("cards_teacher");

  student.style.display = "none";
  teacher.style.display = "block";
}

if (student.style.display = "none") {
  document.getElementById("teacher_request").style.backgroundColor="green";
}

if (teacher.style.display = "none") {
  document.getElementById("student_request").style.backgroundColor="green";
}
*/

let teacher= document.getElementById('teacher_request');
teacher.addEventListener('click' , () => {
  const student = document.getElementById("cards");
  const teacher = document.getElementById("cards_teacher");

  student.style.display = "block";
  teacher.style.display = "none";
  teacher.classList.toggle('activebar');
})

let student= document.getElementById('student_request');
student.addEventListener('click' , () => {
  const student = document.getElementById("cards");
  const teacher = document.getElementById("cards_teacher");

  student.style.display = "block";
  teacher.style.display = "none";
  teacher.classList.toggle('activebar');
})

let logoutPopup = document.getElementById('logout');
logoutPopup.addEventListener('click' , () => {
  if(confirm("Are You sure You Want To Logout")==1){
    window.location.href="#";
  }
})


import { Pending_Account } from "../../Models/Pending.js";

let pending = document.querySelector('#cards');

let Pending_Accounts = [
  new Pending_Account (
    0, 
    'Mazen',
    'Requested To Join.'
  ),
  new Pending_Account (
    1, 
    'Ebrahim',
    'Requested To Join.'
  ),
  new Pending_Account (
    2, 
    'Nael',
    'Requested To Join.'
  ),
  new Pending_Account (
    3, 
    'Mohamed',
    'Requested To Join.'
  ),
  new Pending_Account (
    4, 
    'Hamed',
    'Requested To Join.'
  )
]

pending.innerHTML = '';
for (let i of Pending_Accounts) {
  pending.innerHTML+= `
      <div class="card">
        <div class="left">
          <img src="/assets/icons/profile-user.png" alt="">
          <div class="text">
            ${i.name}  ${i.content}
          </div>
        </div>
        <div class="right">
          <img src="/assets/icons/accpet.png" alt="" class="accept">
          <img src="/assets/icons/decline.png" alt="" class="decline">
        </div> 
      </div>
  `
}

