const fileInput = document.getElementById('file-input');
const profileImage = document.getElementById('profileImage');
const uploadButton = document.querySelector('.upload-button');
const removeImageButton = document.getElementById('remove-image');

document.addEventListener("DOMContentLoaded", function() {
    const user = localStorage.getItem("user");
    if (user) {
        document.getElementById("user").textContent = user
        ;
    } else {
        // Si no se encontró un correo electrónico almacenado, redirige al usuario a la página de inicio de sesión.
        window.location.href = "login.html";
    }
});


const defaultImageURL = 'avatar.png';


const storedImage = localStorage.getItem('profileImage');
if (storedImage) {
    profileImage.src = storedImage;
}


uploadButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    fileInput.click();
});

// Agrega un evento para manejar la selección de una imagen local
fileInput.addEventListener('change', () => {
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        profileImage.src = imageUrl;

        const image = new Image();
        image.src = imageUrl;
        image.onload = function() {
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);

            // Convierte el contenido del Canvas en una cadena Base64
            const base64String = canvas.toDataURL("image/jpeg"); 

            console.log(base64String);

            localStorage.setItem('profileImage', base64String);
    }
}
});

// Agrega un evento para eliminar la imagen de perfil
removeImageButton.addEventListener('click', () => {
    profileImage.src = defaultImageURL;
    localStorage.removeItem('profileImage');
});

const input_email = document.getElementById("user")

let localStorage_user = JSON.parse(localStorage.getItem("usuarios"))

let email = localStorage_user[0].Nombre

input_email.value=email