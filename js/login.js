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
        event.preventDefault()
    }else{
        reDireccionar()
    }
}

//btn_show.addEventListener("click",switchVisibility);

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

function save_session(){
    localStorage.setItem("usuarios", JSON.stringify(usuarios_Locales))
 }

  //El boton, loguea al nuevo individuo, y guarda la sesión en localStorage
btn_submit.addEventListener("click",login)
btn_submit.addEventListener("click",save_session)




//función Informativa para ver los datos en consola
function get_data_localStorage() {
  //Obtengo del localStorage los elementos guardados y los "guardo" bajo el nombre usuarios
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


//localStorage.clear(); <- Para limpiar el localStorage
