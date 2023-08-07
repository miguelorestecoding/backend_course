import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import fs from "fs";
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
async function readProductsJson() {
  try {
    const productsData = await fs.promises.readFile(__dirname+'/Products.json', "utf8");
    const realTimeProducts = JSON.parse(productsData);
    // console.log(realTimeProducts);
  } catch (error) {
    console.error('Error:', error);
  }
}

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

    socket.on('productAdded', (message) => {
        console.log(`Escucho que el cliente me dice: ${message}`)
    })
})