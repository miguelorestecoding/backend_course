const socketClient = io();

const realTimeProductsForm = document.getElementById("realTimeProductsForm");

socketClient.on('bienvenida', (message) => {
console.log(`He recibo un evento del Servidor que dice: ${message}`);
})

