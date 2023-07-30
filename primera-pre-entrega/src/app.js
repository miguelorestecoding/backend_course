import express from "express";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";

import {dirname } from 'path';
import { fileURLToPath } from "url";

const app = express();

//__dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("Escuchando puerto 8080");
});

//RUTAS
app.use('/api/products/', productRouter)
app.use('/api/carts/', cartRouter)
