let viewComments = document.getElementById("comments");

//Llamo al localStorage que contiene la ID del producto, y genero el enlace para mi fetch
const product = localStorage.getItem("productID")
const URL_CommentsProducts='https://japceibal.github.io/emercado-api/products_comments/'+ product +'.json'


function showComments(array) {

    // Hace el recorrido dentro del array
    for (let comment of array) {

        //creo un div con clase para el nombre y la fecha de cada usuario
        let publication = document.createElement("div");
        publication.classList.add("headComment");
        publication.innerHTML = `<div class=name>${comment.user} </div> <div class=date>${comment.dateTime}</div>`;


        //Creo un div con clase para el contenido del comentario
        let descriptionComment = document.createElement("div");
        descriptionComment.classList.add("descriptionComment");
        descriptionComment.innerHTML = `<div class=comment>${comment.description}</div>`;

        //Hago un for que realice un bucle 5 veces, que cree un elemento span con clase fa fa-star
        //si el indice es menor, que el score, le agrega checked a la clase
        for (let i=0; i<5; i++){
           let elementSpan = document.createElement("span");
           elementSpan.classList.add("fa", "fa-star")
           if (i<comment.score){
                elementSpan.classList.add("checked")
                }
                publication.appendChild(elementSpan)
           }

        // Agrega el div publication y descriptionComment, al div contenedor principal de cada comentario
        viewComments.appendChild(publication);
        viewComments.appendChild(descriptionComment);
    }
}

async function call_UrlComments(){
let response = await fetch (URL_CommentsProducts);
if (response.ok) {
    let responseContents = await response.json();
    console.log(responseContents);
    showComments(responseContents);
} else {
    console.log ("Error: " + response.status)
}
}

call_UrlComments();

//Código Flor y win 
let things= document.getElementById("showP")
function showTheProduct(object){
   things.innerHTML = `
   <div class=product-info>Nombre:${object.name} Precio:${object.currency}${object.cost} Descripción:${object.description} Cantidad vendidos:${object.soldCount}</div>
   `
   for (
    let image of object.images
   ){
    things.innerHTML+= `<div class=product-image><img src=${image} height=300px></div> `
   }
   for (let product of object.relatedProducts){
    things.innerHTML+=`<div class=related-product onclick="setProductID(${product.id})" style="cursor:pointer;">Relacionados:${product.name} <img src=${product.image} height=150px></div>`}
    
   }
    


let urlProduct='https://japceibal.github.io/emercado-api/products/'+ product + '.json'
async function showproduct (){
  let response = await fetch (urlProduct);
  if (response.ok) {
      let responseContents = await response.json();
      console.log(responseContents);
      showTheProduct(responseContents);
  } else {
      console.log ("Error: " + response.status)
  }
  }
 
  showproduct()

  function setProductID (id){
    localStorage.setItem("productID", id);
    window.location='product-info.html'
   }


   /*Codigo Milagros*/

//Para conocer el usuario conectado
const savedSession = localStorage.getItem("usuarios")
    usuarios_Locales = JSON.parse(savedSession)
    //Busco la última sesión iniciada, obtengo la ubicación, el indice
    let lastSession= usuarios_Locales.length - 1;

console.log(usuarios_Locales[lastSession].Nombre)

   fecha= new Date();
   const day = fecha.getDate().toString().padStart(2, '0');
   const numberMonth = fecha.getMonth()+ 1;
const month= numberMonth.toString().padStart(2, '0')
const year= fecha.getFullYear();
const hour = fecha.getHours().toString().padStart(2, '0');
const minutes = fecha.getMinutes().toString().padStart(2, '0');
const seconds= fecha.getSeconds().toString().padStart(2, '0');

   document.addEventListener("DOMContentLoaded", function () {
    // Obtener los elementos HTML
    let newCommentInput = document.getElementById("nuevo-comentario");
    let addCommentButton = document.getElementById("agregar-comentarios");
    let currentComments = document.querySelector(".current-comments");
  
    addCommentButton.addEventListener("click", function () { 
      // Obtener el texto del nuevo comentario
      let newComment = newCommentInput.value;
  
      // Crear un nuevo elemento de comentario
      let containerComments= document.getElementById("comments");
 
    if (newComment.trim()===""){

        alert ("Debe realizar un comentario") }

        else {

      let commentDateName = document.createElement("div");
      commentDateName.className = "headComment";
      containerComments.appendChild(commentDateName);

       let commentName = document.createElement("div");
       commentDateName.appendChild(commentName);
       commentName.className = "name";
       commentName.textContent = `${usuarios_Locales[lastSession].Nombre} `

       let commentDate = document.createElement("div");
       commentDateName.appendChild(commentDate);
       commentDate.className = "date"
       commentDate.textContent = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
       

       for (let i=0; i<5; i++){
        let elementSpan = document.createElement("span");
        elementSpan.classList.add("fa", "fa-star")
        if (i<score.length){
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


//Index 1 llega hasta 4, Index 2 es el Index 1 - estrellas checked
//Si pinto dos estrellas, Index 2 es [2,3,4], y score.push(star), pushea dos estrellas.
//Si tengo 4 estrellas pintadas, Index 2 es [4], si luego pinto las dos primeras, el Index 1 era [3] y Index 2 [4],
//por lo tanto, es false y remueve el checked.

starsArray.forEach((star, index1) => {
    
    console.log("Index 1:", index1)
    star.addEventListener("click", function(){
        score = []
        starsArray.forEach((star, index2) =>  {
            index1 >= index2 ? star.classList.add("checked"): star.classList.remove("checked");
            index1 >= index2 ?  score.push(star):  console.log("Index 2:", index2)
        })
    })

});