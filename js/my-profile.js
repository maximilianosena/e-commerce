const fileInput = document.getElementById('file-input');
const profileImage = document.getElementById('profileImage');
const uploadButton = document.querySelector('.upload-button');
const removeImageButton = document.getElementById('remove-image');


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