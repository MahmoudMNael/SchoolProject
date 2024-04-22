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
