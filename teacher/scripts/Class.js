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
				window.location.href = 'Teacher-Announcements.html';
			});
		}
	})
	.catch((error) => {
		console.log(error);
	});
