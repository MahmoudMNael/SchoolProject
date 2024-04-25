let title = document.getElementById('Title');
let content2 = document.getElementById('Content2');
let isFocus = false;

title.onfocus = function() {
  title.classList.add('Focusing');
  isFocus = true;
}
content2.onfocus = function() {
  content2.classList.add('Focusing2');
  isFocus = true;
}
title.addEventListener("focusout" , () =>{
  if (isFocus && title.value.length == 0) {
    isFocus = false;
    title.classList.remove('Focusing'); 
    title.style.transitionDuration = "0.5s";
  }
});
content2.addEventListener("focusout" , () => {
  if (isFocus && content2.value.length == 0) {
    isFocus = false;
    content2.classList.remove('Focusing2');
    content2.style.transitionDuration = "0.5s";
  }
})

let add=document.getElementById("add-btn");
add.addEventListener('click',()=>{
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');

  let box_2 = document.getElementById('Container');
  box_2.style.display = "block";
})

let decline = document.getElementById('Decline');
decline.addEventListener ('click' , () => {
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');

  let box_2 = document.getElementById('Container');
  box_2.style.display = "none";
})

let colorModeBtn = document.querySelector('#colorModeBtn');
let colorModeIcon = document.querySelector('#colorModeIcon');

colorModeBtn.addEventListener('click', () => {
	if (colorModeIcon.classList.contains('fa-moon')) {
		colorModeIcon.classList.remove('fa-moon');
		colorModeIcon.classList.add('fa-sun');
	} else {
		colorModeIcon.classList.remove('fa-sun');
		colorModeIcon.classList.add('fa-moon');
	}
});
/*

*/
let save = document.getElementById('Accept');
save.addEventListener('click' , () => {
  let titleContent = document.getElementById('Title');
  let typeContent = document.getElementById('Content2');
  let innerTitle = document.getElementById('label1');
  let innerType = document.getElementById('label2');
  if (titleContent.value.length == 0) {
    innerTitle.innerHTML = "This Field Is Required, Please Fill Title";
    innerTitle.classList.add("verification");
    innerTitle.style.transitionDuration = '0.4s';
  }
  if (typeContent.value.length == 0) {
    innerType.innerHTML = "This Field Is Required, Please Fill Content";
    innerType.classList.add("verification");
    innerType.style.transitionDuration = '0.4s';
  }
  if (titleContent.value.length > 0 && typeContent.value.length > 0) {
    let blur = document.getElementById('blur');
    blur.classList.toggle('active');
  
    let box_3 = document.getElementById('Container');
    box_3.style.display = "none";

    innerTitle.classList.remove("verification");
    innerType.classList.remove("verification");
    innerTitle.innerHTML = "Title";
    innerType.innerHTML = "Content";
  }
})









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
    <button type="button" class="edit-btn" id="edit"> Edit</button>
    <button type="button" class="delete-btn" id="dlt_btn"> Delete </button>
  </div>
  `;
}

let edit = document.getElementById("edit");
edit.addEventListener('click',()=>{
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');

  let box_2 = document.getElementById('Container');
  box_2.style.display = "block";
});

let del=document.getElementById("dlt_btn");
del.addEventListener('click',()=>{
  if(confirm("Are you sure you want to delete")==1){

}
});