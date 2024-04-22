import { User } from "../data/User.js"
let modback = JSON.parse(localStorage.getItem('user'));

let contentEditor = document.querySelectorAll('.datalist li');

console.log(modback);
contentEditor[0].innerHTML = `<b>Full name :</b> ${modback.name}`
contentEditor[1].innerHTML = `<b>Email :</b> ${modback.email}`
contentEditor[2].innerHTML = `<b>Role :</b> ${modback.role}`
contentEditor[3].innerHTML = `<b>ID :</b> ${modback.id}`
