import { Task } from '../models/task.js';


if(!localStorage.getItem('tasks')){

let [tempTeacher] = JSON.parse(localStorage.getItem('teachers'));

let tasks = [
	new Task(
		0,
		'Task 1',
		`1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
	non? Voluptatum suscipit, veritatis consequuntur quae facilis sint
	tenetur non nostrum accusantium perspiciatis, recusandae, rem
	mollitia in. Saepe optio odit nesciunt!`,
		tempTeacher,
		'High'
	),

	new Task(
		1,
		'Task 2',
		`2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
	non? Voluptatum suscipit, veritatis consequuntur quae facilis sint
	tenetur non nostrum accusantium perspiciatis, recusandae, rem
	mollitia in. Saepe optio odit nesciunt!`,
		tempTeacher,
		'Medium'
	),

	new Task(
		2,
		'Task 3',
		`3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
	non? Voluptatum suscipit, veritatis consequuntur quae facilis sint
	tenetur non nostrum accusantium perspiciatis, recusandae, rem
	mollitia in. Saepe optio odit nesciunt!`,
		tempTeacher,
		'Low'
	),

	new Task(
		3,
		'Task 4',
		`4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
	non? Voluptatum suscipit, veritatis consequuntur quae facilis sint
	tenetur non nostrum accusantium perspiciatis, recusandae, rem
	mollitia in. Saepe optio odit nesciunt!`,
		tempTeacher,
		'High'
	),
];

localStorage.setItem('tasks', JSON.stringify(tasks));
}
