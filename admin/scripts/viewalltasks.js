import { Task } from '../../models/task.js';

let taskContainer = document.querySelector('#tasks__container');

let storageTasks = JSON.parse(localStorage.getItem('tasks'));
let tasks = [];

for (let task of storageTasks) {
	tasks.push(Task.constructObject(task));
}

let sectionTasks = tasks.filter((task) => !task.completed);

let pendingTasksElement = document.querySelector('#pendingTasks');
let completedTasksElement = document.querySelector('#completedTasks');
pendingTasksElement.addEventListener('click', () => {
	if (pendingTasksElement.classList.contains('section__active')) {
		return;
	} else {
		pendingTasksElement.classList.add('section__active');
		completedTasksElement.classList.remove('section__active');
		sectionTasks = tasks.filter((task) => !task.completed);
		renderTasks(sectionTasks);
	}
});

completedTasksElement.addEventListener('click', () => {
	if (completedTasksElement.classList.contains('section__active')) {
		return;
	} else {
		completedTasksElement.classList.add('section__active');
		pendingTasksElement.classList.remove('section__active');
		sectionTasks = tasks.filter((task) => task.completed);
		renderTasks(sectionTasks);
	}
});

let searchInput = document.querySelector('#search__input');
renderTasks(sectionTasks);

searchInput.addEventListener('keyup', () => {
	let value = searchInput.value.toLowerCase();
	let filteredTasks = sectionTasks.filter((task) =>
		task.title.toLowerCase().startsWith(value)
	);
	renderTasks(filteredTasks);
});

function renderTasks(pTasks) {
	taskContainer.innerHTML = '';
	for (let task of pTasks) {
		taskContainer.innerHTML += `
		<div class="task__card" data-set-id="${task.id}">
		<h3>${task.title}</h3>
		<p>
			${task.description}
		</p>
	
		<div class="task__property">
			<i class="fa-regular fa-flag"></i>
			<p>Priority: <span class="${task.getPriorityColor()}">${
			task.priority
		}</span></p>
		</div>
		<div class="task__property">
			<i class="fa-regular fa-calendar-days"></i>
			<p>Date: <span>${task.createdAt}</span></p>
		</div>
	</div>
		`;
	}

	let taskCards = document.querySelectorAll('.task__card');
	for (let card of taskCards) {
		card.addEventListener('click', () => {
			let id = card.getAttribute('data-set-id');
			localStorage.setItem(
				'selectedTask',
				JSON.stringify(tasks.find((task) => task.id == id))
			);
			window.location.href = './viewtaskdetails.html';
		});
	}
}

let popup = document.querySelector('#popup');
let addBtn = document.querySelector('.btn-add');
let cancelBtn = document.querySelector('#cancelBtn');

addBtn.addEventListener('click', () => {
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
	let newId = tasks[tasks.length - 1].id + 1;
	tasks.push(
		new Task(
			newId,
			title,
			description,
			teachers.find(
				(teacher) => teacher.id == teachersSelectBtn.getAttribute('data-set-id')
			),
			prioritySelectBtn.firstElementChild.innerText
		)
	);

	console.log(tasks);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	window.location.reload();
});
