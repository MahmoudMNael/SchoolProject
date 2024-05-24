import { User } from "../../models/User.js";

if (!localStorage.getItem("RegisteredUsers")) {
  let classes = [
    new User(
      "Ebrahim",
      "ibrahimjarb69@gmail.com",
      "1234_hima_1234",
      "admin",
      1
    ),
    new User("Nael", "ibrahimjarb69@gmail.com", "1234_hima_1234", "admin", 2),
    new User("Mazen", "ibrahimjarb69@gmail.com", "1234_hima_1234", "admin", 3),
    new User("Bota", "ibrahimjarb69@gmail.com", "1234_hima_1234", "admin", 4),
    new User("Omar", "ibrahimjarb69@gmail.com", "1234_hima_1234", "admin", 5),
  ];
  localStorage.setItem("RegisteredUsers", JSON.stringify(classes));
}

if (!localStorage.getItem("pendingAccounts")) {
  localStorage.setItem("pendingAccounts", JSON.stringify([]));
}

//registration related

let Registrationbtn = document.getElementById("Registrationbtn");

Registrationbtn.addEventListener("click", () => {
  const userNameInput = document.getElementById("reg-name");
  const userEmailInput = document.getElementById("reg-email");
  const userPassInput = document.getElementById("reg-pass");
  const userConfirmPassInput = document.getElementById("reg-confirm-pass");
  const userRoleInput = document.getElementsByName("role");

  event.preventDefault();
  let RegisteredUsers = JSON.parse(localStorage.getItem("RegisteredUsers"));
  let duplaciteEmail = userEmailInput.value;
  let valid = true;

  for (let i = 0; RegisteredUsers.length > i; ++i) {
    if (RegisteredUsers[i].email == duplaciteEmail) {
      alert("email already in usage!");
      userEmailInput.value = "";
      valid = false;
      break;
    }
  }

  if (userPassInput.value != userConfirmPassInput.value) {
    alert("passwords dont match!");
    userConfirmPassInput.value = "";
  } else if (valid) {
    let pendingAccounts = JSON.parse(localStorage.getItem("pendingAccounts"));
    if (userRoleInput[0].checked) {
      var role = "student";
    } else {
      var role = "teacher";
    }
    const newUser = new User(
      userNameInput.value,
      userEmailInput.value,
      userPassInput.value,
      role,
      pendingAccounts.length
    );
    pendingAccounts.push(newUser);
    localStorage.setItem("pendingAccounts", JSON.stringify(pendingAccounts));
    location.reload();
  }
});

//registration finished

//login relateed

let loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", () => {
  event.preventDefault();
  let accessGranted = false;
  let userRole = null;
  const userEmailInput = document.getElementById("login-email");
  const userPassInput = document.getElementById("login-pass");
  let RegisteredUsers = JSON.parse(localStorage.getItem("RegisteredUsers"));

  for (let i = 0; RegisteredUsers.length > i; ++i) {
    if (userEmailInput.value == RegisteredUsers[i].email) {
      if (userPassInput.value == RegisteredUsers[i].password) {
        localStorage.setItem("user", JSON.stringify(RegisteredUsers[i]));
        userRole = RegisteredUsers[i].role;
        accessGranted = true;
        break;
      }
    }
  }
  if (accessGranted) {
    switch (userRole) {
      case "admin":
        window.location.href = "classAdmin.html";
        break;
      case "teacher":
        window.location.href = "/teacher/ClassAll.html";
        break;
      case "student":
        window.location.href = "/student/ClassAll.html";
        break;
    }
  } else {
    alert("Wrong credentials! Please try again.");
    userEmailInput.value = "";
    userPassInput.value = "";
  }
});
//login done
