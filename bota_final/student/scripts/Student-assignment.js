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


let assiTxt=document.getElementById('assi-txt');
function getAssignments(class_id){
let request= new XMLHttpRequest();
    request.open("GET","http://127.0.0.1:5000/api/classrooms/"+class_id+"/assignments/"); //put the port
    request.withCredentials=true;
    request.send();
    request.addEventListener('load',function(){
    let data=JSON.parse(request.responseText);
    for(let i of data){
    assiTxt.innerHTML+=`<div class="assi-txt2" data-set-id="${i.id}">
        <img src="/assets/images/simple_profile_photo.png">
        <div class="username" >
            <a href="" id="address">${i.title}</a> 
        </div>
        <p class="date">${i.created_at}</p>
        <p class="assi-content">${i.content}</p>
        </div>
    `
    }
});
}
getAssignments(2);   // put the active class

//end