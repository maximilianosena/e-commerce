const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//////////////////////////////////////////////

const profile= document.getElementById("login")

function sesion_existe(){  

  //utilizo misma lógica que en login.js
  const savedSession = localStorage.getItem("usuarios"); 
   //Obtengo los elementos del localStorage y si existen, parsea los elementos obtenidos en la constante savedSession
  if (savedSession)
  {
    usuarios_Locales = JSON.parse(savedSession);

      console.log("Sesiones existentes en localStorage:", usuarios_Locales);
      console.log("Cantidad de usuarios guardados: " + usuarios_Locales.length)
      
      //Busco la última sesión iniciada, obtengo la ubicación, el indice
      let lastSession= usuarios_Locales.length - 1;
      
      //Corroboro la información en consola, numero de indice en el array
      console.log("Numero de indice de la última sesión: " + lastSession)
      
      //Busco en el array "usuarios_Locales" el valor de lastSession, la propiedad Nombre, para que aparezca como texto
      profile.innerText = 'Bienvenido: ' + usuarios_Locales[lastSession].Nombre
  } else {

    //Si no existe elementos en localStorage, redirecciona al login.html
    location.replace("login.html")
  }
  }

  sesion_existe();