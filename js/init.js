const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//////////////////////////////////////////////

const profile = document.getElementById("login")

function sessionExists() {


  const savedSession = localStorage.getItem("usuarios");

  if (savedSession) {
    local_Users = JSON.parse(savedSession);

    console.log("Sesiones existentes en localStorage:", local_Users);
    console.log("Cantidad de usuarios guardados: " + local_Users.length)

    let lastSession = local_Users.length - 1;


    console.log("Numero de indice de la última sesión: " + lastSession)

    profile.innerText = 'Bienvenido: ' + local_Users[lastSession].Nombre
  } else {
    //Si no existe elementos en localStorage, redirecciona al login.html
    location.replace("login.html")
  }
}

sessionExists();

let darkbtn = document.getElementById("darkbtn");
 let body = document.body
 let isDarkMode = localStorage.getItem("darkMode") === "enabled";
 let btn_Switch = document.querySelector(".switch")
let search_container = document.querySelector(".contenedor.search")
let product_cart = document.querySelector(".table")
let top_half_page = document.querySelector(".jumbotron")
let under_half_page = document.querySelector(".album.py-5.bg-light")




 function enableDark() {
    body.classList.add("dark-mode")
    if(search_container?.classList){
    search_container.classList.add("dark-mode")
    }
    if (product_cart?.classList){
      product_cart.classList.add("text-light")
    }
    if (top_half_page?.classList){
      top_half_page.classList.add("dark-image")
    }
    if (under_half_page?.classList){
      under_half_page.classList.remove("bg-light")
      under_half_page.classList.add("dark")
    }    
    localStorage.setItem ("darkMode", "enabled")
}

function disableDark () {
    body.classList.remove("dark-mode")
    if(search_container?.classList){
      search_container.classList.remove("dark-mode")
      }
      if (product_cart?.classList){
        product_cart.classList.remove("text-light")
      }
      if (top_half_page?.classList){
        top_half_page.classList.remove("dark-image")
      }
      if (under_half_page?.classList){
        under_half_page.classList.add("bg-light")
        under_half_page.classList.remove("dark")
      }
         localStorage.setItem ("darkMode", "disabled")
     }


 if (isDarkMode) {
   enableDark()
      darkbtn.checked = true;
 }

 darkbtn.addEventListener("change", () => {
     if (darkbtn.checked){ 
        enableDark()    
     } else {
         disableDark()
 }
})

btn_Switch.addEventListener("click", (e)=>{
    e.stopPropagation();
})



      //Codigo Franco


      let btn_logout = document.getElementById("logout")

      function closeAccount() {
          localStorage.removeItem("usuarios")
      }
  
      btn_logout.addEventListener("click", closeAccount)
      
   
  
      
    
    
  
  
  
     