import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import fs from "fs";
import path from 'path';
import  { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))

// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

//RUTAS
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);

app.use('/', viewsRouter);

//ProductManager
(async () => {
  const filePath = path.join(__dirname, 'products.json'); // Ruta completa al archivo products.json

  try {
    const infoProducts = await fs.promises.readFile(filePath, 'utf8'); // Leer el contenido del archivo
    const productsArray = JSON.parse(infoProducts); // Parsear el contenido del archivo JSON
    // Ahora puedes usar la variable "productsArray" que contiene el array de objetos
    // console.log(productsArray);
  } catch (error) {
    console.error('Error:', error);
  }
})();




const PORT = 3000

// Websocket
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}` )
});

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log(`Escucho que el cliente con id: ${socket.id} ha emitido un evento 'connection'`);

    socket.on('disconnect', () => {
        console.log(`Escucho que un cliente ha emitido un evento 'disconnect'`)
    })

    socket.emit('bienvenida', `Soy el servidor y te doy la bienvenida, querido usuario ${socket.id} !` )

    // socket.on('productAdded', (message) => {
    //     console.log(`Escucho que el cliente me dice: ${message}`)
    // })
})