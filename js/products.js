let contenedor= document.getElementById("lista");
let products = []; //array que toma los valores del fetch para usarlos como alcance global


function show_Products(array){
  

  //Hace el recorrido dentro del array, en la propiedad productos
  for (let product of array) 
  
  //La variable contenido muestra las etiquetas HTML, y como se presenta la información de cada artículo
  //Cree un div con class container_auto, para poder manejar el estilo del contenedor de cada artículo
  //Cree un div con class container_animado, que contiene la imagen,el nombre, el precio y la cdad vendida, para realidecreaser cambios por ej hover y alinear la cdad vendida con la img
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
  
 
  
  //Buscador de categorias
  const categorias = localStorage.getItem("catID")

  console.log(" Numero de categoria: " + categorias)

  let url= 'https://japceibal.github.io/emercado-api/cats_products/' + categorias + '.json'

  fetch(url)
  .then((response) => { 
    if (response.ok) {
      return response.json(); 
    }
  })
  .then((data) => {
    console.log(data); 
    products=data.products
    show_Products(products);
  })
 

    //codigo Flor y Maxi

    // Código de Filtros

let btn_increase = document.getElementById("sortAsc")
let btn_decrease= document.getElementById("sortDesc")
let btn_relevance= document.getElementById("sortByCount")


btn_increase.addEventListener("click", function(){
  contenedor.innerHTML=""; //Vacío el contenedor para volver a usarlo

  //Ordeno el array de products de manera ascendente, en base al precio
  let ascendente= products.sort((a,b)=>{  
  return a.cost - b.cost
 })
console.log(ascendente)
show_Products(ascendente) 
})


btn_decrease.addEventListener("click", function(){
  contenedor.innerHTML=""; //Vacío el contenedor para volver a usarlo
  
  //Ordeno el array de products de manera descendente, en base al precio
let descendente= products.sort((a,b)=>{ 
  return  b.cost - a.cost
 })
console.log(descendente)
show_Products(descendente)
})


btn_relevance.addEventListener("click", function(){
  contenedor.innerHTML=""; //Vacío el contenedor para volver a usarlo
 
 //Ordeno el array de products de manera descendente, en base a cdad vendida
  let descendente= products.sort((a,b)=>{ 
  return  b.soldCount - a.soldCount
 })
console.log(descendente)
show_Products(descendente) 
}
  )


//Código buscador

let search = document.getElementById("search-input");

//Función que busca coincidencias entre el input y el nombre y descripcion del array

function searching(products) {
  contenedor.innerHTML= "";

  //Filtro a el array de productos, y creo un nuevo array "filter"
  //el nombre y descripción del producto tienen que coincidir, incluir los caracteres utilizados en el input.
  //toLowerCase(), para llevar todos los caracteres a minuscula, y que no se filtre por diferencia entre mayuscula y 
  //minuscula

const filter = products.filter(producto=> producto.name.toLowerCase().includes(search.value.toLowerCase())||
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
  searching(products); //Invoco la función de searching, pasando como parametro los productos
});

//Codigo filtrado por precio (Gonza)

let btn_filter = document.getElementById("rangeFilterCount");
let btn_clear = document.getElementById("clearRangeFilter");
let price_min = document.getElementById("rangeFilterCountMin");
let price_max = document.getElementById("rangeFilterCountMax");


btn_filter.addEventListener("click", function(){
  contenedor.innerHTML="";
  
 
    let tproducts = products;
    let minValue = parseInt(price_min.value);
    let maxValue = parseInt(price_max.value);

    if (!isNaN(minValue) && !isNaN(maxValue)){
      let filterArray = tproducts.filter((product) => (product.cost >= minValue && product.cost <= maxValue));
      console.log(filterArray);
      show_Products(filterArray);
    }else if(isNaN(minValue) && !isNaN(maxValue)){
        let filterArray = tproducts.filter((product) => ( product.cost <= maxValue));
        show_Products(filterArray);
      }else if (!isNaN(minValue) && isNaN(maxValue)){
        let filterArray = tproducts.filter((product) => (product.cost >= minValue ));
        show_Products(filterArray);
        console.log("error");
      }else{
        show_Products(tproducts);
      }
     
  }   
);

btn_clear.addEventListener("click", function(){
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";

  contenedor.innerHTML="";
    show_Products(products);
  });