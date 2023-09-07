import express from "express";
import {engine} from "express-handlebars";
import "./db/dbConfig.js";
import { __dirname } from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from 'socket.io';
import {productsManager} from '../src/dao/productsManager.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); /*Carpeta Public*/

// handlebars
app.engine("handlebars", engine()); // le digo a express que voy a estar usando un 
// motor de plantillas que voy a llamar handlebars y sus propiedades las voy a traer de  handlebars.engine()
// de handlebars.engine porque estoy importando todo el modulo handlebars. Si importarta solo engine (sería import { engine } .. ) solo pondría engine().
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views"); // Le digo la ubicación de la carpeta views. Ver abajo (en // routes) el router de views.


// routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/", viewsRouter)

const PORT = 8080;

// app.listen(PORT, () => {
//   console.log(`Escuchando puerto ${PORT}`);
// });

// Websocket
const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

// Guardado en Array
// const messages = [];

socketServer.on("connection", async (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });

  const products = await productsManager.findAll()
  socketServer.emit('products', products)

  // socket.on("message", async (infoMessage) => {
  //   // Guardado en Array
  //   // messages.push(infoMessage);

  //   // Guardado en Mongo
  //   try {
  //     await messagesMongo.sendMessage(infoMessage);
  //   } catch (error) {
  //     return error
  //   }

  //   socketServer.emit("chat", messages);
  // });
});
