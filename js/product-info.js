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
   <div>Nombre:${object.name} Precio:${object.currency}${object.cost} Descripción:${object.description} Cantidad vendidos:${object.soldCount}</div>
   `
   for (
    let image of object.images
   ){
    things.innerHTML+= `<div><img src=${image} height=300px></div> `
   }
   for (let product of object.relatedProducts){
    things.innerHTML+=`<div>Relacionados:${product.name} <img src=${product.image} height=150px></div>`}
    
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

