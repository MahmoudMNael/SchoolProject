import { Task } from '../../models/task.js';

let storageSelectedTask = JSON.parse(localStorage.getItem('selectedTask'));
let selectedTask = Task.constructObject(storageSelectedTask);

let storageTasks = JSON.parse(localStorage.getItem('tasks'));
let tasks = [];

storageTasks = [];

for (let task of storageTasks) {
	tasks.push(Task.constructObject(task));
}

let mainSection = document.querySelector('.main');
mainSection.innerHTML = `
<div class="section__header">
				<div>
					<h1 id="main__title">${selectedTask.title}</h1>
					<h2 class="task__property">
						<i class="fa-regular fa-flag"></i> Priority:
						<span class="${selectedTask.getPriorityColor()}">${selectedTask.priority}</span>
					</h2>
					<h2 class="task__property">
						<i class="fa-regular fa-calendar-days"></i> Date:
						<span>${selectedTask.createdAt}</span>
					</h2>
					<h2 class="task__property">
						<i class="fa-regular fa-user"></i> Teacher:
						<span>${selectedTask.teacher.name} (${selectedTask.teacher.email})</span>
					</h2>
				</div>
				<div class="task__buttons__container">
					<button class="task__button edit__button" id="editButton">
						Edit
					</button>
					<button class="task__button delete__button" id="deleteButton">
						Delete
					</button>
				</div>
			</div>
			<p class="task__description">
				${selectedTask.description}
			</p>
			`;

let editButton = document.querySelector('#editButton');
let deleteButton = document.querySelector('#deleteButton');

deleteButton.addEventListener('click', () => {
	if (confirm('Are you sure you want to delete this task?')) {
		let index = tasks.indexOf(tasks.find((task) => task.id == selectedTask.id));
		tasks.splice(index, 1);
		localStorage.setItem('tasks', JSON.stringify(tasks));
		window.location.href = './viewalltasks.html';
	}
});

let popup = document.querySelector('#popup');
let cancelBtn = document.querySelector('#cancelBtn');

editButton.addEventListener('click', () => {
	popup.classList.add('popup__active');
	document.body.style.overflow = 'hidden';
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

let teachers = JSON.parse(localStorage.getItem('teachers'));

function updateTeacher(id) {
	teachersSearch.value = '';
	addTeacher(id);
	teachersDropdownWrapper.classList.remove('active');
	teachersSelectBtn.firstElementChild.innerText = teachers.find(
		(teacher) => teacher.id == id
	).name;
	teachersSelectBtn.setAttribute('data-set-id', id);
	teachersSelectBtn.setAttribute('data-selected', 'true');
}

let gSelectedTeacher = null;

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
		let li = `<li data-set-id="${teacher.id}" class="${isSelected}">${teacher.name}<br />${teacher.email}</li>`;
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
			teacher.name.toLowerCase().startsWith(searchedValue) ||
			teacher.email.toLowerCase().startsWith(searchedValue)
		);
	});
	let li = filteredTeachers
		.map(
			(data) =>
				`<li class="${
					data.id == gSelectedTeacher ? 'selected' : ''
				}" data-set-id="${data.id}">${data.name}<br />${data.email}</li>`
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

let priorities = ['Low', 'Medium', 'High'];

function refreshPriorityLiEventListeners() {
	let priorityOptionsLi = document.querySelectorAll('#priorityOptions li');
	for (let li of priorityOptionsLi) {
		li.addEventListener('click', (e) => {
			updatePriority(e);
		});
	}
}

function addPriority(selectedPriority) {
	priorityOptions.innerHTML = '';
	for (let priority of priorities) {
		let isSelected = '';
		if (selectedPriority) {
			if (priority === selectedPriority.childNodes[0].data) {
				isSelected = 'selected';
			}
		}
		let li = `<li class="${isSelected}">${priority}</li>`;
		priorityOptions.insertAdjacentHTML('beforeend', li);
		refreshPriorityLiEventListeners();
	}
}
addPriority();

function updatePriority(e) {
	addPriority(e.target);
	priorityDropdownWrapper.classList.remove('active');
	prioritySelectBtn.firstElementChild.innerText = e.target.childNodes[0].data;
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
	let index = tasks.indexOf(tasks.find((task) => task.id == selectedTask.id));

	tasks[index] = new Task(
		selectedTask.id,
		title,
		description,
		teachers.find((teacher) => teacher.id == gSelectedTeacher),
		prioritySelectBtn.firstElementChild.innerText
	);

	localStorage.setItem('tasks', JSON.stringify(tasks));
	localStorage.setItem('selectedTask', JSON.stringify(tasks[index]));
	window.location.reload();
});
