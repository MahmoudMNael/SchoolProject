// Login
let log = new XMLHttpRequest();
log.open("POST", "http://127.0.0.1:5000/api/auth/login/", false);
log.setRequestHeader('Content-Type', 'application/json');
log.withCredentials=true;
log.addEventListener('load', () => {})
log.send(JSON.stringify({
  email: "moahmedT@gmail.com",
  password: "1234"
}))
console.log(log.responseText);





//first popup 
let title = document.getElementById('Title');
let content2 = document.getElementById('Content2');
let isFocus = false;

title.onfocus = function() {
  title.classList.add('Focusing');
  isFocus = true;
}
content2.onfocus = function() {
  content2.classList.add('Focusing2');
  isFocus = true;
}
title.addEventListener("focusout" , () =>{
  if (isFocus && title.value.length == 0) {
    isFocus = false;
    title.classList.remove('Focusing'); 
    title.style.transitionDuration = "0.5s";
  }
});
content2.addEventListener("focusout" , () => {
  if (isFocus && content2.value.length == 0) {
    isFocus = false;
    content2.classList.remove('Focusing2');
    content2.style.transitionDuration = "0.5s";
  }
})

let add=document.getElementById("add-btn");
add.addEventListener('click',()=>{
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');

  let box_2 = document.getElementById('Container');
  box_2.style.display = "block";
})

let decline = document.getElementById('Decline');
decline.addEventListener ('click' , () => {
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');

  let box_2 = document.getElementById('Container');
  box_2.style.display = "none";
})

let colorModeBtn = document.querySelector('#colorModeBtn');
let colorModeIcon = document.querySelector('#colorModeIcon');

colorModeBtn.addEventListener('click', () => {
	if (colorModeIcon.classList.contains('fa-moon')) {
		colorModeIcon.classList.remove('fa-moon');
		colorModeIcon.classList.add('fa-sun');
	} else {
		colorModeIcon.classList.remove('fa-sun');
		colorModeIcon.classList.add('fa-moon');
	}
});
let save = document.getElementById('Accept');
save.addEventListener('click' , () => {
  let titleContent = document.getElementById('Title');
  let typeContent = document.getElementById('Content2');
  let innerTitle = document.getElementById('label1');
  let innerType = document.getElementById('label2');
  if (titleContent.value.length == 0) {
    innerTitle.innerHTML = "This Field Is Required, Please Fill Title";
    innerTitle.classList.add("verification");
    innerTitle.style.transitionDuration = '0.4s';
  }
  if (typeContent.value.length == 0) {
    innerType.innerHTML = "This Field Is Required, Please Fill Content";
    innerType.classList.add("verification");
    innerType.style.transitionDuration = '0.4s';
  }
  if (titleContent.value.length > 0 && typeContent.value.length > 0) {
    let blur = document.getElementById('blur');
    blur.classList.toggle('active');
  
    let box_3 = document.getElementById('Container');
    box_3.style.display = "none";
    innerTitle.classList.remove("verification");
    innerType.classList.remove("verification");
    innerTitle.innerHTML = "Title";
    innerType.innerHTML = "Content";
  }
})
//end 




// get function
let activeUser;
let activeClassrom;
let class_id=2;
let annonceTxt=document.getElementById("ann-txt");
function getAnnouncments(class_id=2){
  let request= new XMLHttpRequest();
  request.open("GET","http://127.0.0.1:5000/api/classrooms/"+ class_id +"/announcements/"); //put the port
  request.withCredentials=true;
  request.send();
  request.addEventListener('load',function (){
    let data=JSON.parse(request.responseText);
    for(let i of data){
      annonceTxt.innerHTML+=`               
      <div class="ann-txt2" data-set-id="${i.id}">
        <img src="../../assets/images/simple_profile_photo.png" >
        <div class="username">
            <p>${i.title}</p>
        </div>
        <p class="date">${i.created_at}</p>
        <p class="ann-content">${i.content}</p>
        <button type="button" class="edit-btn" onclick="editAnnouncment(${i.id})"> Edit</button>
        <button type="button" class="delete-btn" onclick="deleteAnnouncment(${i.id})"> Delete </button>
        </div>
      `
    }
  });  
}

