(() => {
let btn_show = document.getElementById("show_password");
let btn_submit = document.getElementById("submit");
const password = document.getElementById("password");
const icon = document.querySelector(".bx");

const user = document.getElementById("user");

function redirect() {
    location.replace("index.html")
}

//ARRAY donde se guardan los nuevos registros de usuarios
let localUsers = []

function login() {
    const USER_SAVE = user.value.trim();
    const PASSWORD_SAVE = password.value.trim();

    let new_user = {
        "Nombre": USER_SAVE,
        "Contraseña": PASSWORD_SAVE
    };

    localUsers.push(new_user)
}


function saveSession() {
    localStorage.setItem("usuarios", JSON.stringify(localUsers))
}



function get_data_localStorage() {

    const savedSession = localStorage.getItem("usuarios");

    if (savedSession) {
        localUsers = JSON.parse(savedSession);
        console.log("Sesiones existentes en localStorage:", localUsers);
    } else {
        console.log("No se encontró sesión en localStorage.");
    }
}


get_data_localStorage();


icon.addEventListener("click", e => {
    if (password.type == "password") {
        password.type = "text";
    } else {
        password.type = "password"
    }
})


'use strict'
// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')
// Loop over them and prevent submission
Array.from(forms).forEach(form => {
    
  form.addEventListener('submit', event => {
    
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    } else {
        login();
        saveSession();
        redirect();
    }
    form.classList.add('was-validated')
  }, false)
})
})()