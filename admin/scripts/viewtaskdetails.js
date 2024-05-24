var selectedTask = {};

const getTaskFromAPI = () => {
	let id = sessionStorage.getItem('taskID');
	return new Promise((resolve, reject) => {
		let taskRequest = new XMLHttpRequest();
		taskRequest.open('GET', `http://localhost:8000/api/tasks/${id}/`, true);
		taskRequest.withCredentials = true;
		taskRequest.onload = () => {
			if (taskRequest.status >= 200 && taskRequest.status < 300) {
				console.log('get task success');
				resolve(taskRequest.responseText);
			} else {
				console.log('get task failed');
				reject({
					status: taskRequest.status,
					statusText: taskRequest.statusText,
				});
			}
		};
		taskRequest.send();
	});
};

function getPriorityColor(task) {
	if (task.priority === 'low') {
		return 'safe';
	} else if (task.priority === 'medium') {
		return 'warning';
	} else {
		return 'danger';
	}
}

window.addEventListener('load', () => {
	getTaskFromAPI().then((data) => {
		selectedTask = JSON.parse(data);
		let mainSection = document.querySelector('.main');
		document.querySelector('#main__title').innerText = selectedTask.title;
		document.querySelector(
			'#task__priority'
		).innerHTML += `<span class="${getPriorityColor(selectedTask)}">${
			selectedTask.priority
		}</span>`;
		document.querySelector(
			'#task__date'
		).innerHTML += `<span>${selectedTask.created_at}</span>`;
		document.querySelector('#task__teacher').innerHTML += `<span
		>${selectedTask.teacher.full_name}
		(${selectedTask.teacher.email})</span>`;
		document.querySelector('#task__description').innerText =
			selectedTask.description;
	});
});

let editButton = document.querySelector('#editButton');
let deleteButton = document.querySelector('#deleteButton');

deleteButton.addEventListener('click', () => {
	if (confirm('Are you sure you want to delete this task?')) {
		let deleteRequest = new XMLHttpRequest();
		deleteRequest.open(
			'DELETE',
			`http://localhost:8000/api/tasks/${selectedTask.id}/`,
			true
		);
		deleteRequest.withCredentials = true;
		deleteRequest.onload = () => {
			if (deleteRequest.status >= 200 && deleteRequest.status < 300) {
				alert('Task deleted successfully!');
			} else {
				alert('Task deletion failed!');
			}
		};
		deleteRequest.send();

		window.location.href = './viewalltasks.html';
	}
});

let popup = document.querySelector('#popup');
let cancelBtn = document.querySelector('#cancelBtn');

var teachers = [];
var gSelectedTeacher = null;

const getTeachersFromAPI = () => {
	return new Promise((resolve, reject) => {
		let teachersRequest = new XMLHttpRequest();
		teachersRequest.open(
			'GET',
			'http://localhost:8000/api/users/teacher/',
			true
		);
		teachersRequest.withCredentials = true;
		teachersRequest.onload = () => {
			if (teachersRequest.status >= 200 && teachersRequest.status < 300) {
				console.log('get teachers success');
				resolve(teachersRequest.responseText);
			} else {
				reject({
					status: teachersRequest.status,
					statusText: teachersRequest.statusText,
				});
				console.log('get teachers failed');
			}
		};
		teachersRequest.send();
	});
};

editButton.addEventListener('click', () => {
	console.log('edit button clicked');
	popup.classList.add('popup__active');
	document.body.style.overflow = 'hidden';
	document.querySelector('#titleInput').value = selectedTask.title;
	document.querySelector('#descInput').value = selectedTask.description;

	getTeachersFromAPI().then((data) => {
		teachers = JSON.parse(data);
		addTeacher();
		addPriority();
		updateTeacher(selectedTask.teacher.id);
		updatePriority(selectedTask.priority);
	});
});

cancelBtn.addEventListener('click', () => {
	popup.classList.remove('popup__active');
	document.body.style.overflow = 'auto';
});

const teachersDropdownWrapper = document.querySelector(
	'#teachersDropdownWrapper'
);
const teachersSelectBtn = document.querySelector('#teachersSelectBtn');
const teachersOptions = document.querySelector('#teachersOptions');
const teachersSearch = document.querySelector('#teachersSearch');

function refreshTeachersLiEventListeners() {
	let teachersOptionsLi = document.querySelectorAll('#teachersOptions li');
	for (let li of teachersOptionsLi) {
		li.addEventListener('click', () => {
			updateTeacher(li.getAttribute('data-set-id'));
		});
	}
}