getAnnouncments(2);


//end 



// put function 
let titleAnnouncment = document.getElementById('Title-2');
let contentAnnouncment = document.getElementById('Content-edit');
let dateAnnouncment =document.getElementById("Date-2");
function editAnnouncment(id){
  let blur = document.getElementById('blur');
  blur.classList.toggle('active');
  let box_2 = document.getElementById('Container-2');
  box_2.style.display = "block";
  reqGET=new XMLHttpRequest();
  reqGET.open('GET','http://127.0.0.1:5000/api/classrooms/'+class_id+'/announcements/' + id);//put port number
  reqGET.withCredentials=true;
  reqGET.send();
  reqGET.addEventListener('load',function (){
    let data= JSON.parse(reqGET.responseText);
    titleAnnouncment.value=data.title;
    contentAnnouncment.value=data.content;
    dateAnnouncment.value=data.created_at;
  })
  let edit=document.getElementById('Accept-2');
  edit.addEventListener('click',function(){
    reqPUT=new XMLHttpRequest();
    reqPUT.open('PUT','http://127.0.0.1:5000/api/classrooms/'+class_id+'/announcements/' + id);
    reqPUT.withCredentials=true;
    reqPUT.setRequestHeader('Content-Type','application/json');
      let newdata={
      title:titleAnnouncment.value,
      content:contentAnnouncment.value,
      created_at:dateAnnouncment.value,
    }
    reqPUT.send(JSON.stringify(newdata));
  })
  
}


//end 



//post function
save.addEventListener('click',function(){
reqPOST=new XMLHttpRequest();
reqPOST.open('POST','http://127.0.0.1:5000/api/classrooms/'+class_id+'/announcements/');
reqPOST.setRequestHeader('Content-Type','application/json');
reqPOST.withCredentials=true;
let date=document.getElementById('Date');
let data={
  title:title.value,
  content:content2.value,
  created_at:date.value,
}
reqPOST.send(JSON.stringify(data));
console.log(data);
console.log(JSON.stringify(data));
})

//end post

//second popup 
// let titleEdit = document.getElementById('Title-2');
// let contentEdit = document.getElementById('Content-edit');
// let edit=document.getElementsByClassName(".edit-btn");

// edit.addEventListener('click',function(){
//   let blur = document.getElementById('blur');
//   blur.classList.toggle('active');

//   let box_2 = document.getElementById('Container-2');
//   box_2.style.display = "block";
// let editBtn = document.getElementById('Accept-2');
// editBtn.addEventListener('click' , () => {
//   let titleContent = document.getElementById('Title-2');
//   let typeContent = document.getElementById('Content2-edit');
//   let innerTitle = document.getElementById('label1-edit');
//   let innerType = document.getElementById('label2-edit');
//   if (titleContent.value.length == 0) {
//     innerTitle.innerHTML = "This Field Is Required, Please Fill Title";
//     innerTitle.classList.add("verification");
//     innerTitle.style.transitionDuration = '0.4s';
//   }
//   if (typeContent.value.length == 0) {
//     innerType.innerHTML = "This Field Is Required, Please Fill Content";
//     innerType.classList.add("verification");
//     innerType.style.transitionDuration = '0.4s';
//   }
//   if (titleContent.value.length > 0 && typeContent.value.length > 0) {
//     let blur = document.getElementById('blur');
//     blur.classList.toggle('active');
  
//     let box_3 = document.getElementById('Container');
//     box_3.style.display = "none";
//     innerTitle.classList.remove("verification");
//     innerType.classList.remove("verification");
//     innerTitle.innerHTML = "Title";
//     innerType.innerHTML = "Content";
//   }
// })
// })

function cancelPopup(){
  let blur=document.getElementById('blur');
  blur.classList.toggle('active');
  let box_2=document.getElementById('Container-2');
  box_2.style.display="none";
}

//end 


// delete function 
function deleteAnnouncment(id){
  if(confirm("Are you sure you need to delete this announcment ?")==1){
    req=new XMLHttpRequest();
    req.open('DELETE','http://127.0.0.1:5000/api/classrooms/'+class_id+'/announcements/' + id);
    req.withCredentials=true;
    req.send();
  }
}

//end delete



