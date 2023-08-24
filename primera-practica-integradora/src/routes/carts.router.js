import { Router } from "express";
import { cartsMongo } from "../managers/carts/CartsMongo.js";

const router = Router();

// router.get("/", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit);
//     let carts = await cartsMongo.findAll();

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
//     const cart = await cartsMongo.findById(+cid);
//     res.status(200).json({ messege: "Cart", cart });
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const carts = await cartsMongo.findAll();
      res.status(200).json({ messege: "Carts", carts });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartsMongo.findById(id);
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
    const newCart = await cartsMongo.createOne(req.body);
    res.status(200).json({ message: "Cart Created", cart: newCart });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// FATA METODO AGREGAR PRODUCTOS AL CARRITO POR PARAMS? Esto existía en fileSystem.
// router.post("/:cid/product/:pid", async (req, res) => {
//   const {cid, pid} = req.params;
//   // console.log('cid ' + cid);
//   // console.log('pid ' + pid);
//   try {
//     const addProduct = await cartsMongo./*Aca va el metodo para agregar productos al carrito. No lo  tengo en CartsMongo*/(+cid, +pid);
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