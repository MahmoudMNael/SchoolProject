import { Task } from '../../models/task.js';

let storageSelectedTask = JSON.parse(localStorage.getItem('selectedTask'));
let selectedTask = Task.constructObject(storageSelectedTask);

let storageTasks = JSON.parse(localStorage.getItem('tasks'));
let tasks = [];

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
				<button id="markCompleted" class="task__button ${
					selectedTask.completed ? 'disabled__button' : ''
				}">${
	selectedTask.completed ? 'Completed' : 'Mark as Completed'
}</button>
			</div>
			<p class="task__description">
				${selectedTask.description}
			</p>
			`;

let markCompletedButton = document.getElementById('markCompleted');
markCompletedButton.addEventListener('click', () => {
	selectedTask.markAsCompleted();
	let index = tasks.indexOf(tasks.find((task) => task.id == selectedTask.id));
	tasks[index] = selectedTask;
	localStorage.setItem('tasks', JSON.stringify(tasks));
	localStorage.setItem('selectedTask', JSON.stringify(tasks[index]));
	window.location.reload();
});
