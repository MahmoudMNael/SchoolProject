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

let toggle = document.getElementById('edt_btn');
toggle.addEventListener('click' , () => {
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');

  let box_2 = document.getElementById('Container');
  box_2.style.display = "block";
}) 

let decline = document.getElementById('Decline');
decline.addEventListener('click' , () => {
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');
  
  let box_2 = document.getElementById('Container');
  box_2.style.display = "none";
});

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


let logoutPopup = document.getElementById('logout');
logoutPopup.addEventListener('click' , () => {
  if(confirm("Are You sure You Want To Logout")==1){
    window.location.href="#";
}
})








import { Comment_Section } from "../../Models/Comment_Section.js";

let comment = document.querySelector('.comment_section');

let Comment_Sections = [
  new Comment_Section (
    0,
    'Mazen:',
    'Just Adding Comment Here.'
  ),

  new Comment_Section (
    1,
    'Ebrahim:',
    'Adding Comment Number 2 Here'
  ),

  new Comment_Section (
    2, 
    'Nael:',
    'Guess What it is the third Comment.'
  ),

  new Comment_Section (
    3,
    'Mohamed:',
    'It is The Fourth I Guess.'
  ),

  new Comment_Section (
    4,
    'Omar:',
    'Finally Last Comment.'
  )
]

comment.innerHTML = '';
for (let i of Comment_Sections){
comment.innerHTML += `
  <div class="card_comment">
  <div class="commenter">
    <img src="/Res/Icons/profile-user.png" alt="" class="profile_user">
    ${i.name}
  </div>
  <div class="comment_content">
    ${i.content}
  </div>
  </div>  
  `;
} 

let editButton = document.getElementById('edt_btn');



import { Assignment } from "../Models/Assignment.js";

let detail = document.querySelector('Content');
if (!localStorage.getItem('details')) {
  let Assignments = [
    new Assignment (
      0,
      'Math:',
      'Here is the details of assignment Math.'
    ),
  
    new Assignment (
      1,
      'Science:',
      'Here is the details of assignment Math.'
    ),
  
    new Assignment (
      2, 
      'Arabic:',
      'Here is the details of assignment Arabic.'
    ),
  
    new Assignment (
      3,
      'Geography:',
      'Here is the details of assignment Geography.'
    ),
  
    new Assignment (
      4,
      'English',
      'Here is the details of assignment Geography.'
    )
  ];
}
