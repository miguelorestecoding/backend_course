// Primera pre entrega
// Se desarrollará un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compra en el e-commerce

// Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:

// **

// Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:
// La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
// La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
// La ruta raíz POST / deberá agregar un nuevo producto con los campos:
// id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.
// title:String,
// description:String
// code:String
// price:Number
// status:Boolean
// stock:Number
// category:String
// thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
// Status es true por defecto.
// Todos los campos son obligatorios, a excepción de thumbnails
// La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
// La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.

// **  

// Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:
// La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
// Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
// products: Array que contendrá objetos que representen cada producto
// La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
// La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
// product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
// quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

// Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.


import express from "express";
import productManager from "./ProductManager.js";
import cartManager from "./CartManager.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("Escuchando puerto 8080");
});

// *** PRODUCTS ***

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

app.get("/api/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductsById(+pid);
    res.status(200).json({ messege: "Product", product });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.post("/api/products", async (req, res) => {
  console.log(req.body);
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(200).json({ message: "Product Created", product: newProduct });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.put("/api/products/:pid", async function (req, res) {
  const { pid } = req.params;
  try {
    const productUpdated = await productManager.updateProductById(
      +pid,
      req.body
    );
    res.status(200).json({ message: "productUpdated", product: productUpdated });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.delete("/api/products/:pid", async function (req, res) {
  const {pid} = req.params;
  try {
    const response = await productManager.deleteProduct(+pid);
    res.status(200).json({message: "Product deleted successfully"})
  } catch (err) {
    res.status(500).json({ err });
  }
 })

// *** CARTS ***

app.get("/api/carts", async (req, res) => {
  try {
    const limit = parseInt(req.params.limit);
    let carts = await cartManager.getCarts();

    if (!isNaN(limit) && limit > 0) {
      carts = carts.slice(0, limit);
    }
    res.status(200).json({messsege: "Carts", carts});
  } catch (err) {
    res.status(500).json({ err });
  }
 })

 app.get("/api/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(+cid);
    res.status(200).json({ messege: "Cart", cart });
  } catch (err) {
    res.status(500).json({ err });
  }
});

 app.post("/api/carts", async (req, res) => {
  console.log(req.body);
  try {
    const newCart = await cartManager.addCart(req.body);
    res.status(200).json({ message: "Cart Created", cart: newCart });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.
// No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.

// Formato

// Link al repositorio de Github con el proyecto completo, sin la carpeta de Node_modules.

// Sugerencias

// No olvides app.use(express.json())
// No es necesario implementar multer
// Link al video donde se explica.