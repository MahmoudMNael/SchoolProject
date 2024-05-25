let classroom_id = sessionStorage.getItem('classroomID');
let assignment_id = sessionStorage.getItem('assignmentID');

/* Comment Get Data */
let com = new XMLHttpRequest();
let comment = document.getElementById('comment_section');
com.open(
	'GET',
	`http://localhost:8000/api/classrooms/${classroom_id}/assignments/${assignment_id}/comments/`,
	true
);
com.setRequestHeader('Content-Type', 'application/json');
com.withCredentials = true;
com.addEventListener('load', function () {
	if (com.status === 200) {
		var res = JSON.parse(com.responseText);
		console.log(res);
		for (let i = 0; i < 150; i++) {
			comment.innerHTML += `
        <div class="card_comment">
        <div class="commenter">
        <img src="../Res/profile-user.png" alt="" class="profile_user">
          ${res[i].created_by.full_name}
        </div>  
        <div class="comment_content">
          ${res[i].content}
        </div>
        </div>  
      `;
		}
	} else {
		console.error('Bad Request :(');
	}
});
com.send();
/* Comment Request End */

/* Assignment Maker Detail Get Data */
let req = new XMLHttpRequest();
let details = document.getElementById('Header');
req.open(
	'GET',
	`http://localhost:8000/api/classrooms/${classroom_id}/assignments/${assignment_id}/`,
	false
);
req.setRequestHeader('Content-Type', 'application/json');
req.withCredentials = true;
req.addEventListener('load', function () {
	if (req.status === 200) {
		var res = JSON.parse(req.responseText);
		console.log(res);
		details.innerHTML = `
      <img src="../Res/Logo_Assignments.png" alt="">
      <div class="assignment">
        <H1>${res.title}</H1>
        <p><span>Published at: </span>${res.created_at}</p>
        <p><span>Due at: </span>${res.due_date}</p>
      </div>
    `;
	} else {
		console.error('Bad Request :(');
	}
});
req.send();
/* End of Assignment Maker */

/* Assignment Content Detail Get Data */
let content = document.getElementById('Content');
req.open(
	'GET',
	`http://localhost:8000/api/classrooms/${classroom_id}/assignments/${assignment_id}/`,
	true
);
req.withCredentials = true;
req.addEventListener('load', function () {
	if (req.status === 200) {
		var res = JSON.parse(req.responseText);
		console.log(res);
		content.innerHTML = `
      <p>
      ${res.content}
      </p>    
    `;
	} else {
		console.error('Bad Request :(');
	}
});
req.send();
/* Assignment Content End */

/* Buttons Work */
// let title = document.getElementById('Title');
let title2 = document.getElementById('Title2');
let title3 = document.getElementById('Title3');
let isFocus = false;

/*
title.onfocus = function() {
  title.classList.add('Focusing');
  isFocus = true;
}
title.addEventListener("focusout" , () =>{
  if (isFocus && title.value.length == 0) {
    isFocus = false;
    title.classList.remove('Focusing'); 
    title.style.transitionDuration = "0.5s";
  }
});
*/

title3.onfocus = function () {
	title3.classList.add('Focusing');
	isFocus = true;
};
title3.addEventListener('focusout', () => {
	if (isFocus && title3.value.length == 0) {
		isFocus = false;
		title3.classList.remove('Focusing');
		title3.style.transitionDuration = '0.5s';
	}
});

title2.onfocus = function () {
	title2.classList.add('Focusing');
	isFocus = true;
};
title2.addEventListener('focusout', () => {
	if (isFocus && title2.value.length == 0) {
		isFocus = false;
		title2.classList.remove('Focusing');
		title2.style.transitionDuration = '0.5s';
	}
});

let toggle = document.getElementById('cmnt_btn');
toggle.addEventListener('click', () => {
	let blur = document.getElementById('blur');
	blur.classList.toggle('active');

	let box_1 = document.getElementById('Container');
	box_1.style.display = 'block';
});

let submit = document.getElementById('SubmitBtn');
submit.addEventListener('click', () => {
	let blur = document.getElementById('blur');
	blur.classList.toggle('active');

	let box_2 = document.getElementById('Container2');
	box_2.style.display = 'block';
});

let remove = document.getElementById('Decline');
remove.addEventListener('click', () => {
	let blur = document.getElementById('blur');
	blur.classList.toggle('active');

	let box_1 = document.getElementById('Container');
	box_1.style.display = 'none';

	let box_2 = document.getElementById('Container2');
	box_2.style.display = 'none';
});

let remove2 = document.getElementById('Decline2');
remove2.addEventListener('click', () => {
	let blur = document.getElementById('blur');
	blur.classList.toggle('active');

	let box_1 = document.getElementById('Container');
	box_1.style.display = 'none';

	let box_2 = document.getElementById('Container2');
	box_2.style.display = 'none';
});

let save = document.getElementById('Accept');
save.addEventListener('click', () => {
	let comment = document.getElementById('Title3');
	let innerComment = document.getElementById('label3');
	if (comment.value.length == 0) {
		innerComment.innerHTML = 'This Field Is Required, Please Fill Comment';
		innerComment.classList.add('verification');
		innerComment.style.transitionDuration = '0.4s';
	}

	if (comment.value.length > 0) {
		let blur = document.getElementById('blur');
		blur.classList.toggle('active');

		let box_1 = document.getElementById('Container');
		box_1.style.display = 'none';

		innerComment.innerHTML = 'Comment';
	}
});

let save2 = document.getElementById('Accept2');
save2.addEventListener('click', () => {
	let typeContent = document.getElementById('Title2');
	let innerType = document.getElementById('label2');
	if (typeContent.value.length == 0) {
		innerType.innerHTML = 'This Field Is Required, Please Fill Link';
		innerType.classList.add('verification');
		innerType.style.transitionDuration = '0.4s';
	}
	if (typeContent.value.length > 0) {
		let blur = document.getElementById('blur');
		blur.classList.toggle('active');

		let box_2 = document.getElementById('Container2');
		box_2.style.display = 'none';

		innerType.classList.remove('verification');
		innerType.innerHTML = 'Your Submit Link';
	}
});

// let logoutPopup = document.getElementById('logout');
// logoutPopup.addEventListener('click', () => {
// 	if (confirm('Are You sure You Want To Logout') == 1) {
// 		window.location.href = '#';
// 	}
// });
/* End of Buttons */

/* Send Comments Here */
const sendHttpRequest = (method, url, data) => {
	const promise = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.withCredentials = true;
		xhr.responseType = 'json';
		if (data) {
			xhr.setRequestHeader('Content-Type', 'application/json');
		}
		xhr.onload = () => {
			resolve(xhr.response);
		};
		xhr.send(JSON.stringify(data));
	});
	return promise;
};

const getData = () => {
	sendHttpRequest('GET', '').then((responseData) => {
		console.log(responseData);
	});
};

const sendDataComment = () => {
	let content = document.getElementById('Title3').value;
	if (content) {
		sendHttpRequest(
			'POST',
			`http://localhost:8000/api/classrooms/${classroom_id}/assignments/${assignment_id}/comments/`,
			{
				content,
			}
		).then((data) => {
			location.reload();
		});
	}
};

const sendDataLink = () => {
	let link = document.getElementById('Title2').value;
	if (link) {
		sendHttpRequest(
			'POST',
			`http://localhost:8000/api/classrooms/${classroom_id}/assignments/${assignment_id}/submissions/`,
			{
				link,
			}
		);
	}
};
/* End of Sending Data */
