import mongoose from 'mongoose';

const ReminderSchema = new mongoose.Schema({
  userId:       { type: String, required: true },
  prescription: { type: mongoose.Types.ObjectId, ref: 'Prescription' },
  medName:      String,
  due:          Date,
  sent:         { type: Boolean, default: false },
  acknowledged: { type: Boolean, default: false }
});
ReminderSchema.index({ userId:1, due:1, sent:1 });


export default mongoose.model('Reminder', ReminderSchema);
