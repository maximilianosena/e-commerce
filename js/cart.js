let darkbtn = document.getElementById("darkbtn");
let body = document.body
let isDarkMode = localStorage.getItem("darkMode") === "enabled";
let btn_Switch = document.querySelector(".switch")


function enableDark() {
    body.classList.add("dark-mode")



    localStorage.setItem("darkMode", "enabled")
}

function disableDark() {
    body.classList.remove("dark-mode")




    localStorage.setItem("darkMode", "disabled")
}


if (isDarkMode) {
    enableDark()
    darkbtn.checked = true;
}

darkbtn.addEventListener("change", () => {
    if (darkbtn.checked) {
        enableDark()
    } else {
        disableDark()
    }
})

btn_Switch.addEventListener("click", (e) => {
    e.stopPropagation();
})