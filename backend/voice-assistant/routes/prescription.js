import express from 'express';
import fs from 'fs/promises';
import multer from 'multer';
import OpenAI from 'openai';
import dayjs from 'dayjs';

import Prescription from '../models/Prescription.js';
import Reminder from '../models/Reminder.js';
import { resolveEnd, buildReminderDocs } from '../utils/scheduleReminders.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function handleAnalyze(req, res) {
  try {
    const { path, mimetype } = req.file;
    const b64 = (await fs.readFile(path)).toString('base64');
    const dataURL = `data:${mimetype};base64,${b64}`;

    const resp = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0,
      max_tokens: 1024,
      messages: [
        {
          role: 'system',
          content:
            'You are a medical-reminder extraction service.\n' +
            'From the incoming image, identify every medicine the patient must take.\n' +
            'Return ONLY valid JSON matching this TypeScript type (no code fences, no extra keys):\n' +
            'type Reminder = { name: string; dosage: string; times: string[]; startDate: string; endDate: string; instructions: string }\n' +
            '{ reminders: Reminder[] }'
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Extract the reminders.' },
            { type: 'image_url', image_url: { url: dataURL } }
          ]
        }
      ]
    });

    const json = JSON.parse(resp.choices[0].message.content);
    const userId = req.body.userId;

    // Save prescription
    const prescription = await Prescription.create({
      userId,
      medicines: json.reminders,
      extractedAt: new Date()
    });

    let bulk = [];

json.reminders.forEach((med) => {
  const start = med.startDate && dayjs(med.startDate).isValid()
    ? new Date(med.startDate)
    : new Date();

  const end = resolveEnd(start, med.endDate);

  const generated = buildReminderDocs({ med, start, end, userId, prescriptionId: prescription._id });

  // Filter out invalid reminder dates
  const safe = generated.filter((r) => !isNaN(r.due?.valueOf()));

  bulk = bulk.concat(safe);
});

    await Reminder.insertMany(bulk);
    console.log("Reminder payload:", JSON.stringify(bulk, null, 2));

    res.json({ inserted: bulk.length, prescriptionId: prescription._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'analysis-failed' });
  } finally {
    if (req.file) fs.unlink(req.file.path).catch(() => {});
  }
}

// mount endpoints
router.post('/analyze', upload.single('file'), handleAnalyze);
router.post('/upload', upload.single('file'), handleAnalyze);

export default router;
