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


export const PORT = 3000

// Websocket
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}` )
});

// Traigo products por File System
const infoProducts = await fs.promises.readFile(__dirname+'/Products.json', "utf8");
export const products = JSON.parse(infoProducts);
// console.log('products desde app.js: ', products)

export const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`)
    socketServer.emit('productos-actualizados', products);
});