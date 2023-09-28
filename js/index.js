document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    //Codigo Franco
    document.getElementById("herramientas").addEventListener("click", function () {
        localStorage.setItem("catID", 104);
        window.location = "products.html"
    });
    //Codigo Franco


    //Maxi

    let darkbtn = document.getElementById("darkbtn");
    let body = document.body
    let isDarkMode = localStorage.getItem("darkMode") === "enabled";
    let top_half_page = document.querySelector(".jumbotron")
    let under_half_page = document.querySelector(".album.py-5.bg-light")
    let title = document.querySelectorAll("h3.m-3")
    let text = document.querySelectorAll("p.card-text")
    let btn_Switch = document.querySelector(".switch")



    console.log(text)

    function enableDark(){
        body.classList.add("dark-mode")
        under_half_page.classList.remove("bg-light")
        under_half_page.classList.add("dark")
        top_half_page.classList.add("dark-image")

        for (let i=0; i<title.length; i++){
            title[i].style.color="#212529"
        }

        for (let i=0; i<text.length; i++){
            text[i].style.color="#212529"
        }
        localStorage.setItem ("darkMode", "enabled")
}

function disableDark(){
    body.classList.remove("dark-mode")
        under_half_page.classList.add("bg-light")
        under_half_page.classList.remove("dark")
top_half_page.classList.remove("dark-image")
        
}


if (isDarkMode) {
    enableDark()
     darkbtn.checked = true;
 }

darkbtn.addEventListener("change", () => {
   if (darkbtn.checked){
    enableDark()
    } else {
        disableDark()
    }
})

btn_Switch.addEventListener("click", (e) => {
    e.stopPropagation();
})

});
