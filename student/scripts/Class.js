import { Class } from "../../models/Class.js";

const classTemplate = document.querySelector("[class-template]");
const userCards = document.querySelector("[data-user-card-container]");

// fetch("http://127.0.0.1:5500/res/JSON_test/Classes.json")
//   .then((res) => res.json())
//   .then((data) => {
//     for (const Class of data) {
//       const card = classTemplate.content.cloneNode(true).children[0];
//       const header = card.querySelector("[data-header]");
//       const body = card.querySelector("[data-body]");
//       header.textContent = Class.className;
//       body.textContent = Class.creater;
//       userCards.append(card);
//     }
//   });


//constant data
if(!localStorage.getItem('classesData')){
let classes = [
  new Class("math", "ahmed", 1),
  new Class("test", "zagroz", 2),
  new Class("omar", "lol", 3),
];
localStorage.setItem("classesData", JSON.stringify(classes));
}

const storedData = JSON.parse(localStorage.getItem("classesData"));

for (const Class of storedData) {
  const card = classTemplate.content.cloneNode(true).children[0];
  const header = card.querySelector("[data-header]");
  const body = card.querySelector("[data-body]");
  header.textContent = Class.name;
  body.textContent = Class.creater;
  userCards.append(card);
}

const createClassForm = document.getElementById("createClassForm");
const classNameInput = document.getElementById("className");
const createrInput = document.getElementById("classCreater");

createClassForm.addEventListener("submit", (event) => {
  
  // Prevent default form submission
  event.preventDefault(); 
  const className = classNameInput.value;
  const creater = createrInput.value;
  let classes =JSON.parse(localStorage.getItem("classesData"));
  const newClass = new Class(className, creater,classes.length);
  classes.push(newClass);
  localStorage.setItem("classesData", JSON.stringify(classes));

  //append the new class to the div
  const card = classTemplate.content.cloneNode(true).children[0];
  const header = card.querySelector("[data-header]");
  const body = card.querySelector("[data-body]");
  header.textContent = newClass.name;
  body.textContent = newClass.creater;
  userCards.append(card);

  //clean up after creating class
  closePopUp();
  classNameInput.value = "";
  createrInput.value = "";
});

let confirgmlogoutbtn = document.getElementById("logoutbtn");

confirgmlogoutbtn.addEventListener("click", () => {
  let x = confirm("Are you sure you want to log out?");
  if (x) {
    window.location.href = "./index.html";
  }
});

function closePopUp(){
  let x = document.getElementById("addClass");
  x.style.opacity = "0%";
  x.style.visibility = "hidden";
}

let addclassbtn = document.getElementById("addClassbtn");

addclassbtn.addEventListener("click", () => {
  let x = document.getElementById("addClass");
  x.style.opacity = "100%";
  x.style.visibility = "visible";
});

let closepopupbtn = document.getElementById("closePopupbtn");

closepopupbtn.addEventListener("click", () => {;
  closePopUp();
});

