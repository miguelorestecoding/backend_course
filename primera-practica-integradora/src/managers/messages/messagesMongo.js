import { messagesModel } from "../../db/models/messages.model.js";

class MessagesMongo {
  async findAll() {
    try {
      const courses = await messagesModel.find();
      return courses;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
        const courses = await messagesModel.create(obj)
        return courses
    } catch (error) {
      return error;
    }
  }

  async findById(id) {
    try {
        const course = await messagesModel.findById(id)
        return course
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
        const response = await messagesModel.updateOne({_id: id}, {...obj})
        return response
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
        const response = await messagesModel.findByIdAndDelete(id)
        return response
    } catch (error) {
      return error;
    }
  }
}

export const messagesMongo = new MessagesMongo()