let viewComments = document.getElementById("comments");


const product = localStorage.getItem("productID")
const URL_CommentsProducts = 'https://japceibal.github.io/emercado-api/products_comments/' + product + '.json'


function showComments(array) {

    for (let comment of array) {

        let publication = document.createElement("div");
        publication.classList.add("headComment");
        publication.innerHTML = `<div class=name> <img src="img/avatar.png">  ${comment.user} </div>  <div class=date>${comment.dateTime}</div> `;


        let descriptionComment = document.createElement("div");
        descriptionComment.classList.add("descriptionComment");
        descriptionComment.innerHTML = `<div class=comment>${comment.description}</div>`;

        for (let i = 0; i < 5; i++) {
            let elementSpan = document.createElement("span");
            elementSpan.classList.add("fa", "fa-star")
            if (i < comment.score) {
                elementSpan.classList.add("checked")
            }
            publication.appendChild(elementSpan)
        }

        viewComments.appendChild(publication);
        viewComments.appendChild(descriptionComment);
    }
}

async function call_UrlComments() {
    let response = await fetch(URL_CommentsProducts);
    if (response.ok) {
        let responseContents = await response.json();
        console.log(responseContents);
        showComments(responseContents);
    } else {
        console.log("Error: " + response.status)
    }
}

call_UrlComments();

//Mostrar producto
let title = document.getElementById("title")
let things = document.getElementById("showP")
let firstImage = document.getElementById("firstImage")
let restImages = document.getElementById("restImages")
let showImages = document.getElementById("showImages")
//codigo win-flor
function showTheProduct(object) {

    title.innerHTML += `
    <div class="h1 text-center" id="titleProduct">
    ${object.name} 
    </div>
    `

    firstImage.innerHTML += `<div class="carousel-item active"><img src=${object.images[0]} class="d-block w-100" alt="..."></div>`

    for (let i = 1; i < object.images.length; i++) {
        firstImage.innerHTML += `<div class="carousel-item"><img src=${object.images[i]} class="d-block w-100" alt="..."></div>`
    }

    things.innerHTML += `
    <div class=product-info>
    <div id="priceProduct">
    ${object.currency}${object.cost} 
    </div>
    <div id="descriptionProduct">
    Descripción:${object.description} 
    </div>
    <div id="soldCountProduct">
    ${object.soldCount} Vendidos</div>
    `
    things.innerHTML += `<h5>Productos Relacionados:</h5>`
    for (let product of object.relatedProducts) {
        things.innerHTML += `<div class=related-product onclick="setProductID(${product.id})" style="cursor:pointer;">${product.name} <img src=${product.image} height=150px></div>`
    }
}



let urlProduct = 'https://japceibal.github.io/emercado-api/products/' + product + '.json'
async function showproduct() {
    let response = await fetch(urlProduct);
    if (response.ok) {
        let responseContents = await response.json();
        console.log(responseContents);
        showTheProduct(responseContents);
    } else {
        console.log("Error: " + response.status)
    }
}

showproduct()

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = 'product-info.html'
}


/*Codigo Milagros*/

fecha = new Date();
const day = fecha.getDate().toString().padStart(2, '0');
const numberMonth = fecha.getMonth() + 1;
const month = numberMonth.toString().padStart(2, '0')
const year = fecha.getFullYear();
const hour = fecha.getHours().toString().padStart(2, '0');
const minutes = fecha.getMinutes().toString().padStart(2, '0');
const seconds = fecha.getSeconds().toString().padStart(2, '0');

