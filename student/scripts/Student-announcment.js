
import { Announcment } from "/models/Announcment.js";

let detailAnnounce = document.querySelector('ann-txt');
if (!localStorage.getItem('detailAnnounce')) {
  let Announcments = [
    new Announcment (
      0,
      'Teacher:',
      'Please Remember Your Work.',
      'Due Time:22/3/2024',
      '../HTML/Std-Assignments.html'
    ),
  
    new Announcment (
      1,
      'Admin:',
      'Dont Forget Your Work.',
      'Due Time:22/3/2024'
    ),
  ];
  localStorage.setItem('detailAnnounce',JSON.stringify(Announcments));
}

let Announcments=JSON.parse(localStorage.getItem('detailAnnounce'));

let annonceTxt=document.getElementById("ann-txt");

annonceTxt.innerHTML='';
for(let i of Announcments){
  annonceTxt.innerHTML+=`
  <div class="ann-txt2"> 
    <img src="/assets/images/simple_profile_photo.png">
    <div class="username">
      <p>${i.title}</p>
    </div>
    <p class="date">${i.date}</p>
    <p class="anno-content">${i.content}</p>
  </div>
  `;
}