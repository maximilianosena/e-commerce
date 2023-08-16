function show_Cars(array){
    let contenedor= document.getElementById("lista");
  
    //Hace el recorrido dentro del array, en la propiedad productos
    for (let car of array.products) 
    
    //La variable contenido muestra las etiquetas HTML, y como se presenta la información de cada artículo
    //Cree un div con class container_auto, para poder manejar el estilo del contenedor de cada artículo
    //Cree un div con class container_animado, que contiene la imagen,el nombre, el precio y la cdad vendida, para realizar cambios por ej hover y alinear la cdad vendida con la img
    //El span description está por fuera del div container_animado
  
    { let contenido= 
        `<div class=container_auto>
        <div class=container_animado> <img src="${car.image}" height=300> 
        <span class=texto-hover>${car.name} <p>${car.currency} ${car.cost} </p></span> 
     <span id=vendidos>${car.soldCount} vendidos </span> 
        </div>
        <span class=description>${car.description}</span> 
    
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
      show_Cars(data); 
    })
  
    //codigo Flor y Maxi