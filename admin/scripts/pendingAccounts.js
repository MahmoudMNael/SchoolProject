/* Pending Account Detail Get Data */
let req = new XMLHttpRequest();
let body = document.getElementById('pendingAccountsBody');
req.open('GET', 'http://localhost:8000/api/auth/pending/', false);
req.withCredentials = true;
req.addEventListener('load', function () {
	if (req.status === 200) {
		var res = JSON.parse(req.responseText);
		console.log(res);
		for (let i = 0; i < res.data.length; i++) {
			body.innerHTML += `
      <div id="card" data-set-id="${res.data[i].id}">
        <div id="content">
          <div id="nameInfo">
            <img src="../Res/profile-user.png" alt="">
            <span>${res.data[i].full_name}</span>
          </div>  
          Requested To Join As <span class="${res.data[i].role}">${res.data[i].role}</span>
        </div>
        <i class="fa-solid fa-check" id = "${res.data[i].id}"></i>
        <i class="fa-solid fa-xmark" id = "${res.data[i].id}"></i>
      </div>
    `;
			let roleColorRed = document.getElementsByClassName('admin');
			for (const element of roleColorRed) {
				element.style.color = 'Red';
			}
			let roleColorGreen = document.getElementsByClassName('student');
			for (const element of roleColorGreen) {
				element.style.color = 'Green';
			}
			let roleColorYellow = document.getElementsByClassName('teacher');
			for (const element of roleColorYellow) {
				element.style.color = '#ffc107';
			}
		}
	} else {
		console.error('Bad Request :(');
	}
});
req.send();
/* End of Pending Account */

/* Control Panel */
let control_panel = document.getElementById('control_panel');
let control = new XMLHttpRequest();
control.open('GET', 'http://localhost:8000/api/auth/pending/', false);
control.setRequestHeader('Content-Type', 'application/json');
control.withCredentials = true;
control.addEventListener('load', function () {
	if (control.status === 200) {
		var res = JSON.parse(control.responseText);
		control_panel.innerHTML = `
  <aside>
    <div class="no_teacher">
      <div class="no_teacher_text">
        Number of Teacher: ${res.teachers_count}.
      </div>
    </div>
    <div class="no_student">
      <div class="no_student_text">
        Number of Student: ${res.students_count}.
      </div>
    </div>
  </aside>
  `;
	}
});
control.send();

/* Buttons Work */
let accept = document.getElementsByClassName('fa-check');
let decline = document.getElementsByClassName('fa-xmark');
console.log(accept);
for (let element of accept) {
	element.addEventListener('click', function () {
		let id = element.getAttribute('id');
		console.log(id);
		let approve = new XMLHttpRequest();
		approve.open(
			'POST',
			'http://localhost:8000/api/auth/pending/' + id + '/',
			true
		);
		approve.setRequestHeader('Content-Type', 'application/json');
		approve.withCredentials = true;
		approve.send();
		location.reload();
	});
}
for (const element of decline) {
	element.addEventListener('click', function () {
		let id = element.getAttribute('id');
		console.log(id);
		let rejected = new XMLHttpRequest();
		rejected.open(
			'DELETE',
			'http://localhost:8000/api/auth/pending/' + id + '/',
			true
		);
		rejected.setRequestHeader('Content-Type', 'application/json');
		rejected.withCredentials = true;
		rejected.send();
		location.reload();
	});
}
/* End of Buttons Work */
