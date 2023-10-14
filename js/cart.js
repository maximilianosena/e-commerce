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
      <td><button type="button" class="btn btn-danger" onclick="removeProductCart(${product.id})">X <audio src="paper.mp3"></audio></button></td>
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

function removeProductCart(id) {
  tableBody.innerHTML = '';

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].articles[0].id === id) {
      // Elimina el primer objeto que coincida con la id
      cart.splice(i, 1);
      break; // Detiene el bucle después de eliminar el elemento
    }
  }
  
  console.log("Nueva lista:", cart);
  if (audio){
  audio.play()
      console.log(`Reproduciendo: ${audio.src}`)}
  localStorage.setItem("cart", JSON.stringify(cart));
  showproduct(); //Llama al auto predefinido
  products_add(); //Llama a los productos filtrados
} 


let audio = document.querySelector("audio")