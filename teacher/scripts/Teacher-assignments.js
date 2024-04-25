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
});

let colorModeBtn = document.querySelector('#colorModeBtn');
let colorModeIcon = document.querySelector('#colorModeIcon');

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
});

colorModeBtn.addEventListener('click', () => {
	if (colorModeIcon.classList.contains('fa-moon')) {
		colorModeIcon.classList.remove('fa-moon');
		colorModeIcon.classList.add('fa-sun');
	} else {
		colorModeIcon.classList.remove('fa-sun');
		colorModeIcon.classList.add('fa-moon');
	}
});

import { Assignment } from "/models/Assignment.js";

let detail = document.querySelector('Content');
if (!localStorage.getItem('details')) {
  let Assignments = [
    new Assignment (
      0,
      'Math:',
      'Here is the details of assignment Math.',
      'Due Time:22/3/2024',
      '../HTML/Std-Assignments.html'
    ),
  
    new Assignment (
      1,
      'Science:',
      'Here is the details of assignment Math.',
      'Due Time:22/3/2024'
    ),
  
    new Assignment (
      2, 
      'Arabic:',
      'Here is the details of assignment Arabic.',
      'Due Time:22/3/2024'
    ),
  
    new Assignment (
      3,
      'Geography:',
      'Here is the details of assignment Geography.',
      'Due Time:22/3/2024'
    ),
  
    new Assignment (
      4,
      'English',
      'Here is the details of assignment Geography.',
      'Due Time:22/3/2024'
    )
  ];
  localStorage.setItem('details',JSON.stringify(Assignments));
}

let Assignments=JSON.parse(localStorage.getItem('details'));

let assiTxt=document.getElementById("assi-txt");

assiTxt.innerHTML='';
for(let i of Assignments){
  assiTxt.innerHTML+=`
  <div class="assi-txt2" data-set-id="${i.id}">
  <img src="/assets/images/simple_profile_photo.png">
  <div class="username" >
      <a href="" id="address">${i.title}</a>
  </div>
  <p class="date">${i.date}</p>
  <p class="assi-content">${i.content}</p>
  </div>
  `;
}

let assignmentCards = document.querySelectorAll('.assi-txt2');
for (let assi of assignmentCards) {
  let assiTxt = JSON.parse(localStorage.getItem('details'));
  assi.addEventListener('click', () => {
    event.preventDefault();
    let id = assi.getAttribute('data-set-id');
    localStorage.setItem(
      'selectedClass',
      JSON.stringify(assiTxt.find((assi) => assi.id == id))
    );
      //we go to bota instead of all tasks
      window.location.href = "View_Assignment.html";
  });
}








