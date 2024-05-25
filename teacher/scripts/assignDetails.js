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
		for (let i = 0; i < res.length; i++) {
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

/* Links Content Get Start */
let req2 = new XMLHttpRequest();
let rightSide = document.getElementById('rightSide');
req2.open(
	'GET',
	`http://localhost:8000/api/classrooms/${classroom_id}/assignments/${assignment_id}/submissions/`,
	true
);
req2.withCredentials = true;
req2.addEventListener('load', function () {
	if (req2.status === 200) {
		var res = JSON.parse(req2.responseText);
		console.log(res);
		for (let i = 0; i < 150; i++)
			rightSide.innerHTML += `
    <div id="divLink">
      <div id="nameSubmiter">
        <img src="../Res/profile-user.png" alt="">
        ${res[i].created_by.full_name}:
      </div>
      <a id="submitLink" target="_blank" href="${res[i].link}">${res[i].link}</a>
    </div>
    `;
	} else {
		console.error('Bad Request :(');
	}
});
req2.send();
/* Links Content End */

/* Show Right Side */
let showLinksBtn = document.getElementById('showLinksBtn');
showLinksBtn.addEventListener('click', function () {
	rightSide.classList.toggle('hide');
	if (rightSide.classList.contains('hide')) {
		showLinksBtn.innerText = 'Hide Links';
	} else {
		showLinksBtn.innerText = 'Show Links';
	}
});

/* End of Show Right Side */

/* Buttons Work */
let title = document.getElementById('Title');
let content2 = document.getElementById('Content2');
let isFocus = false;
title.onfocus = function () {
	title.classList.add('Focusing');
	isFocus = true;
};
content2.onfocus = function () {
	content2.classList.add('Focusing2');
	isFocus = true;
};
title.addEventListener('focusout', () => {
	if (isFocus && title.value.length == 0) {
		isFocus = false;
		title.classList.remove('Focusing');
		title.style.transitionDuration = '0.5s';
	}
});
content2.addEventListener('focusout', () => {
	if (isFocus && content2.value.length == 0) {
		isFocus = false;
		content2.classList.remove('Focusing2');
		content2.style.transitionDuration = '0.5s';
	}
});

/*
let toggle = document.getElementById('edt_btn');
toggle.addEventListener('click' , () => {
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');

  let box_2 = document.getElementById('Container');
  box_2.style.display = "block";
}) 
*/

let decline = document.getElementById('Decline');
decline.addEventListener('click', () => {
	let blur = document.getElementById('blur');
	blur.classList.toggle('active');

	let box_2 = document.getElementById('Container');
	box_2.style.display = 'none';
});

let save = document.getElementById('Accept');
save.addEventListener('click', () => {
	let titleContent = document.getElementById('Title');
	let typeContent = document.getElementById('Content2');
	let innerTitle = document.getElementById('label1');
	let innerType = document.getElementById('label2');
	if (titleContent.value.length == 0) {
		innerTitle.innerHTML = 'This Field Is Required, Please Fill Title';
		innerTitle.classList.add('verification');
		innerTitle.style.transitionDuration = '0.4s';
	}
	if (typeContent.value.length == 0) {
		innerType.innerHTML = 'This Field Is Required, Please Fill Content';
		innerType.classList.add('verification');
		innerType.style.transitionDuration = '0.4s';
	}
	if (titleContent.value.length > 0 && typeContent.value.length > 0) {
		let blur = document.getElementById('blur');
		blur.classList.toggle('active');

		let box_3 = document.getElementById('Container');
		box_3.style.display = 'none';

		innerTitle.classList.remove('verification');
		innerType.classList.remove('verification');
		innerTitle.innerHTML = 'Title';
		innerType.innerHTML = 'Content';
	}
});

let logoutPopup = document.getElementById('logout');
logoutPopup.addEventListener('click', () => {
	if (confirm('Are You sure You Want To Logout') == 1) {
		window.location.href = '#';
	}
});

let toggle2 = document.getElementById('cmnt_btn');
toggle2.addEventListener('click', () => {
	let blur = document.getElementById('blur');
	blur.classList.toggle('active');

	let box_1 = document.getElementById('Containercmnt');
	box_1.style.display = 'block';
});

let remove = document.getElementById('Declinecmnt');
remove.addEventListener('click', () => {
	let blur = document.getElementById('blur');
	blur.classList.toggle('active');

	let box_1 = document.getElementById('Containercmnt');
	box_1.style.display = 'none';
});

let save2 = document.getElementById('Acceptcmnt');
save2.addEventListener('click', () => {
	let comment = document.getElementById('Title3cmnt');
	let innerComment = document.getElementById('label3cmnt');
	if (comment.value.length == 0) {
		innerComment.innerHTML = 'This Field Is Required, Please Fill Content';
		innerComment.classList.add('verification');
		innerComment.style.transitionDuration = '0.4s';
	}

	if (comment.value.length > 0) {
		let blur = document.getElementById('blur');
		blur.classList.toggle('active');

		let box_1 = document.getElementById('Containercmnt');
		box_1.style.display = 'none';

		innerComment.innerHTML = 'Comment';
	}
});

let title3cmnt = document.getElementById('Title3cmnt');
let isFocuscmnt = false;
title3cmnt.onfocus = function () {
	title3cmnt.classList.add('Focusing');
	isFocuscmnt = true;
};
title3cmnt.addEventListener('focusout', () => {
	if (isFocuscmnt && title3cmnt.value.length == 0) {
		isFocuscmnt = false;
		title3cmnt.classList.remove('Focusing');
		title3cmnt.style.transitionDuration = '0.5s';
	}
});

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
	let content = document.getElementById('Title3cmnt').value;
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

/* End of Sending Data */
