const socketClient = io()

const nombreh3 = document.getElementById("nombre");
const formulario = document.getElementById("formulario");
const inputMensaje = document.getElementById("mensaje");
const divChat = document.getElementById("chat");

let usuario

Swal.fire({
    title: "Bienvenido",
    text: "Ingresa tu nombre",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "Necesitas ingresar tu nomnbre";
      }
    },
  }).then((nombre) => {
    usuario = nombre.value;
    nombreh3.innerText = `Hola ${usuario}`;
    socketClient.emit("usuarioNuevo", usuario);
  });