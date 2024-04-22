import { Comment_Section } from "../../models/Comment_Section.js";

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
    <img src="/assets/icons/profile-user.png" alt="" class="profile_user">
    ${i.name}
  </div>
  <div class="comment_content">
    ${i.content}
  </div>
  </div>  
  `;
} 




