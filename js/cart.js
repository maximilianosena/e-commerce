let darkbtn = document.getElementById("darkbtn");
let body = document.body
let isDarkMode = localStorage.getItem("darkMode") === "enabled";
let btn_Switch = document.querySelector(".switch")


function enableDark() {
    body.classList.add("dark-mode")
    localStorage.setItem("darkMode", "enabled")
}

function disableDark() {
    body.classList.remove("dark-mode")
    localStorage.setItem("darkMode", "disabled")
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
}

btn_logout.addEventListener("click", closeAccount)

//Mostrar Productos
const tableBody = document.getElementById("tableBody");

function showTheProduct(object){
    for (let i=0; i<object.articles.length; i++)
    tableBody.innerHTML += `<tr> 
    <td><img src=${object.articles[i].image} width="50px" ></td>
    <td>${object.articles[i].name}</td>
    <td>${object.articles[i].currency} ${object.articles[i].unitCost}</td>
    <td><input id="prodCount" type="number" value=${object.articles[i].count} min="1" style="width:70px"></td>
    <td><b>${object.articles[i].currency} ${object.articles[i].unitCost*object.articles[i].count}</b></td>
   </tr>`

}

let ID = 25801;
let urlProduct = 'https://japceibal.github.io/emercado-api/user_cart/' + ID + '.json';

async function showproduct() {
    let response = await fetch(urlProduct);
    if (response.ok) {
        let responseProducts = await response.json();
        console.log(responseProducts);
        showTheProduct(responseProducts);
    } else {
        console.log("Error: " + response.status)
    }
}
showproduct()