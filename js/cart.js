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
const totalElement = document.getElementById("total"); 
let object;

let ID = 25801;
let urlProduct = 'https://japceibal.github.io/emercado-api/user_cart/' + ID + '.json';

async function showproduct() {
  let response = await fetch(urlProduct);
  if (response.ok) {
    object = await response.json();
    console.log(object);
    showTheProduct();
  } else {
    console.log("Error: " + response.status);
  }
}

showproduct();

function showTheProduct() {
  tableBody.innerHTML = ''; 

  for (let i = 0; i < object.articles.length; i++) {
    const product = object.articles[i];

    // Calcula el subtotal en función de la cantidad
    const subtotal = product.unitCost * product.count;

    // Agrega el atributo data-index para identificar la fila
    tableBody.innerHTML += `<tr data-index="${i}"> 
      <td><img src=${product.image} width="50px" ></td>
      <td>${product.name}</td>
      <td>${product.currency} ${product.unitCost}</td>
      <td><input class="prodCount" type="number" value=${product.count} min="1" style="width:70px"></td>
      <td><b>${product.currency} <span class="subtotal">${subtotal}</span></b></td>
    </tr>`;
  }

  // Agrega un evento de cambio a los campos de cantidad
  const prodCountInputs = document.querySelectorAll(".prodCount");

  prodCountInputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      const rowIndex = event.target.closest("tr").getAttribute("data-index");
      const product = object.articles[rowIndex];
      const newCount = parseInt(event.target.value, 10);

      if (!isNaN(newCount) && newCount >= 1) {
        
        object.articles[rowIndex].count = newCount;

        // Recalcula el subtotal en función de la nueva cantidad
        const newSubtotal = product.unitCost * newCount;

        const subtotalElement = event.target.closest("tr").querySelector(".subtotal");
        subtotalElement.textContent = newSubtotal;

        let newTotal = 0;
        document.querySelectorAll(".subtotal").forEach((subtotal) => {
          newTotal += parseFloat(subtotal.textContent.split(" ")[1]);
        });
        // Actualiza el contenido del elemento "total" con el valor recalculado
        totalElement.textContent = object.articles[0].currency + " " + newTotal;
      }
    });
  });
}
