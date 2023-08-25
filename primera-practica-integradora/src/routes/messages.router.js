import { Router } from 'express';
import { messagesMongo } from '../managers/messages/messagesMongo.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
      const messages = await messagesMongo.findAll();
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
        res.status(400).json({ message: "Some data is missing"});
    }
  try {
    const newMessage = await messagesMongo.createOne(req.body)
    res.status(200).json({ message: "Product created", product: newMessage });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router