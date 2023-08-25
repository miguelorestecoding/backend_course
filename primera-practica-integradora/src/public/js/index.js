const socketClient = io();

const nombreh3 = document.getElementById("nombre");
const formulario = document.getElementById("formulario");
const inputMessage = document.getElementById("mensaje");
const divChat = document.getElementById("chat");

let user;

Swal.fire({
  title: "Bienvenido",
  text: "Ingresa tu email",
  input: "text",
  inputValidator: (value) => {
    if (!value) {
      return "Necesitas ingresar tu nomnbre";
    }
  },
}).then((inputUser) => {
  user = inputUser.value;
  nombreh3.innerText = `Hola ${user}`;
  socketClient.emit("usuarioNuevo", user);
});

formulario.onsubmit = (e) => {
  e.preventDefault();
  const infoMessage = {
    user: user,
    message: inputMessage.value,
  };
  socketClient.emit("mensaje", infoMessage);
};

socketClient.on('chat', mensajes => {
    const chat = mensajes
    .map((objMensaje) => {
      return `<p>${objMensaje.nombre}: ${objMensaje.mensaje}</p>`;
    })
    .join(" ");
  divChat.innerHTML = chat;
})
