let btn_show= document.getElementById("show_password");
let btn_submit= document.getElementById("submit");
const password= document.getElementById("password");
const icon= document.querySelector(".bx");

const user=document.getElementById("user");

function reDireccionar(){
    location.replace("index.html")
}


//Si ambos campos tienen valor, crea el usuario, lo guarda y redirecciona al index
function required(event){
    if(user.value==="" || password.value===""){
        alert("Debe completar los campos.")
        event.preventDefault()
    }else{
        login();
        save_session();
        reDireccionar();
    }
}

btn_submit.addEventListener("click", required)

////////////////////////////////////////////////////////////

//ARRAY donde se guardan los nuevos registros de usuarios
let usuarios_Locales= []

//Función login, donde se toma el valor de user y password, sin los espacios en blanco
//Se crea un objeto new_user, que se pushea en el array creado

function login(){
    const USER_SAVE= user.value.trim();
    const PASSWORD_SAVE= password.value.trim();

    let new_user = {
        "Nombre" : USER_SAVE,
"Contraseña" : PASSWORD_SAVE
    };

    usuarios_Locales.push(new_user)
}

//Funcion que guarda en almacenamiento local, el array creado, en formato JSON
//porque localStorage solo puede almacenar cadenas de texto.
//los "guardo" bajo el nombre usuarios

function save_session(){
    localStorage.setItem("usuarios", JSON.stringify(usuarios_Locales))
 }


//función Informativa para ver los datos en consola
function get_data_localStorage() {
  //Obtengo del localStorage los elementos guardados 
 const savedSession = localStorage.getItem("usuarios"); 

 //Si existen elementos:
 if (savedSession) {

     //nuevamente a la variable usuarios_Locales, la parsea, para recibir el array en formato JavaScript.
   usuarios_Locales = JSON.parse(savedSession);
   console.log("Sesiones existentes en localStorage:", usuarios_Locales);
 } else {
   console.log("No se encontró sesión en localStorage.");
 }
}

// Llamo a la función para conocer el estado del localStorage
get_data_localStorage();

//Ojito abre y cierra cuando muestra la contraseña
icon.addEventListener("click", e => {
    if (password.type == "password"){
        password.type = "text";
    } else {
        password.type = "password"
    }
})