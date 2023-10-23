//Mostrar Productos
let tableBody = document.getElementById("tableBody");
let totalElement = document.getElementById("total");
let list = [];

console.log("lista", list)
let ID = 25801;
let urlProduct = 'https://japceibal.github.io/emercado-api/user_cart/' + ID + '.json';

let resultadoSubtotal;
/////////////////////////////////////////////////////////////
let cart = JSON.parse(localStorage.getItem("cart"))

console.log(cart)

function products_add() {
  for (let product of cart) {
    console.log("cada producto:", product)
    showTheProduct(product)
    list.push(product)
  }
}


/////////////////////////////////////////////////////

async function showproduct() {
  let response = await fetch(urlProduct);
  if (response.ok) {
    let object = await response.json();
    console.log(object);
    localStorage.setItem("cart", JSON.stringify([object]))
    showTheProduct(object);
    subTotals(); //agrego función al fetch para ver al cargar la página
  } else {
    console.log("Error: " + response.status);
  }
}



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
        totalElement = product[0].currency + " " + newTotal;

        //Función que se dispara al cambiar la cantidad de inputs
        subTotals()

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
  if (audio) {
    audio.play()
    console.log(`Reproduciendo: ${audio.src}`)
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  products_add(); //Llama a los productos filtrados
  subTotals();
}


let audio = document.querySelector("audio")



//SUMA TOTAL
let allSubtotal = document.getElementsByTagName("b")
console.log(allSubtotal.length)

let usd = 40;


//Función que devuelve la suma de los subtotales, y actualiza el valor del costo de envío y costo total
function subTotals() {
  let resultado = 0;
  if (allSubtotal.length===0){
console.log("vacío")
containerSubtotal.innerHTML = ` USD 0`
containerTax.innerHTML = ` USD 0`
totalFinal.textContent = ` USD 0`
  } else{
  for (let i = 0; i < allSubtotal.length; i++) {
    if (allSubtotal[i].textContent.includes("USD")) {
      resultado += parseFloat(allSubtotal[i].childNodes[1].textContent)
    }
    else {
      //Si el valor no está en dolares, se convierte 
      resultado += parseFloat(allSubtotal[i].childNodes[1].textContent) / usd
    }
  }
  containerSubtotal.innerHTML = ` USD ${resultado.toFixed(2)}`

  valueTax(resultado)
  let taxNumber = parseFloat(containerTax.innerHTML.replace("USD ", ""))
  console.log(taxNumber)
  final(resultado, taxNumber)
}
}

//Selección tipo de envío
let shipping = document.getElementsByName("shipping_option")
let containerTax = document.getElementById("shipType")
let containerSubtotal = document.getElementById("subAll")


console.log(shipping)


for (let input of shipping) {
  console.log("Este es un input", input.value)
}

function valueTax(resultadoSubtotal) {
  let selectedOption;



  //Recorrido que se detiene al encontrar el valor seleccionado
  for (let i = 0; i < shipping.length; i++) {
    if (shipping[i].checked) {
      selectedOption = shipping[i].value;
      break;
    }
  }
  let subtotalNumber = parseFloat(containerSubtotal.textContent.replace("USD ", ""))
  console.log(subtotalNumber)

  if (selectedOption === "premium") {
    let tax = resultadoSubtotal * 0.15
    containerTax.innerHTML = ` USD ${tax.toFixed(2)}`
    final(subtotalNumber, tax)
  }
  else if (selectedOption === "express") {
    let tax = resultadoSubtotal * 0.07
    containerTax.innerHTML = ` USD ${tax.toFixed(2)}`
    final(subtotalNumber, tax)
  }
  else if (selectedOption === "standard") {
    let tax = resultadoSubtotal * 0.05
    containerTax.innerHTML = ` USD ${tax.toFixed(2)}`
    final(subtotalNumber, tax)
  }

  console.log(selectedOption)
}



//Evento al seleccionar un tipo de envío
for (let i = 0; i < shipping.length; i++) {
  shipping[i].addEventListener("click", () => {
    subTotals()
  })
}


//Función Suma Total

let totalFinal = document.getElementById("totalCart")

function final(subtotalCart, taxCart) {
  let result = 0
  result += subtotalCart + taxCart
  totalFinal.textContent = ` USD ${result.toFixed(2)}`
  console.log(result)
}

// Forma de Pago
function openModal() {
  let modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModal() {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Asignar evento al enlace para abrir el modal
document.getElementById("openModalLink").addEventListener("click", openModal);

if (cart === null)  {
  showproduct()
  location.reload()
}  else {
  products_add()
  subTotals()
}
//funcion forma de pago
let option1 = document.getElementById("credit_card_option");
let option2 = document.getElementById("bank_transfer_option");

let cardpass = document.getElementById("creditCardNumber");
let securityCard = document.getElementById("securityCode")
let expiryDay = document.getElementById("expiryDate")
let bankpass = document.getElementById("accountNumber");
let selectedPaymentMethod = document.getElementById("selectedPaymentMethod");

console.log(cardpass)

option1.addEventListener("click", () => {
  if (option1.checked) {
    selectedPaymentMethod.innerHTML = ` Tarjeta de crédito` ;

   bankpass.disabled=true
   cardpass.disabled = false;
   securityCard.disabled = false;
   expiryDay.disabled = false;
  }
});

option2.addEventListener("click", () => {
  if (option2.checked) { 
    selectedPaymentMethod.innerHTML = ` Transferencia bancaria` ;
   
      cardpass.disabled = true;
      securityCard.disabled = true;
      expiryDay.disabled = true;
    
      bankpass.disabled = false;

  }
});

// Modal de exito de compra

var  modalButton = document.getElementById("finalizePurchase");
var successModal = document.getElementById("successModal");
var closeSuccessModal = document.getElementById("closeSuccessModalButton");
var emptyModal = document.getElementById("emptyModal")
var closeEmptyModal = document.getElementById("closeEmptyModalButton")


modalButton.addEventListener("click", finalizarCompra);

closeSuccessModal.addEventListener("click", closeSuccessModalFunction);

closeEmptyModal.addEventListener("click", closeEmptyModalFunction);

function openSuccessModal() {
  successModal.style.display = "block";
};

function openEmptyModal() {
  emptyModal.style.display = "block";
};

function closeSuccessModalFunction() { 
  successModal.style.display = "none";
};

function closeEmptyModalFunction() { 
  emptyModal.style.display = "none";
};


function finalizarCompra() {

  if (cart && cart.length > 0) {
    
    let comprasExitosas = JSON.parse(localStorage.getItem("compraExitosa")) || [];

    comprasExitosas = comprasExitosas.concat(cart);

    localStorage.setItem("compraExitosa", JSON.stringify(comprasExitosas));
    
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    resetPage()

    openSuccessModal();
  } else {
    openEmptyModal();
  }

};

function resetPage() {
  tableBody.innerHTML = '';
  containerSubtotal.innerHTML = ` USD 0`;
  containerTax.innerHTML = ` USD 0`;
  totalFinal.textContent = ` USD 0`;
};