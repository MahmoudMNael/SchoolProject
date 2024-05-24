// Login
let log = new XMLHttpRequest();
log.open("POST", "http://127.0.0.1:5000/api/auth/login/", false);
log.setRequestHeader('Content-Type', 'application/json');
log.withCredentials=true;
log.addEventListener('load', () => {})
log.send(JSON.stringify({
  email: "moahmedS@gmail.com",
  password: "1234"
}))
console.log(log.responseText);





//get function
let annonceTxt=document.getElementById("ann-txt");
function getAnnouncments(class_id){
  let request= new XMLHttpRequest();
  request.open("GET","http://127.0.0.1:5000/api/classrooms/"+class_id+"/announcements/"); //put the port
  request.withCredentials=true;
  request.send();
  request.addEventListener('load',function(){
    let data=JSON.parse(request.responseText);
    annonceTxt.innerHTML='';
    for(let i of data){
      annonceTxt.innerHTML+=`
      <div class="ann-txt2" data-set-id="${i.id}"> 
        <img src="../../assets/images/simple_profile_photo.png">
        <div class="username">
          <p>${i.title}</p>
        </div>
        <p class="date">${i.created_at}</p>
        <p class="anno-content">${i.content}</p>
      </div>
      `;
    }
    })
}
getAnnouncments(2);
//end 