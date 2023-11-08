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

    profile.textContent = `Bienvenido: ${localStorage.getItem("username") === ""
        ? localStorage.getItem("storedEmail")
        : localStorage.getItem("username")
      } `
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
let nav_link = document.querySelector('.nav-link')
let categoriesNav = document.getElementById('categoriesNav')
let sell = document.getElementById('sell')
let login = document.getElementById('login')
let subTitle = document.getElementById('subTitle')
let table = document.querySelector(".containerData table")
let containerCart = document.querySelector(".containerCart")
let payMethod = document.querySelector(".payMethod")


function enableDark() {
  body.classList.add("dark-mode")
  if (search_container?.classList) {
    search_container.classList.add("dark-mode")
  }
  if (product_cart?.classList) {
    product_cart.classList.add("text-light")
  }
  if (top_half_page?.classList) {
    top_half_page.classList.add("dark-image")
  }
  if (under_half_page?.classList) {
    under_half_page.classList.remove("bg-light")
    under_half_page.classList.add("dark")
  }
  if (nav_link?.classList) {
    nav_link.classList.add("text-light")
  }
  if (categoriesNav?.classList) {
    categoriesNav.classList.add("text-light")
  }
  if (sell?.classList) {
    sell.classList.add("text-light")
  }
  if (login?.classList) {
    login.classList.add("text-light")
  }
  if (subTitle?.classList) {
    subTitle.classList.add("text-light")
  }

  if (table?.classList) {
    table.classList.remove("text-light")
    table.classList.add("text-dark")

  }

  if (containerCart?.classList) {
    containerCart.classList.add("text-dark")
  }

  if (payMethod?.classList) {
    payMethod.classList.add("text-dark")
  }


  localStorage.setItem("darkMode", "enabled")
}

function disableDark() {
  body.classList.remove("dark-mode")
  if (search_container?.classList) {
    search_container.classList.remove("dark-mode")
  }
  if (product_cart?.classList) {
    product_cart.classList.remove("text-light")
  }
  if (top_half_page?.classList) {
    top_half_page.classList.remove("dark-image")
  }
  if (under_half_page?.classList) {
    under_half_page.classList.add("bg-light")
    under_half_page.classList.remove("dark")
  }

  localStorage.setItem("darkMode", "disabled")

  if (nav_link?.classList) {
    nav_link.classList.remove("text-light")
  }
  if (categoriesNav?.classList) {
    categoriesNav.classList.remove("text-light")
  }
  if (sell?.classList) {
    sell.classList.remove("text-light")
  }
  if (login?.classList) {
    login.classList.remove("text-light")
  }
  if (subTitle?.classList) {
    subTitle.classList.remove("text-light")
  }

  if (table?.classList) {
    table.classList.remove("text-dark")

  }

  if (containerCart?.classList) {
    containerCart.classList.remove("text-dark")
  }


  if (payMethod?.classList) {
    payMethod.classList.remove("text-dark")
  }
}


if (isDarkMode) {
  enableDark()
  darkbtn.checked = true;
}

darkbtn.addEventListener("change", () => {
  if (darkbtn.checked) {
    enableDark()
  } else {
    disableDark()
  }
})

btn_Switch.addEventListener("click", (e) => {
  e.stopPropagation();
})




let btn_logout = document.getElementById("logout")

function closeAccount() {
  localStorage.removeItem("usuarios")
  localStorage.setItem("storedScdLastName", "")
  localStorage.setItem("storedName", "");
  localStorage.setItem("storedLastName", "");
  localStorage.setItem("storedScdName", "");
  localStorage.setItem("storedPhone", "");
  localStorage.setItem("username", "")
  localStorage.setItem("secondEmail", "")
  localStorage.setItem("storedEmail", "")
}

btn_logout.addEventListener("click", closeAccount)









