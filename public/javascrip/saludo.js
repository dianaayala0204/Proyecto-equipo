const form = document.getElementById('saludoForm');
const mensajeDiv = document.getElementById('saludoMensaje');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;     /* si envia sin mensaje no hace evento*/

    const mensaje = `¡Hola, ${nombre}! ¡Bienvenido a nuestra página web!`

    mensajeDiv.textContent = mensaje
});
