import mongoose from "mongoose";

const URI =
  "mongodb+srv://miguelcapo:capomiguel@cluster0.v8zjmrg.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => {
    console.log("Conectado a la Base de Datos");
  })
  .catch((error) => {
    console.log(error);
  });