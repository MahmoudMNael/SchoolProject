let classroomID = sessionStorage.getItem('classroomID');
//get function
let annonceTxt = document.getElementById('ann-txt');
function getAnnouncments(class_id) {
	let request = new XMLHttpRequest();
	request.open(
		'GET',
		'http://127.0.0.1:8000/api/classrooms/' + class_id + '/announcements/'
	); //put the port
	request.withCredentials = true;
	request.send();
	request.addEventListener('load', function () {
		let data = JSON.parse(request.responseText);
		for (let i of data) {
			annonceTxt.innerHTML += `<div class="ann-txt2" data-set-id="${i.id}">
        <img src="/assets/images/simple_profile_photo.png">
        <div class="username" >
            <span id="address">${i.title}</span>  
        </div>
        <p class="date">${i.created_at}</p>
        <p class="ann-content">${i.content}</p>
        </div>
      `;
		}
	});
}
getAnnouncments(classroomID);

//end