function updateTeacher(id) {
	teachersSearch.value = '';
	addTeacher(id);
	teachersDropdownWrapper.classList.remove('active');
	teachersSelectBtn.firstElementChild.innerText = teachers.find(
		(teacher) => teacher.id == id
	).full_name;
	teachersSelectBtn.setAttribute('data-set-id', id);
	teachersSelectBtn.setAttribute('data-selected', 'true');
}

function addTeacher(selectedTeacher) {
	teachersOptions.innerHTML = '';
	for (let teacher of teachers) {
		let isSelected = '';
		if (selectedTeacher) {
			if (teacher.id == selectedTeacher) {
				isSelected = 'selected';
				gSelectedTeacher = teacher.id;
			}
		}
		let li = `<li data-set-id="${teacher.id}" class="${isSelected}">${teacher.full_name}<br />${teacher.email}</li>`;
		teachersOptions.insertAdjacentHTML('beforeend', li);
		refreshTeachersLiEventListeners();
	}
}

addTeacher();

teachersSearch.addEventListener('keyup', () => {
	let filteredTeachers = [];
	let searchedValue = teachersSearch.value.toLowerCase();
	filteredTeachers = teachers.filter((teacher) => {
		return (
			teacher.full_name.toLowerCase().startsWith(searchedValue) ||
			teacher.email.toLowerCase().startsWith(searchedValue)
		);
	});
	let li = filteredTeachers
		.map(
			(data) =>
				`<li class="${
					data.id == gSelectedTeacher ? 'selected' : ''
				}" data-set-id="${data.id}">${data.full_name}<br />${data.email}</li>`
		)
		.join('');
	teachersOptions.innerHTML = li ? li : `<p>Ooops! Teacher not found!</p>`;
	refreshTeachersLiEventListeners();
});

teachersSelectBtn.addEventListener('click', () => {
	teachersDropdownWrapper.classList.toggle('active');
	refreshTeachersLiEventListeners();
});

const priorityDropdownWrapper = document.querySelector(
	'#priorityDropdownWrapper'
);
const prioritySelectBtn = document.querySelector('#prioritySelectBtn');
const priorityOptions = document.querySelector('#priorityOptions');

let priorities = ['low', 'medium', 'high'];

function refreshPriorityLiEventListeners() {
	let priorityOptionsLi = document.querySelectorAll('#priorityOptions li');
	for (let li of priorityOptionsLi) {
		li.addEventListener('click', (e) => {
			updatePriority(e.target.childNodes[0].data);
		});
	}
}

function addPriority(selectedPriority) {
	priorityOptions.innerHTML = '';
	for (let priority of priorities) {
		let isSelected = '';
		if (selectedPriority) {
			if (priority === selectedPriority) {
				isSelected = 'selected';
			}
		}
		let li = `<li class="${isSelected}">${priority}</li>`;
		priorityOptions.insertAdjacentHTML('beforeend', li);
		refreshPriorityLiEventListeners();
	}
}
addPriority();

function updatePriority(selected) {
	addPriority(selected);
	priorityDropdownWrapper.classList.remove('active');
	prioritySelectBtn.firstElementChild.innerText = selected;
	prioritySelectBtn.setAttribute('data-selected', 'true');
	refreshPriorityLiEventListeners();
}

prioritySelectBtn.addEventListener('click', () => {
	priorityDropdownWrapper.classList.toggle('active');
});

let submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', () => {
	let title = document.querySelector('#titleInput').value;
	let description = document.querySelector('#descInput').value;
	if (
		teachersSelectBtn.getAttribute('data-selected') != 'true' ||
		prioritySelectBtn.getAttribute('data-selected') != 'true' ||
		!title ||
		!description
	) {
		alert('Please fill all the fields!');
		return;
	}

	let updatedTask = {
		title,
		description,
		teacher_id: gSelectedTeacher,
		priority: prioritySelectBtn.firstElementChild.innerText.toLowerCase(),
		is_done: selectedTask.is_done,
	};

	let updateTaskRequest = new XMLHttpRequest();
	updateTaskRequest.open(
		'PUT',
		`http://localhost:8000/api/tasks/${selectedTask.id}/`,
		false
	);
	updateTaskRequest.withCredentials = true;
	updateTaskRequest.setRequestHeader('Content-Type', 'application/json');
	updateTaskRequest.onload = () => {
		if (updateTaskRequest.status >= 200 && updateTaskRequest.status < 300) {
			console.log('add task success');
		} else {
			console.log('add task failed');
		}
	};
	updateTaskRequest.send(JSON.stringify(updatedTask));

	window.addEventListener('beforeunload', (event) => {
		if (updateTaskRequest.readyState == 4) return;
		event.preventDefault();
		event.returnValue = '';
	});

	window.location.reload();
});
