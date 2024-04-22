


let title = document.getElementById('Title');
let title2 = document.getElementById('Title2');
let isFocus = false;
title.onfocus = function() {
  title.classList.add('Focusing');
  isFocus = true;
}
title.addEventListener("focusout" , () =>{
  if (isFocus && title.value.length == 0) {
    isFocus = false;
    title.classList.remove('Focusing'); 
    title.style.transitionDuration = "0.5s";
  }
});

title2.onfocus = function() {
  title2.classList.add('Focusing');
  isFocus = true;
}
title2.addEventListener("focusout" , () =>{
  if (isFocus && title2.value.length == 0) {
    isFocus = false;
    title2.classList.remove('Focusing'); 
    title2.style.transitionDuration = "0.5s";
  }
});

let toggle = document.getElementById('cmnt_btn');
toggle.addEventListener('click' , () => {
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');

  let box_1 = document.getElementById('Container');
  box_1.style.display = "block";
})

let submit = document.getElementById('SubmitBtn');
submit.addEventListener('click' , () => {
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');

  let box_2 = document.getElementById('Container2');
  box_2.style.display = "block";
})

let remove = document.getElementById('Decline');
remove.addEventListener('click' , () => {
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');

  let box_1 = document.getElementById('Container');
  box_1.style.display = "none";

  let box_2 = document.getElementById('Container2');
  box_2.style.display = "none";
})

let remove2 = document.getElementById('Decline2');
remove2.addEventListener('click' , () => {
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');

  let box_1 = document.getElementById('Container');
  box_1.style.display = "none";

  let box_2 = document.getElementById('Container2');
  box_2.style.display = "none";
})

let save = document.getElementById('Accept');
save.addEventListener('click' , () => {
  let titleContent = document.getElementById('Title');
  let typeContent = document.getElementById('Title2');
  let innerTitle = document.getElementById('label1');
  let innerType = document.getElementById('label2');
  if (titleContent.value.length == 0) {
    innerTitle.innerHTML = "This Field Is Required, Please Fill Content";
    innerTitle.classList.add("verification");
    innerTitle.style.transitionDuration = '0.4s';
  }
  if (typeContent.value.length == 0) {
    innerType.innerHTML = "This Field Is Required, Please Fill Content";
    innerType.classList.add("verification");
    innerType.style.transitionDuration = '0.4s';
  }
  if (titleContent.value.length > 0) {
    let blur = document.getElementById('blur');
    blur.classList.toggle('active');

    let box_1 = document.getElementById('Container');
    box_1.style.display = "none";

    let box_2 = document.getElementById('Container2');
    box_2.style.display = "none";

    innerTitle.classList.remove("verification");
    innerTitle.innerHTML = "Content";

    let commentInput = document.getElementById('Title');
    let activeUser = JSON.parse(localStorage.getItem('user')); // Potential BuG <3
    let comments = JSON.parse(localStorage.getItem('comments'));
    let obj = new Comment_Section(comments.length , activeUser.name , commentInput.value);
    comments.push(obj);
    localStorage.setItem('comments' , JSON.stringify(comments));
    location.reload();
  }
})

let save2 = document.getElementById('Accept2');
save2.addEventListener('click' , () => {
  let titleContent = document.getElementById('Title');
  let typeContent = document.getElementById('Title2');
  let innerTitle = document.getElementById('label1');
  let innerType = document.getElementById('label2');
  if (titleContent.value.length == 0) {
    innerTitle.innerHTML = "This Field Is Required, Please Fill Comment";
    innerTitle.classList.add("verification");
    innerTitle.style.transitionDuration = '0.4s';
  }
  if (typeContent.value.length == 0) {
    innerType.innerHTML = "This Field Is Required, Please Fill Link";
    innerType.classList.add("verification");
    innerType.style.transitionDuration = '0.4s';
  }
  if (titleContent.value.length > 0 || typeContent.value.length > 0) {
    let blur = document.getElementById('blur');
    blur.classList.toggle('active');

    let box_1 = document.getElementById('Container');
    box_1.style.display = "none";

    let box_2 = document.getElementById('Container2');
    box_2.style.display = "none";

    innerTitle.classList.remove("verification");
    innerType.classList.remove("verification");
    innerTitle.innerHTML = "Your Comment";
    innerType.innerHTML = "Your Link";
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
if (!localStorage.getItem('comments')) {
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
  ];
  localStorage.setItem('comments' , JSON.stringify(Comment_Sections));
}

let Comment_Sections = JSON.parse(localStorage.getItem('comments'));

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


let del=document.getElementById("dlt_btn");
del.addEventListener('click',()=>{
  if(confirm("Are you sure you want to delete")==1){
    
}
})
