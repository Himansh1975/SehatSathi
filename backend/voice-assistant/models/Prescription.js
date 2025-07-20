import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema({
  name:        String,
  dosage:      String,
  times:       [String],  // ["08:00","14:00"] or ["3 times a day]
  startDate:   String,    
  endDate:     String,
  instructions:String
}, { _id:false });

const PrescriptionSchema = new mongoose.Schema({
  userId:  { 
    type: String, 
    // ref: 'User', 
    required: true 
  },
  medicines:   [MedicineSchema],
  // for traceability
  extractedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Prescription', PrescriptionSchema);
