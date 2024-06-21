let classroomID = sessionStorage.getItem('classroomID');

//popup
let title = document.getElementById('Title');
let content2 = document.getElementById('Content2');
let isFocus = false;

title.onfocus = function () {
	title.classList.add('Focusing');
	isFocus = true;
};
content2.onfocus = function () {
	content2.classList.add('Focusing2');
	isFocus = true;
};
title.addEventListener('focusout', () => {
	if (isFocus && title.value.length == 0) {
		isFocus = false;
		title.classList.remove('Focusing');
		title.style.transitionDuration = '0.5s';
	}
});
content2.addEventListener('focusout', () => {
	if (isFocus && content2.value.length == 0) {
		isFocus = false;
		content2.classList.remove('Focusing2');
		content2.style.transitionDuration = '0.5s';
	}
});

let add = document.getElementById('add-btn');
add.addEventListener('click', () => {
	let blur = document.getElementById('blur');
	blur.classList.toggle('active');

	let box_2 = document.getElementById('Container');
	box_2.style.display = 'block';
});

let decline = document.getElementById('Decline');
decline.addEventListener('click', () => {
	let blur = document.getElementById('blur');
	blur.classList.toggle('active');

	let box_2 = document.getElementById('Container');
	box_2.style.display = 'none';
});

let save = document.getElementById('Accept');
save.addEventListener('click', () => {
	let titleContent = document.getElementById('Title');
	let typeContent = document.getElementById('Content2');
	let innerTitle = document.getElementById('label1');
	let innerType = document.getElementById('label2');
	if (titleContent.value.length == 0) {
		innerTitle.innerHTML = 'This Field Is Required, Please Fill Title';
		innerTitle.classList.add('verification');
		innerTitle.style.transitionDuration = '0.4s';
	}
	if (typeContent.value.length == 0) {
		innerType.innerHTML = 'This Field Is Required, Please Fill Content';
		innerType.classList.add('verification');
		innerType.style.transitionDuration = '0.4s';
	}
	if (titleContent.value.length > 0 && typeContent.value.length > 0) {
		let blur = document.getElementById('blur');
		blur.classList.toggle('active');

		let box_3 = document.getElementById('Container');
		box_3.style.display = 'none';

		innerTitle.classList.remove('verification');
		innerType.classList.remove('verification');
		innerTitle.innerHTML = 'Title';
		innerType.innerHTML = 'Content';
	}
});

//end

//post function

save.addEventListener('click', function addAssignments() {
	let title = document.getElementById('Title');
	let content = document.getElementById('Content2');
	let date = document.getElementById('Date');
	let request = new XMLHttpRequest();
	request.open(
		'POST',
		'http://localhost:8000/api/classrooms/' + classroomID + '/assignments/'
	); // put the port
	request.setRequestHeader('Content-Type', 'application/json');
	request.withCredentials = true;
	let data = {
		title: title.value,
		content: content.value,
		due_date: date.value,
	};
	console.log(data);
	request.send(JSON.stringify(data));
	location.reload();
});

//end

//get function
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
        <img src="../../assets/images/simple_profile_photo.png">
        <div class="username" >
            <a onclick="anchorOnClick(${i.id})" id="address">${i.title}</a> 
        </div>
        <p class="date">${i.created_at}</p>
        <p class="assi-content">${i.content}</p>
		<br>
		<button type="button" class="edit-btn" onclick="editAssignments(${i.id})"> edit</button>
		<button type="button" class="delete-btn" onclick="deleteAssignments(${i.id})"> delete </button>
        </div>
    `;
		}
	});
}
getAssignments(classroomID);

let anchorOnClick = (id) => {
	sessionStorage.setItem('assignmentID', id);
	window.location.href = 'View_Assignment.html';
};

//end
// put function
let titleAssignment = document.getElementById('Title-2');
let contentAssignment = document.getElementById('Content-edit');
let dateAssignment = document.getElementById('Date-2');

function editAssignments(id) {
	let blur = document.getElementById('blur');
	blur.classList.toggle('active');
	let box_2 = document.getElementById('Container-2');
	box_2.style.display = 'block';
	reqGET = new XMLHttpRequest();
	reqGET.open(
		'GET',
		'http://localhost:8000/api/classrooms/' +
			classroomID +
			'/assignments/' +
			id +
			'/'
	); //put port number
	reqGET.withCredentials = true;
	reqGET.send();
	reqGET.addEventListener('load', function () {
		let data = JSON.parse(reqGET.responseText);
		titleAssignment.value = data.title;
		contentAssignment.value = data.content;
		dateAssignment.value = data.created_at;
	});
	let edit = document.getElementById('Accept-2');
	edit.addEventListener('click', function () {
		reqPUT = new XMLHttpRequest();
		reqPUT.open(
			'PUT',
			'http://localhost:8000/api/classrooms/' +
				classroomID +
				'/assignments/' +
				id +
				'/'
		);
		reqPUT.withCredentials = true;
		reqPUT.setRequestHeader('Content-Type', 'application/json');
		let newdata = {
			title: titleAssignment.value,
			content: contentAssignment.value,
			due_date: dateAssignment.value,
		};
		reqPUT.send(JSON.stringify(newdata));
		location.reload();
	});
}

//end

// delete function
function deleteAssignments(id) {
	if (confirm('Are you sure you need to delete this announcment ?')) {
		req = new XMLHttpRequest();
		req.open(
			'DELETE',
			'http://localhost:8000/api/classrooms/' +
				classroomID +
				'/assignments/' +
				id +
				'/'
		);
		req.withCredentials = true;
		req.send();
		location.reload();
	}
}

// end

function cancelPopup() {
	let blur = document.getElementById('blur');
	blur.classList.toggle('active');
	let box_2 = document.getElementById('Container-2');
	box_2.style.display = 'none';
}
