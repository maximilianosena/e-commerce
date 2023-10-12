//Mostrar Productos
let tableBody = document.getElementById("tableBody");
let totalElement = document.getElementById("total"); 
let list = [];

console.log("lista", list)

let ID = 25801;
let urlProduct = 'https://japceibal.github.io/emercado-api/user_cart/' + ID + '.json';


/////////////////////////////////////////////////////////////
let cart = JSON.parse(localStorage.getItem("cart"))

console.log(cart)

function products_add(){
  for (let product of cart){
    console.log("cada producto:", product)
    showTheProduct(product)
    list.push(product)
  }
}

if (JSON.parse(localStorage.getItem("cart")))
{
products_add()}

/////////////////////////////////////////////////////

async function showproduct() {
  let response = await fetch(urlProduct);
  if (response.ok) {
    let object = await response.json();
    console.log(object);
    list.push(object)
    showTheProduct(object);
  } else {
    console.log("Error: " + response.status);
  }
}

showproduct();

function showTheProduct(object) {
  tableBody.innerHTML += ''; 

  for (let i = 0; i < object.articles.length; i++) {
    let product = object.articles[i];

    // Calcula el subtotal en función de la cantidad
    let subtotal = product.unitCost * product.count;

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
  let prodCountInputs = document.querySelectorAll(".prodCount");

  prodCountInputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      let product = list[index].articles;
      let cost = product[0].unitCost
      let newCount = parseInt(event.target.value, 10);

      if (!isNaN(newCount) && newCount >= 1) {
        
console.log(cost)

        product[0].count = newCount;

        // Recalcula el subtotal en función de la nueva cantidad
        let newSubtotal = cost * newCount;

        let subtotalElement = event.target.closest("tr").querySelector(".subtotal");
        subtotalElement.innerHTML = parseInt(newSubtotal);

console.log(subtotalElement)

        let newTotal = 0;
        document.querySelectorAll(".subtotal").forEach((subtotal) => {
          newTotal += parseInt(subtotal.textContent.split(" ")[1]);
        });

        
        // Actualiza el contenido del elemento "total" con el valor recalculado
        totalElement = product[0].currency + " " + parseInt(newTotal);

       
      }
    });
  });
}
