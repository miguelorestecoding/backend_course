const socketClient = io();

const productAdded = document.getElementById("title");

socketClient.on('bienvenida', (message) => {
console.log(`He recibo un evento del Servidor que dice: ${message}`);
})

productAdded.onsubmit = (e) => {
    e.preventDefault();
    socketClient.emit('productAdded', 'Se ha agregado un nuevo producto' )
}