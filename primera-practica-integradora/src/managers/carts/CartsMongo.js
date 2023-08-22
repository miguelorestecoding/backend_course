import { cartsModel } from "../../db/models/carts.model.js";

class CartsMongo {
  async findAll() {
    try {
      const courses = await cartsModel.find();
      return courses;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
        const courses = await cartsModel.create(obj)
        return courses
    } catch (error) {
      return error;
    }
  }

  async findById(id) {
    try {
        const course = await cartsModel.findById(id)
        return course
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
        const response = await cartsModel.updateOne({_id: id}, {...obj})
        return response
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
        const response = await cartsModel.findByIdAndDelete(id)
        return response
    } catch (error) {
      return error;
    }
  }
}

export const cartsMongo = new CartsMongo()