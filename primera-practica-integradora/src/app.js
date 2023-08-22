import express  from "express"
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

import './db/dbConfig.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// public
app.use(express.static(__dirname+'/public'));

// handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views')
app.set('views engine', 'handlebars');

// routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080

app.listen(PORT, ()=>{
    console.log(`Escuchando puerto ${PORT}` )
})