document.addEventListener("DOMContentLoaded", function () {
    // Obtener los elementos HTML
    let newCommentInput = document.getElementById("nuevo-comentario");
    let addCommentButton = document.getElementById("agregar-comentarios");

    addCommentButton.addEventListener("click", function () {
        // Obtener el texto del nuevo comentario
        let newComment = newCommentInput.value;

        // Crear un nuevo elemento de comentario
        let containerComments = document.getElementById("comments");

        if (newComment.trim() === "") {

            alert("Debe realizar un comentario")
        }

        else {

            let commentDateName = document.createElement("div");
            commentDateName.className = "headComment";
            containerComments.appendChild(commentDateName);

            let commentName = document.createElement("div");
            commentDateName.appendChild(commentName);
            commentName.className = "name";
            commentName.innerHTML = `
            <img src=
            ${(localStorage.getItem("profileImage") === "" || localStorage.getItem("profileImage")=== null)
                    ? "img/avatar.png"
                    : localStorage.getItem("profileImage")
                } >
            ${localStorage.getItem("username") === ""
                    ? localStorage.getItem("storedEmail")
                    : localStorage.getItem("username")
                } 
            `

            let commentDate = document.createElement("div");
            commentDateName.appendChild(commentDate);
            commentDate.className = "date"
            commentDate.textContent = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`


            for (let i = 0; i < 5; i++) {
                let elementSpan = document.createElement("span");
                elementSpan.classList.add("fa", "fa-star")
                if (i < score.length) {
                    elementSpan.classList.add("checked")
                }
                commentDateName.appendChild(elementSpan)
            }

            console.log("El score", score.length)


            const commentElement = document.createElement("div");
            commentElement.className = "descriptionComment";
            containerComments.appendChild(commentElement);

            let textCommentElement = document.createElement("div");
            commentElement.appendChild(textCommentElement);
            textCommentElement.className = "comment";
            textCommentElement.textContent = newCommentInput.value;

            // Limpia el cuadro de texto del comentario después de agregarlo
            newCommentInput.value = "";
        }
    });
});



//Traigo el elemento estrella
let stars = document.getElementsByClassName("fas fa-star")
console.log(stars)

//Lo transformo a un array
let starsArray = Array.from(stars)

console.log("Array de stars", starsArray)


//Creo el array de score, donde guarda las cantidad de estrellas con checked.
let score = []


starsArray.forEach((star, index1) => {

    console.log("Index 1:", index1)
    star.addEventListener("click", function () {
        score = []
        starsArray.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add("checked") : star.classList.remove("checked");
            index1 >= index2 ? score.push(star) : console.log("Index 2:", index2)
        })
    })

});


///////////////////////////////////////////////////////////////////
btn_add = document.getElementById("addCart")

let products_Cart = JSON.parse(localStorage.getItem("cart")) || []
console.log(products_Cart)


let nameUser = localStorage.getItem("storedEmail")

function addProduct(cart_product) {

    let newProduct = {
        "user": nameUser,
        "articles": [
            {
                "id": cart_product.id,
                "name": cart_product.name,
                "count": 1,
                "unitCost": cart_product.cost,
                "currency": cart_product.currency,
                "image": cart_product.images[0]
            }
        ]
    }
    products_Cart.push(newProduct)
}

async function productToTheCart() {
    let response = await fetch(urlProduct);
    if (response.ok) {
        let responseContents = await response.json();
        console.log(responseContents);
        addProduct(responseContents);
    } else {
        console.log("Error: " + response.status)
    }
}



function jsonCart() {
    localStorage.setItem("cart", JSON.stringify(products_Cart))
}

btn_add.addEventListener("click", () => {
    btn_add.disabled = true; // Desactivar el botón

    productToTheCart()
        .then(() => {
            jsonCart();
            mostrarToast();
            audioEtiqueta.setAttribute("src", "audio/tono-mensaje-.mp3")
            audioEtiqueta.play()
            console.log(`Reproduciendo: ${audioEtiqueta.src}`)
            btn_add.disabled = false; // Volver a habilitar el botón después de agregar el producto
        })
        .catch((error) => {
            console.error("Error: " + error);
            btn_add.disabled = false; // Volver a habilitar el botón en caso de error
        });
})

function mostrarToast() {
    var miToast = document.getElementById('miToast');
    var cartel = new bootstrap.Toast(miToast);
    cartel.show();
}

let audioEtiqueta = document.querySelector("audio")