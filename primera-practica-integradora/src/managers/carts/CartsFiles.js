import fs from "fs";

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
      console.log("cartsPrev" + cartsPrev);
      const newCart = { products: [], id };
      cartsPrev.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsPrev));
      return { ...obj, id };
    } catch (err) {
      return err;
    }
  }

  async getCartById(cid) {
    try {
      const cartsPrev = await this.getCarts();
      const cart = cartsPrev.find((c) => c.id === cid);
      if (!cart) {
        return console.log("Imposible mostrar: ese carrito no existe");
      } else {
        return cart;
      }
    } catch (err) {
      return err;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === cid);
      const productIndex = cart.products.findIndex((p) => p.product === pid);

      if (productIndex === -1) {
        cart.products.push({ product: pid, quantity: 1 });
      } else {
        cart.products[productIndex].quantity++;
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (err) {
      return err;
    }
  }
}

const cartManager = new CartManager("Carts.json");
export default cartManager;
