import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    const timestamp = new Date().toISOString();
    try {
      res.status(200).json({ message: 'OK', timestamp });
    } catch (error) {
      res.status(503).json({ message: 'Error contacting API:' });
      console.error(error, timestamp);
    }
  });

export default router;