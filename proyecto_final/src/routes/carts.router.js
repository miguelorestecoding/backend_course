import { Router } from "express";
import { cartsManager } from "../dao/cartsManager.js";

const router = Router();

// router.get("/", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit);
//     let carts = await cartsManager.findAll();

//     if (!isNaN(limit) && limit > 0) {
//       carts = carts.slice(0, limit);
//     }
//     res.status(200).json({ messsege: "Carts", carts });
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });

// router.get("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   try {
//     const cart = await cartsManager.findById(+cid);
//     res.status(200).json({ messege: "Cart", cart });
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.findAll();
      res.status(200).json({ messege: "Carts", carts });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartsManager.findById(id);
    if (!cart) {
      res.status(404).json({ message: "Invalid Id" });
    } else {
      res.status(200).json({ messege: "Cart found", cart });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  // console.log(req.body);
  try {
    const newCart = await cartsManager.createOne(req.body);
    res.status(200).json({ message: "Cart Created", cart: newCart });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete("/:id", async (req, res) => {
  const {id} = req.params
  try {
    const deleteCart = await cartsManager.deleteOne(id);
    res.status(200).json({ message: "Cart deleted", cart: deleteCart})
  } catch (error) {
    res.status(500).json({ error });
  }
});

// FATA METODO AGREGAR PRODUCTOS AL CARRITO POR PARAMS? Esto existía en fileSystem.
// router.post("/:cid/product/:pid", async (req, res) => {
//   const {cid, pid} = req.params;
//   // console.log('cid ' + cid);
//   // console.log('pid ' + pid);
//   try {
//     const addProduct = await cartsManager./*Aca va el metodo para agregar productos al carrito. No lo  tengo en cartsManager*/(+cid, +pid);
//     res.status(200).json({mesage: 'Product added to cart', product: addProduct});
//   } catch (err) {
//     res.status(500).json({ err})
//   }
// })

export default router;

/*
{ 
  "products": ["_id", "_id", "_id"]
}
*/