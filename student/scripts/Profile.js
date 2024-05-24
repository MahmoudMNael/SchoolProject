let modback = {};

let req = new XMLHttpRequest();
req.open('GET', 'http://localhost:8000/api/auth/profile/', false);
req.withCredentials = true;
req.onload = function () {
	if (req.status == 200) {
		modback = JSON.parse(req.responseText);
	} else {
		console.log('Error');
	}
};
req.send();

let contentEditor = document.querySelectorAll('.datalist li');

console.log(modback);
contentEditor[0].innerHTML = `<b>Full name :</b> ${modback.full_name}`;
contentEditor[1].innerHTML = `<b>Email :</b> ${modback.email}`;
contentEditor[2].innerHTML = `<b>Role :</b> ${modback.role}`;
contentEditor[3].innerHTML = `<b>ID :</b> ${modback.id}`;
