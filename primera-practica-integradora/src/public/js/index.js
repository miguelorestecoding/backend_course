const socketClient = io();

const nombreh3 = document.getElementById("nombre");
const formulario = document.getElementById("formulario");
const inputMessage = document.getElementById("mensaje");
const divChat = document.getElementById("chat");

let chatUser;

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
  chatUser = inputUser.value;
  nombreh3.innerText = `Hola ${chatUser}`;
  socketClient.emit("usuarioNuevo", chatUser);
});

formulario.onsubmit = (e) => {
  e.preventDefault();
  const infoMessage = {
    user: chatUser,
    message: inputMessage.value,
  };
  socketClient.emit("message", infoMessage);
  inputMessage.value = '';
};

socketClient.on('chat', mensajes => {
    const chat = mensajes
    .map((objMensaje) => {
      return `<p>${objMensaje.user}: ${objMensaje.message}</p>`;
    })
    .join(" ");
  divChat.innerHTML = chat;
})


