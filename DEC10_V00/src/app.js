import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import  { __dirname } from './utils.js';
import { engine } from 'express-handlebars';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);

// handlebars
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', __dirname+'/views');


// app.get('/', (req, res) => {
//     res.send('HANDLEBARS')
// })
// app.get('/view1', (req, res) => {
//     res.render('view1')
// })

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}` )
});
