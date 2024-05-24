//registration related

let Registrationbtn = document.getElementById('Registrationbtn');

Registrationbtn.addEventListener('click', (e) => {
	const userNameInput = document.getElementById('reg-name');
	const userEmailInput = document.getElementById('reg-email');
	const userPassInput = document.getElementById('reg-pass');
	const userConfirmPassInput = document.getElementById('reg-confirm-pass');
	const userRoleInput = document.querySelector('input[name="role"]:checked');

	if (userPassInput.value.trim() != userConfirmPassInput.value.trim()) {
		alert('Password does not match');
		return;
	}

	let newUser = {
		full_name: userNameInput.value.trim(),
		email: userEmailInput.value.trim(),
		password: userPassInput.value.trim(),
		role: userRoleInput.value,
	};

	let registerRequest = new XMLHttpRequest();
	registerRequest.open(
		'POST',
		'http://localhost:8000/api/auth/register/',
		false
	);
	registerRequest.withCredentials = true;
	registerRequest.setRequestHeader('Content-Type', 'application/json');
	registerRequest.onload = () => {
		if (registerRequest.status >= 200 && registerRequest.status < 300) {
			alert('User created successfully! but pending the admin approval');
		} else {
			console.log('registration failed');
		}
	};
	registerRequest.send(JSON.stringify(newUser));
});

//registration finished

//login relateed

let loginbtn = document.getElementById('loginbtn');
loginbtn.addEventListener('click', (e) => {
	e.preventDefault();
	e.stopPropagation();

	const userEmailInput = document.getElementById('login-email');
	const userPassInput = document.getElementById('login-pass');

	let user = {
		email: userEmailInput.value.trim(),
		password: userPassInput.value.trim(),
	};

	let loginRequest = new XMLHttpRequest();
	loginRequest.open('POST', 'http://localhost:8000/api/auth/login/', false);
	loginRequest.withCredentials = true;
	loginRequest.setRequestHeader('Content-Type', 'application/json');
	loginRequest.onload = () => {
		if (loginRequest.status == 204) {
			alert('Your account is pending approval');
			return;
		}

		if (loginRequest.status >= 200 && loginRequest.status < 300) {
			let response = JSON.parse(loginRequest.responseText);
			console.log(response);
			console.log(loginRequest.getAllResponseHeaders());
			switch (response.role) {
				case 'admin':
					window.location.href = '/admin/classAdmin.html';
					break;

				case 'teacher':
					window.location.href = '/teacher/ClassAll.html';
					break;

				case 'student':
					window.location.href = '/student/ClassAll.html';
					break;
			}
		} else {
			alert('Login failed');
		}
	};
	loginRequest.send(JSON.stringify(user));
});
//login done
