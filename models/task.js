class Task {
	constructor(id, title, description, teacher, priority) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.createdAt = new Date().toDateString();
		this.teacher = teacher;
		this.priority = priority;
		this.completed = false;
	}

	static constructObject({
		id,
		title,
		description,
		teacher,
		priority,
		createdAt,
		completed,
	}) {
		let task = new Task();
		task.id = id;
		task.title = title;
		task.description = description;
		task.createdAt = createdAt;
		task.teacher = teacher;
		task.priority = priority;
		task.completed = completed;
		return task;
	}

	markAsCompleted() {
		if (confirm('Are you sure you want to mark this task as completed?')) {
			this.completed = true;
		}
	}

	getPriorityColor() {
		if (this.priority === 'High') {
			return 'danger';
		} else if (this.priority === 'Medium') {
			return 'warning';
		} else {
			return 'safe';
		}
	}
}

export { Task };
