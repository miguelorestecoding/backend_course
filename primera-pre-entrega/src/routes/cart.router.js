import { Router } from "express";
import cartManager from "../CartManager.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      let carts = await cartManager.getCarts();
  
      if (!isNaN(limit) && limit > 0) {
        carts = carts.slice(0, limit);
      }
      res.status(200).json({messsege: "Carts", carts});
    } catch (err) {
      res.status(500).json({ err });
    }
   })
  
   router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await cartManager.getCartById(+cid);
      res.status(200).json({ messege: "Cart", cart });
    } catch (err) {
      res.status(500).json({ err });
    }
  });
  
   router.post("/", async (req, res) => {
    // console.log(req.body);
    try {
      const newCart = await cartManager.addCart(/*req.body*/);
      res.status(200).json({ message: "Cart Created", cart: newCart });
    } catch (err) {
      res.status(500).json({ err });
    }
  });
  
  router.post("/:cid/product/:pid", async (req, res) => {
    const {cid, pid} = req.params;
    // console.log('cid ' + cid);
    // console.log('pid ' + pid);
    try {
      const addProduct = await cartManager.addProductToCart(+cid, +pid);
      res.status(200).json({mesage: 'Product added to cart', product: addProduct});
    } catch (err) {
      res.status(500).json({ err})
    }
  })

export default router;