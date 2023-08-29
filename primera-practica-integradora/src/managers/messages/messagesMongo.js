import { messagesModel } from "../../db/models/messages.model.js";

class MessagesMongo {
  async getMessages() {
    try {
      const messages = await messagesModel.find();
      return messages;
    } catch (error) {
      return error;
    }
  }

  async sendMessage(obj) {
    try {
        const newMessage = await messagesModel.create(obj)
        return newMessage
    } catch (error) {
      return error;
    }
  }

}

export const messagesMongo = new MessagesMongo()