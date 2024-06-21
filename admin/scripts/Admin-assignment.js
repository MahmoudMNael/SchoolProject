let classroomID = sessionStorage.getItem('classroomID');

//get function
getAssignments(classroomID); // put the active class
let assiTxt = document.getElementById('assi-txt');
function getAssignments(class_id) {
	let request = new XMLHttpRequest();
	request.open(
		'GET',
		'http://localhost:8000/api/classrooms/' + class_id + '/assignments/'
	); //put the port
	request.withCredentials = true;
	request.send();
	request.addEventListener('load', function () {
		let data = JSON.parse(request.responseText);
		for (let i of data) {
			assiTxt.innerHTML += `<div class="assi-txt2" data-set-id="${i.id}">
        <img src="/assets/images/simple_profile_photo.png">
        <div class="username" >
            <a onclick="anchorOnClick(${i.id})" id="address">${i.title}</a>
        </div>
        <p class="date">${i.created_at}</p>
        <p class="assi-content">${i.content}</p>
        </div>
    `;
		}
	});
}
//end

let anchorOnClick = (id) => {
	sessionStorage.setItem('assignmentID', id);
	window.location.href = 'View_Assignment.html';
};
