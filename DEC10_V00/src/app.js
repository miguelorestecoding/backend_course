import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import  { __dirname } from './utils.js';
import { engine } from 'express-handlebars';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

//RUTAS
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);

app.use('/', viewsRouter);


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}` )
});
