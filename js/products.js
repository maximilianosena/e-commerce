let contenedor= document.getElementById("lista");

function show_Products(array){
  

  //Hace el recorrido dentro del array, en la propiedad productos
  for (let product of array) 
  
  //La variable contenido muestra las etiquetas HTML, y como se presenta la información de cada artículo
  //Cree un div con class container_auto, para poder manejar el estilo del contenedor de cada artículo
  //Cree un div con class container_animado, que contiene la imagen,el nombre, el precio y la cdad vendida, para realizar cambios por ej hover y alinear la cdad vendida con la img
  //El span description está por fuera del div container_animado

  { let contenido= 
      `<div class=container_product>
      <div class=container_animado> <img src="${product.image}" height=300> 
      <span class=texto-hover>${product.name} <p>${product.currency} ${product.cost} </p></span> 
   <span id=vendidos>${product.soldCount} vendidos </span> 
      </div>
      <span class=description>${product.description}</span> 
  
  </div>`;

//Cada artículo se va agregando al div container
  contenedor.innerHTML += contenido
  }
}
  
  let url= 'https://japceibal.github.io/emercado-api/cats_products/101.json'
  
  fetch(url)
  .then((response) => { 
    if (response.ok) {
      return response.json(); 
    }
  })
  .then((data) => {
    console.log(data); 
    let category = data.products
    show_Products(category);
  }) 

    //codigo Flor y Maxi

    // Código de Filtros

let btn_AZ = document.getElementById("sortAsc")
let btn_ZA= document.getElementById("sortDesc")
let btn_relevance= document.getElementById("sortByCount")


btn_AZ.addEventListener("click", function(){
  contenedor.innerHTML=""; //Vacío el contenedor para volver a usarlo
  fetch(url)
  .then((response) => { 
    if (response.ok) {
      return response.json(); 
    }
  })
  .then((data) => { //Obtengo la información y la ordeno de manera ascendente
let ascendente= data.products.sort((a,b)=>{ 
  return a.cost - b.cost
 })
console.log(ascendente)
show_Products(ascendente) 
}
  )
})

btn_ZA.addEventListener("click", function(){
  contenedor.innerHTML=""; //Vacío el contenedor para volver a usarlo
  fetch(url)
  .then((response) => { 
    if (response.ok) {
      return response.json(); 
    }
  })
  .then((data) => { //Obtengo la información y la ordeno de manera descendente
let descendente= data.products.sort((a,b)=>{ 
  return  b.cost - a.cost
 })
console.log(descendente)
show_Products(descendente)
}
  )
})

btn_relevance.addEventListener("click", function(){
  contenedor.innerHTML=""; //Vacío el contenedor para volver a usarlo
  fetch(url)
  .then((response) => { 
    if (response.ok) {
      return response.json(); 
    }
  })
  .then((data) => { //Obtengo la información y la ordeno de manera descendente
let descendente= data.products.sort((a,b)=>{ 
  return  b.soldCount - a.soldCount
 })
console.log(descendente)
show_Products(descendente) 
}
  )
})