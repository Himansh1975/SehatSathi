import express from 'express';
import Reminder from '../models/Reminder.js';

const router = express.Router();

// GET /api/reminders/due?userId
router.get('/due', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'missing-userId' });

  const now = new Date();
  const list = await Reminder.find({
    userId,
    due: { $lte: now },
    sent: false
  });
  res.json({ reminders: list });
});

// POST /api/reminders/:id/ack
// router.post('/:id/ack', async (req, res, next) => {
//   await Reminder.findByIdAndUpdate(req.params.id, { acknowledged: true });
//   res.json({ ok: true });
// });
router.post('/:id/ack', async (req, res) => {
  try {
    await Reminder.findByIdAndUpdate(req.params.id, { acknowledged: true });
    res.json({ ok: true });
  } catch (err) {
    console.error("Acknowledgement failed:", err);
    res.status(500).json({ error: 'ack-failed' });
  }
});

// GET /api/reminders/all?userId=…

// app.get("/api/reminders/all", async (req, res) => {
//   const { userId } = req.query;
//   try {
//     const reminders = await Reminder.find({ userId, due: { $gte: new Date() } })
//       .sort({ due: 1 });
//     console.log("Reminder payload:", reminders);
//     res.json({ reminders });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

router.get("/all", async (req, res) => {
  const { userId } = req.query;
  try {
    const reminders = await Reminder.find({ userId }).sort({ due: 1 });
    console.log("Reminder payload:", reminders);
    res.json({ reminders });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


export default router;
