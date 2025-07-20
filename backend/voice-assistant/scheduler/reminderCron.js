import cron     from 'node-cron';
import Reminder from '../models/Reminder.js';

export default function startReminderCron() {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    await Reminder.updateMany(
      { due: { $lte: now }, sent: false },
      { $set: { sent: true } }
    );
  });
}
