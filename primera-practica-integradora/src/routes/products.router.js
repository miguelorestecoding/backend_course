import { Router} from 'express';
import { productsMongo } from '../managers/products/ProductsMongo.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
      const products = await productsMongo.findAll();
      if (products.length) {
        res.status(200).json({ message: "Products", products });
      } else {
        res.status(200).json({ message: "No products found", products });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await productsMongo.findById(id);
      if (!product) {
        res.status(400).json({ message: "Invalid id", product });
      } else {
        res.status(200).json({ message: "Product found", product });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  router.post("/", async (req, res) => {
      const {title, code, price, stock, thumbnails} = req.body;
      if (!title || !code || !price || !stock || !thumbnails) {
          res.status(400).json({ message: "Some data is missing"});
      }
    try {
      const newProduct = await productsMongo.createOne(req.body)
      res.status(200).json({ message: "Product created", product: newProduct });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  export default router;