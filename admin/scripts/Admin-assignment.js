import { Assignment } from "../../models/Assignment.js";

let detail = document.querySelector("Content");
if (!localStorage.getItem("details")) {
  let Assignments = [
    new Assignment(
      0,
      "calc:",
      "Here is the details of assignment math.",
      "Due Time:22/3/2024",
      "#"
    ),

    new Assignment(
      1,
      "static:",
      "Here is the details of assignment static.",
      "Due Time:22/3/2024"
    ),

    new Assignment(
      2,
      "dynamic:",
      "Here is the details of assignment dynamic.",
      "Due Time:22/3/2024"
    ),

    new Assignment(
      3,
      "Algebra:",
      "Here is the details of assignment algebra.",
      "Due Time:22/3/2024"
    ),

    new Assignment(
      4,
      "Solids",
      "Here is the details of assignment solids.",
      "Due Time:22/3/2024"
    ),
  ];
  localStorage.setItem("details", JSON.stringify(Assignments));
}

let Assignments = JSON.parse(localStorage.getItem("details"));

let assiTxt = document.getElementById("assi-txt");

assiTxt.innerHTML = "";
for (let i of Assignments) {
  assiTxt.innerHTML += `
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

let assignmentCards = document.querySelectorAll(".assi-txt2");
for (let assi of assignmentCards) {
  let assiTxt = JSON.parse(localStorage.getItem("details"));
  assi.addEventListener("click", () => {
    event.preventDefault();
    let id = assi.getAttribute("data-set-id");
    localStorage.setItem(
      "selectedClass",
      JSON.stringify(assiTxt.find((assi) => assi.id == id))
    );
    //we go to bota instead of all tasks
    window.location.href = "View_Assignment.html";
  });
}
