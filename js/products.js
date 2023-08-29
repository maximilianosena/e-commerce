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
//Código buscador

let search = document.getElementById("search-input");

//Función que busca coincidencias entre el input y el nombre y descripcion del array

function searching(productos) {
  contenedor.innerHTML= "";

  //Filtro a el array de productos, y creo un nuevo array "filter"
  //el nombre y descripción del producto tienen que coincidir, incluir los caracteres utilizados en el input.
  //toLowerCase(), para llevar todos los caracteres a minuscula, y que no se filtre por diferencia entre mayuscula y 
  //minuscula

const filter = productos.filter(producto=> producto.name.toLowerCase().includes(search.value.toLowerCase())||
 producto.description.toLowerCase().includes(search.value.toLowerCase()));
 

 //Si el array de filter está vacio, devuelve que no hay resultados
 if (filter.length===0){
contenedor.innerHTML= "No hay resultado"
 } else {

  //sino, invoca la función show_Products, pasando como parametro el array filter.
 show_Products(filter)
}
}

//Evento que llama a la función buscar
search.addEventListener('input', function(){
  fetch(url)
  .then((response) => { 
    if (response.ok) {
      return response.json(); 
    }
  })
  .then((data) => {
    console.log(data); 
    productos = data.products //agrego un let de productos y le meto la info
  }) 
  searching(productos); //Invoco la función de searching, pasando como parametro los productos
});