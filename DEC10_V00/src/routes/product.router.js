import { Router } from "express";
import productManager from "../ProductManager.js";
import { socketServer, products } from "../app.js";

const router = Router();

// *** PRODUCTS ***

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  // console.log('Desde el product.router, req.body:', req.body);
  try {
    const newProduct = await productManager.addProduct(req.body);

    // esto es agregado para el websocket y hanldebars
    let id;
      if (!products.length) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }
    const newProductInfo = req.body
    products.push({...newProductInfo, id});
    // console.log('Desde el product.router, newProductInfo:', newProductInfo);
    // console.log('products desde el product.router', products)
    socketServer.emit('productos-actualizados', products);
    // res.status(200).json({ message: "Product Created", product: newProduct });
    // res.redirect('/home');
    res.redirect('/realTimeProducts');
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductsById(+pid);
    res.status(200).json({ messege: "Product", product });
  } catch (err) {
    res.status(500).json({ err });
  }
});


router.put("/:pid", async function (req, res) {
  const { pid } = req.params;
  try {
    const productUpdated = await productManager.updateProductById(
      +pid,
      req.body
    );
    res
      .status(200)
      .json({ message: "productUpdated", product: productUpdated });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete("/:pid", async function (req, res) {
  const { pid } = req.params;
  try {
    const response = await productManager.deleteProduct(+pid);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Agregadp para websockets
router.post("/delete", async function (req, res) {
  const { productId } = req.body;
  try {
    const response = await productManager.deleteProduct(+productId);
    // res.status(200).json({ message: "Product deleted successfully" });
    res.redirect('/realTimeProducts');
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;


// router.delete("/", async (req, res) => {
//   const productId = parseInt(req.body.productId);

//   try {
//     const productIndex = products.findIndex((product) => product.id === productId);

//     if (productIndex !== -1) {
//       products.splice(productIndex, 1);
//       socketServer.emit("productos-actualizados", products);
//       res.status(200).json({ message: "Product deleted successfully" });
//     } else {
//       res.status(404).json({ message: "Product not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });