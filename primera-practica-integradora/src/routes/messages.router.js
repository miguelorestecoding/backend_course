import { Router } from 'express';
import { messagesMongo } from '../managers/messages/messagesMongo.js';
import { messagesModel } from '../db/models/messages.model.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
      const messages = await messagesMongo.getMessages();
      if (messages.length) {
        res.status(200).json({ message: "Messages", messages });
      } else {
        res.status(200).json({ message: "No Messages found", messages });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  router.post("/", async (req, res) => {
    const {user, message} = req.body;
    if (!user || !message) {
        res.status(400).json({ description: "Some data is missing"});
    }
  try {
    const newMessage = await messagesMongo.sendMessage(req.body)
    res.status(200).json({ description: "Message sended", message: newMessage });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router