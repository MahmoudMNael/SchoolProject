let classroom_id = sessionStorage.getItem('classroomID');
let assignment_id = sessionStorage.getItem('assignmentID');

/* Comment Get Data */
let com = new XMLHttpRequest();
let comment = document.getElementById('comment_section');
com.open(
	'GET',
	`http://127.0.0.1:8000/api/classrooms/${classroom_id}/assignments/${assignment_id}/comments/`,
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
	`http://127.0.0.1:8000/api/classrooms/${classroom_id}/assignments/${assignment_id}/`,
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
	`http://127.0.0.1:8000/api/classrooms/${classroom_id}/assignments/${assignment_id}/`,
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
