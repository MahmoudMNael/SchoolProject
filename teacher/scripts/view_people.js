let moddata = [];
let classroomID = sessionStorage.getItem('classroomID');

let req = new XMLHttpRequest();
/*
    we will get the classroom id from session storage
    we will then use the classroom id to get the list of teachers and students in the classroom
 */
req.open(
	'GET',
	`http://localhost:8000/api/classrooms/${classroomID}/people/`,
	false
);
req.withCredentials = true;
req.onload = function () {
	if (req.status == 200) {
		moddata = JSON.parse(req.responseText);
	} else {
		console.log('Error');
	}
};
req.send();

let TeacherListEditor = document.querySelector('.Teachers_table');
let StudentListEditor = document.querySelector('.Students_table');

console.log(moddata);

TeacherListEditor.innerHTML += `<li><img src="../assets/images/simple_profile_photo.png" alt="profile photo">${moddata.teacher.full_name}</li>`;

moddata.students.forEach((item) => {
	StudentListEditor.innerHTML += `<li><img src="../assets/images/simple_profile_photo.png" alt="profile photo">${item.full_name}</li>`;
});
let searchresult = document.getElementById('input-search');
// i want to display the list of teachers and students in the classroom based on the search result
// i will use the searchresult variable to get the search result
// i will then use the moddata variable to get the list of teachers and students
// i will then display the list of teachers and students based on the search result

searchresult.addEventListener('keyup', function () {
	let search = searchresult.value.toLowerCase();
	let TeacherListEditor = document.querySelector('.Teachers_table');
	let StudentListEditor = document.querySelector('.Students_table');
	TeacherListEditor.innerHTML = '';
	StudentListEditor.innerHTML = '';
	moddata.students.forEach((item) => {
		if (item.full_name.toLowerCase().includes(search)) {
			StudentListEditor.innerHTML += `<li><img src="../assets/images/simple_profile_photo.png" alt="profile photo">${item.full_name}</li>`;
		}
	});
	if (moddata.teacher.full_name.toLowerCase().includes(search)) {
		TeacherListEditor.innerHTML += `<li><img src="../assets/images/simple_profile_photo.png" alt="profile photo">${moddata.teacher.full_name}</li>`;
	}
});
