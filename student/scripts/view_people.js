let AdminListEditor = document.querySelector(".Admins_table");
let TeacherListEditor = document.querySelector(".Teachers_table");
let StudentListEditor = document.querySelector(".Students_table");

let modback = localStorage.getItem('RegisteredUsers')
let moddata = JSON.parse(modback)

console.log(moddata)

moddata.forEach((item) => {
    if(item.role==='admin'){
        AdminListEditor.innerHTML+=`<li><img src="../assets/images/simple_profile_photo.png" alt="profile photo">${item.name}</li>`
    }
    else if (item.role==='teacher'){
        TeacherListEditor.innerHTML+=`<li><img src=".../assets/images/simple_profile_photo.png" alt="profile photo">${item.name}</li>`
    }
    else{
        StudentListEditor.innerHTML+=`<li><img src="../assets/images/simple_profile_photo.png" alt="profile photo">${item.name}</li>`
    }
    
});

