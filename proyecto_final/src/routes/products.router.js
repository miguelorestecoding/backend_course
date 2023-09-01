import { Router } from "express";
import { productsManager } from "../dao/productsManager.js";
import fs from 'fs';
import {__dirname} from "../utils.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    //const {limit, page, query, sort} = req.query
    const products = await productsManager.findAll();
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
    const product = await productsManager.findById(id);
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
  const { title, code, price, stock, thumbnails } = req.body;
  if (!title || !code || !price || !stock || !thumbnails) {
    res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const newProduct = await productsManager.createOne(req.body);
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
  const { id } = req.params;
  try {
    const deleteProduct = await productsManager.deleteOne(id);
    res
      .status(200)
      .json({ message: "Product deleted", product: deleteProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
});

/// Agregar productos a Mongo
const path = __dirname+'/Users.json';
router.get('/addProductsToMongo', async (req, res) => {
    const productsData = await fs.promises.readFile(path) 
    await productsManager.addProductsToMongo(JSON.parse(productsData))
    res.json({message: 'Users added successfully'})
})

export default router;

// METODO GET ANTES DE PONERLE EL PAGINATE
// router.get("/", async (req, res) => {
//   try {
//     const products = await productsManager.findAll();
//     if (products.length) {
//       res.status(200).json({ message: "Products", products });
//     } else {
//       res.status(200).json({ message: "No products found", products });
//     }
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });
