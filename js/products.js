let contenedor = document.getElementById("lista");
let products = [];

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}


function show_Products(array) {



  for (let product of array) {
    let contenido =
      `<div class=container_product onclick="setProductID(${product.id})" style="cursor:pointer;">
      <div class=container_animado> <img src="${product.image}" height=300> 
      <span class=texto-hover>${product.name} <p>${product.currency} ${product.cost} </p></span> 
   <span id=vendidos>${product.soldCount} vendidos </span> 
      </div>
      <span class=description>${product.description}</span> 
  
  </div>`;

    contenedor.innerHTML += contenido
  }
}



//Buscador de categorias
const categorias = localStorage.getItem("catID")

console.log(" Numero de categoria: " + categorias)

let url = 'https://japceibal.github.io/emercado-api/cats_products/' + categorias + '.json'

fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    console.log(data);
    products = data.products
    show_Products(products);
  })




// Código de Filtros

let btn_increase = document.getElementById("sortAsc")
let btn_decrease = document.getElementById("sortDesc")
let btn_relevance = document.getElementById("sortByCount")


btn_increase.addEventListener("click", function () {
  contenedor.innerHTML = "";

  let ascendente = products.sort((a, b) => {
    return a.cost - b.cost
  })
  console.log(ascendente)
  show_Products(ascendente)
})


btn_decrease.addEventListener("click", function () {
  contenedor.innerHTML = "";

  let descendente = products.sort((a, b) => {
    return b.cost - a.cost
  })
  console.log(descendente)
  show_Products(descendente)
})


btn_relevance.addEventListener("click", function () {
  contenedor.innerHTML = "";

  let descendente = products.sort((a, b) => {
    return b.soldCount - a.soldCount
  })
  console.log(descendente)
  show_Products(descendente)
}
)


//Código buscador

let search = document.getElementById("search-input");


function searching(products) {
  contenedor.innerHTML = "";

  const filter = products.filter(producto => producto.name.toLowerCase().includes(search.value.toLowerCase()) ||
    producto.description.toLowerCase().includes(search.value.toLowerCase()));


  if (filter.length === 0) {
    contenedor.innerHTML = "No hay resultado"
  } else {

    show_Products(filter)
  }
}


search.addEventListener('input', function () {
  searching(products);
});

//Codigo filtrado por precio

let btn_filter = document.getElementById("rangeFilterCount");
let btn_clear = document.getElementById("clearRangeFilter");
let price_min = document.getElementById("rangeFilterCountMin");
let price_max = document.getElementById("rangeFilterCountMax");


btn_filter.addEventListener("click", function () {
  contenedor.innerHTML = "";

  let tproducts = products;
  let minValue = parseInt(price_min.value);
  let maxValue = parseInt(price_max.value);

  if (!isNaN(minValue) && !isNaN(maxValue)) {
    let filterArray = tproducts.filter((product) => (product.cost >= minValue && product.cost <= maxValue));
    console.log(filterArray);
    show_Products(filterArray);
  } else if (isNaN(minValue) && !isNaN(maxValue)) {
    let filterArray = tproducts.filter((product) => (product.cost <= maxValue));
    show_Products(filterArray);
  } else if (!isNaN(minValue) && isNaN(maxValue)) {
    let filterArray = tproducts.filter((product) => (product.cost >= minValue));
    show_Products(filterArray);
  } else {
    show_Products(tproducts);
  }

}
);

btn_clear.addEventListener("click", function () {
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";

  contenedor.innerHTML = "";
  show_Products(products);
});

