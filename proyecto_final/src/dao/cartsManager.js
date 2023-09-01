import { cartsModel } from "../db/models/carts.model.js";
import { productsModel } from "../db/models/products.model.js";

class CartsManager {
  async findAll() {
    try {
      const carts = await cartsModel.find();
      return carts;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const newCart = await cartsModel.create(obj);
      return newCart;
    } catch (error) {
      return error;
    }
  }

  async findById(id) {
    try {
      const cart = await cartsModel.findById(id).populate("products");
      return cart;
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
      const response = await cartsModel.updateOne({ _id: id }, { ...obj });
      return response;
    } catch (error) {
      return error;
    }
  }

  // async deleteOne(id) {
  //   try {
  //       const response = await cartsModel.findByIdAndDelete(id)
  //       return response
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async deleteProductFromCart(idCart, idProductToDelete) {
    try {
      console.log(idCart, idProductToDelete);
      const cart = await cartsModel.findById(idCart);
      if (!cart) throw new Error("Cart not found");

      const response = await cartsModel.updateOne(
        { _id: idCart },
        { $pull: { products: { idProduct: idProductToDelete } } }
      );
      console.log(
        "luego de llamar al metodo updateOne que borra con $pull",
        idCart,
        idProduct
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async addProductToCart(idCart, idProductToAdd, productQuantity) {
    try {
      const cart = await cartsModel.findById(idCart);
      if (!cart) throw new Error("Cart not found");
      const product = await productsModel.findById(idProductToAdd);
      if (!product) throw new Error("Product not found");
      const response = await cartsModel.updateOne(
        { _id: idCart },
        { $push: { products: { idProduct: idProductToAdd, quantity: productQuantity } } }
      );
      console.log('Antes del return desde el Manager:', idCart, idProductToAdd);
      return response;
    } catch (error) {
      console.log('error desde el Manager:', idCart, idProductToAdd);
      return error;
    }
  }
}

export const cartsManager = new CartsManager();

/*
{ 
  "products": ["_id", "_id", "_id"]
}
*/
