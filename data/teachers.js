import { Teacher } from '../models/teacher.js';


if(!localStorage.getItem('teachers')){
	let teachers = [
	new Teacher(0, 'Mahmoud Nael', 'mahmoudmnael@gmail.com'),

	new Teacher(1, 'Ebrahim Mohsen', 'ebrahimmohsen@gmail.com'),

	new Teacher(2, 'Mazen Nayef', 'mazennayef@gmail.com'),

	new Teacher(3, 'Omar Hamed', 'omarhamed@gmail.com'),

	new Teacher(4, 'Mohammed Ahmed', 'mohammedahmed@gmail.com'),
];

localStorage.setItem('teachers', JSON.stringify(teachers));
}
