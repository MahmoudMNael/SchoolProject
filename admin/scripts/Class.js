let userCards = document.querySelector('[data-user-card-container]');

var classrooms = [];

const getClasses = () => {
	return new Promise((resolve, reject) => {
		let classRequest = new XMLHttpRequest();
		classRequest.open('GET', 'http://localhost:8000/api/classrooms/', true);
		classRequest.withCredentials = true;
		classRequest.onload = () => {
			if (classRequest.status >= 200 && classRequest.status < 300) {
				resolve(classRequest.responseText);
			} else {
				console.log('failed to fetch classes');
				reject({
					status: classRequest.status,
					statusText: classRequest.statusText,
				});
			}
		};
		classRequest.send();
	});
};

getClasses()
	.then((data) => {
		classrooms = JSON.parse(data);
		for (const classroom of classrooms) {
			userCards.innerHTML += `
			<div class="class" data-set-id=${classroom.id}>
			<img
				class="classimg"
				src="/assets/images/—Pngtree—school logo_6846798.png"
				alt=""
			/>
			<div class="words">
				<p class="line">Classroom ID: ${classroom.id}</p>
				<p class="line" data-header>Classroom Name: ${classroom.name}</p>
				<p class="line" data-body>Teacher: ${classroom.teacher.full_name}</p>
			</div>
		</div>`;

			//used to make cards navigatble
		}
		let classCards = document.querySelectorAll('.class');
		console.log(classCards);
		for (let classobj of classCards) {
			classobj.addEventListener('click', () => {
				let id = classobj.getAttribute('data-set-id');
				sessionStorage.setItem('classroomID', id);
				window.location.href = 'Admin-announcement.html';
			});
		}
	})
	.catch((error) => {
		console.log(error);
	});

const createClassForm = document.getElementById('createClassForm');

const createrInput = document.getElementById('classCreater');

createClassForm.addEventListener('submit', (event) => {
	// Prevent default form submission
	event.preventDefault();
	const classNameInput = document.getElementById('className');
	const name = classNameInput.value.trim();
	const teacher_id = gSelectedTeacher;
	let newClassroom = {
		name,
		teacher_id,
	};

	let createClassRequest = new XMLHttpRequest();
	createClassRequest.open(
		'POST',
		'http://localhost:8000/api/classrooms/',
		true
	);
	createClassRequest.setRequestHeader('Content-Type', 'application/json');
	createClassRequest.withCredentials = true;
	createClassRequest.onload = () => {
		if (createClassRequest.status >= 200 && createClassRequest.status < 300) {
			console.log('class created');
			location.reload();
		} else {
			console.log('failed to create class');
		}
	};
	createClassRequest.send(JSON.stringify(newClassroom));
});

function closePopUp() {
	let x = document.getElementById('addClass');
	x.style.opacity = '0%';
	x.style.visibility = 'hidden';
}

let addclassbtn = document.getElementById('addClassbtn');

var teachers = [];

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
			if (teachersRequest.status >= 200) {
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

let addClassBtnOnClick = () => {
	getTeachersFromAPI().then((data) => {
		teachers = JSON.parse(data);
		addTeacher();
	});
	let x = document.getElementById('addClass');
	x.style.opacity = '100%';
	x.style.visibility = 'visible';
};

let closepopupbtn = document.getElementById('closePopupbtn');

closepopupbtn.addEventListener('click', () => {
	closePopUp();
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
