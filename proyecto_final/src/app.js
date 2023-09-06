import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";


import "./db/dbConfig.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); /*Carpeta Public*/

// handlebars
app.engine("handlebars", handlebars.engine()); // le digo a express que voy a estar usando un motor de plantillas que voy a llamar handlebars y sus propiedades las voy a traer de  handlebars.engine()
// de handlebars.engine porque estoy importando todo el modulo handlebars. Si importarta solo engine (sería import { engine } .. ) solo pondría engine().
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


// routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando puerto ${PORT}`);
});

// const socketServer = new Server(httpServer);

// Guardado en Array
// const messages = [];

// socketServer.on("connection", (socket) => {
//   console.log(`Usuario conectado: ${socket.id}`);

//   socket.on("disconnect", () => {
//     console.log(`Usuario desconectado: ${socket.id}`);
//   });

//   socket.on("message", async (infoMessage) => {
//     // Guardado en Array
//     // messages.push(infoMessage);

//     // Guardado en Mongo
//     try {
//       await messagesMongo.sendMessage(infoMessage);
//     } catch (error) {
//       return error
//     }

//     socketServer.emit("chat", messages);
//   });
// });
