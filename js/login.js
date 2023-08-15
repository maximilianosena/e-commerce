let btn_show= document.getElementById("show_password");
let btn_submit= document.getElementById("submit");
const password= document.getElementById("password");
const user=document.getElementById("user");

function switchVisibility(){
    event.preventDefault()
    //Si el tipo de dato es password, lo cambia a text, sino lo cambia a password
    if(password.type === "password"){
        password.type="text";
    }else{
        password.type="password";
    }
}
function reDireccionar(){
    location.replace("index.html")
}

function required(){
    if(user.value==="" & password.value===""){
        alert("Debe escribir la info")
    }else{
        reDireccionar()
    }
}

//btn_show.addEventListener("click",switchVisibility);

btn_submit.addEventListener("click", required)
