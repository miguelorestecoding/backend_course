// Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:
// La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
// Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
// products: Array que contendrá objetos que representen cada producto
// La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
// La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
// product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
// quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

// Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.

import fs from "fs";
import productManager from "./ProductManager.js";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoCarts = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(infoCarts);
      } else {
        return [];
      }
    } catch (err) {
      return err;
    }
  }

  async addCart(obj) {
    try {
      const cartsPrev = await this.getCarts();
      let id;
      if (!cartsPrev.length) {
        id = 1;
      } else {
        id = cartsPrev[cartsPrev.length - 1].id + 1;
      }
      console.log('cartsPrev' + cartsPrev);
      cartsPrev.push({...obj, id})
      await fs.promises.writeFile(this.path, JSON.stringify(cartsPrev));
      return {...obj, id}
    } catch (err) {
      return err;
    }
  }

  async getCartById(cid) {
    try {
        const cartsPrev = await this.getCarts();
        const cart = cartsPrev.find( (c) => c.id === cid)
        if (!cart) {
            return console.log('Imposible mostrar: ese carrito no existe');
        } else {
            return cart;
        }
    } catch (err) {
        return err;
    }
  }

async addProductToCart(cid, pid) {
try {
  const cart = await this.getCartById(cid);

  if (!cart) {
    return console.log('Imposible agregar, ese carrito no existe');
  } 

  const productToAdd = await productManager.getProductsById(pid);

  if (!productToAdd) {
    return console.log('Imposible agregar, ese producto no existe');
  }

  cart.products.push(productToAdd);
  await fs.promises.writeFile(this.path, JSON.stringify(cart));

} catch (err) {
  return err;
}
}
}

const cartManager = new CartManager('Carts.json');
export default cartManager;

// const test = ()=> {
//  console.log(cartManager.getCarts());
// }

// test();

/*
Modelo Cart
{
    "products": []
  }
*/