import { Router } from "express";
import productManager from "../ProductManager.js"

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
  
  router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
      const product = await productManager.getProductsById(+pid);
      res.status(200).json({ messege: "Product", product });
    } catch (err) {
      res.status(500).json({ err });
    }
  });
  
  router.post("/", async (req, res) => {
    console.log(req.body);
    try {
      const newProduct = await productManager.addProduct(req.body);
      res.status(200).json({ message: "Product Created", product: newProduct });
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
      res.status(200).json({ message: "productUpdated", product: productUpdated });
    } catch (err) {
      res.status(500).json({ err });
    }
  });
  
  router.delete("/:pid", async function (req, res) {
    const {pid} = req.params;
    try {
      const response = await productManager.deleteProduct(+pid);
      res.status(200).json({message: "Product deleted successfully"})
    } catch (err) {
      res.status(500).json({ err });
    }
   })

export default router