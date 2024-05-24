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

		let completedBtn = document.querySelector('#markCompleted');

		completedBtn.innerText = selectedTask.is_done
			? 'Completed'
			: 'Mark as Completed';

		completedBtn.classList.add(selectedTask.is_done ? 'disabled__button' : '');
	});
});

const markAsCompleted = () => {
	let id = selectedTask.id;
	return new Promise((resolve, reject) => {
		let taskRequest = new XMLHttpRequest();
		taskRequest.open('PATCH', `http://localhost:8000/api/tasks/${id}/`, true);
		taskRequest.withCredentials = true;
		taskRequest.setRequestHeader('Content-Type', 'application/json');
		taskRequest.onload = () => {
			if (taskRequest.status >= 200 && taskRequest.status < 300) {
				console.log('mark as completed success');
				resolve(taskRequest.responseText);
			} else {
				console.log('mark as completed failed');
				reject({
					status: taskRequest.status,
					statusText: taskRequest.statusText,
				});
			}
		};
		taskRequest.send(
			JSON.stringify({
				is_done: !selectedTask.is_done,
			})
		);
	});
};

let markCompletedButton = document.getElementById('markCompleted');
markCompletedButton.addEventListener('click', () => {
	markAsCompleted().then((data) => {
		console.log(JSON.parse(data));
	});
	window.location.reload();
});
