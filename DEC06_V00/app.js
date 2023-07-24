// Consigna
// Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
// Aspectos a incluir:
// Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos.
// Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
import express from "express";
import productManager from "./ProductManager.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("Escuchando puerto 8080");
});

// El servidor debe contar con los siguientes endpoints:
// ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
// Si no se recibe query de límite, se devolverán todos los productos
// Si se recibe un límite, sólo devolver el número de productos solicitados

app.get("/api/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    let products = await productManager.getProducts();

    if (!isNaN(limit) && limit > 0) {
      products = products.slice(0, limit);
    }
    res.status(200).json({ messege: "Products", products });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos.

app.get("/api/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductsById(+pid);
    res.status(200).json({ messege: "Product", product });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Sugerencias
// Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
// Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets.

// Link al repositorio de Github con el proyecto completo, el cual debe incluir:
// carpeta src con app.js dentro y tu ProductManager dentro.
// package.json con la info del proyecto.
// NO INCLUIR LOS node_modules generados.