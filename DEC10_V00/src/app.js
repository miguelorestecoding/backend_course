import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
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


const PORT = 3000

// Websocket
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}` )
});

const socketServer = new Server(httpServer)

const realTimeProducts = []

socketServer.on('connection', (socket) => {
    console.log(`Escucho que el cliente con id: ${socket.id} ha emitido un evento 'connection'`);

    socket.on('disconnect', () => {
        console.log(`Escucho que un cliente ha emitido un evento 'disconnect'`)
    })

    socket.emit('bienvenida', `Soy el servidor y le doy la bienvenida al usuario ${socket.id} !` )

    socket.on('productAdded', realTimeProductAdded => {
      console.log('Escucho que el cliente ha agregado un producto')
      realTimeProducts.push(realTimeProductAdded)
      socketServer.emit('realTimeProducts', realTimeProducts)
    })
})



