var tasks = [];
var sectionTasks = [];

const login = () => {
	//login
	let loginRequest = new XMLHttpRequest();
	loginRequest.open('POST', 'http://localhost:8000/api/auth/login/', false);
	loginRequest.withCredentials = true;
	loginRequest.setRequestHeader('Content-Type', 'application/json');
	loginRequest.onload = () => {
		if (loginRequest.status == 200) {
			console.log('login success');
		} else {
			console.log('login failed');
		}
	};
	loginRequest.send(
		JSON.stringify({ email: 'teacher9@gmail.com', password: '1234' })
	);
};

const getTasksFromAPI = () => {
	login();
	//get tasks
	return new Promise((resolve, reject) => {
		let tasksRequest = new XMLHttpRequest();
		tasksRequest.open('GET', 'http://localhost:8000/api/tasks/', true);
		tasksRequest.withCredentials = true;
		tasksRequest.onload = () => {
			if (tasksRequest.status >= 200) {
				console.log('get tasks success');
				resolve(tasksRequest.responseText);
			} else {
				console.log('get tasks failed');
				reject({
					status: tasksRequest.status,
					statusText: tasksRequest.statusText,
				});
			}
		};
		tasksRequest.send();
	});
};

window.addEventListener('load', () => {
	getTasksFromAPI().then((data) => {
		tasks = JSON.parse(data);
		sectionTasks = tasks.filter((task) => !task.is_done);
		renderTasks(sectionTasks);
	});
});

let pendingTasksElement = document.querySelector('#pendingTasks');
let completedTasksElement = document.querySelector('#completedTasks');
pendingTasksElement.addEventListener('click', () => {
	if (pendingTasksElement.classList.contains('section__active')) {
		return;
	} else {
		pendingTasksElement.classList.add('section__active');
		completedTasksElement.classList.remove('section__active');
		sectionTasks = tasks.filter((task) => !task.is_done);
		renderTasks(sectionTasks);
	}
});

completedTasksElement.addEventListener('click', () => {
	if (completedTasksElement.classList.contains('section__active')) {
		return;
	} else {
		completedTasksElement.classList.add('section__active');
		pendingTasksElement.classList.remove('section__active');
		sectionTasks = tasks.filter((task) => task.is_done);
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

function getPriorityColor(task) {
	if (task.priority === 'low') {
		return 'safe';
	} else if (task.priority === 'medium') {
		return 'warning';
	} else {
		return 'danger';
	}
}

function renderTasks(pTasks) {
	let taskContainer = document.querySelector('#tasks__container');
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
			<p>Priority: <span class="${getPriorityColor(task)}">${task.priority}</span></p>
		</div>
		<div class="task__property">
			<i class="fa-regular fa-calendar-days"></i>
			<p>Date: <span>${task.created_at}</span></p>
		</div>
	</div>
		`;
	}

	let taskCards = document.querySelectorAll('.task__card');
	for (let card of taskCards) {
		card.addEventListener('click', () => {
			let id = card.getAttribute('data-set-id');
			sessionStorage.setItem('taskID', id);
			window.location.href = './viewtaskdetails.html';
		});
	}
}
