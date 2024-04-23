import { Assignment } from "/models/Assignment.js";

let detail = document.querySelector('Content');
if (!localStorage.getItem('details')) {
  let Assignments = [
    new Assignment (
      0,
      'Math:',
      'Here is the details of assignment Math.',
      'Due Time:22/3/2024',
      '#'
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
      window.location.href = "../HTML/Std-Assignments.html";
  });
}