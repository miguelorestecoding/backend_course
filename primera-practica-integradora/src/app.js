import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import messagesRouter from "./routes/messages.router.js";
import { Server } from "socket.io";

import "./db/dbConfig.js";
import { messagesMongo } from "./managers/messages/messagesMongo.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); /*Carpeta Public*/

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);
app.use("/api/messages", messagesRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

// Guardado en Array
// const messages = [];

socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });

  socket.on("message", async (infoMessage) => {
    // Guardado en Array
    // messages.push(infoMessage);

    // Guardado en Mongo
    try {
      await messagesMongo.sendMessage(infoMessage);
    } catch (error) {
      return error
    }

    socketServer.emit("chat", messages);
  });
});
