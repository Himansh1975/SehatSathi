import mongoose from 'mongoose';

/**
 * We stash the entire JSON that GPT-4o returns (whatever shape it has)
 * in aiResponse, so the client can retrieve the exact data later.
 */
const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      // ref: 'User',
      required: true,
    },

    aiResponse: {
      type: mongoose.Schema.Types.Mixed,   
      required: true,
    },

    extractedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'medicineinfos' }          
);

export default mongoose.model('MedicineInfo', schema);
