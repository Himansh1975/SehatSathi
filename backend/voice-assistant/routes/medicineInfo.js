import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import fs from 'fs/promises';
import multer from 'multer';
import OpenAI from 'openai';

import MedicineInfo from '../models/MedicineInfo.js';

const router  = express.Router();
const upload  = multer({ dest: 'uploads/' });
const openai  = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/*POST /api/med-info/analyze – upload wrapper image, get AI extraction */
router.post('/analyze', upload.single('file'), async (req, res) => {
  try {
    /* 1. read the uploaded file */
    const { path, mimetype } = req.file;
    const b64     = (await fs.readFile(path)).toString('base64');
    const dataURL = `data:${mimetype};base64,${b64}`;

    /* 2. ask GPT-4o Vision */
    const resp = await openai.chat.completions.create({
      model:       'gpt-4o-mini',
      temperature: 0,
      max_tokens:  300,
      messages: [
        {
          role: 'system',
          content:
            'You are a pharmacist information extractor.\n' +
            'Return ONLY valid JSON, no markdown.\n' +
            'type Medicine = {\n' +
            '  name: string;\n' +
            '  purpose: string;\n' +
            '  dosage: string;\n' +
            '  foodWarnings: string[];\n' +
            '  mechanism: string;\n' +
            '}\n' +
            '{ medicine: Medicine | Medicine[] }'
        },
        {
          role: 'user',
          content: [
            { type: 'text',      text: 'Extract medicine facts from this image.' },
            { type: 'image_url', image_url: { url: dataURL } }
          ]
        }
      ]
    });

    /* 3. parse the model’s JSON */
    const rawJson = JSON.parse(resp.choices[0].message.content);
    const userId  = req.body.userId;

    /* 4. persist as-is */
    const doc = await MedicineInfo.create({
      userId,
      aiResponse: rawJson,
      extractedAt: new Date(),
    });

    /* 5. respond with the document id */
    res.json({ medicineId: doc._id, saved: true });
  } catch (err) {
    console.error('/analyze error:', err);
    res.status(500).json({ error: 'analysis-failed', message: err.message });
  } finally {
    /* clean up the temp upload */
    if (req.file) fs.unlink(req.file.path).catch(() => {});
  }
});

/*  GET /api/med-info/recent – return latest scanned medicines */
router.get('/recent', async (req, res) => {
  try {
    const meds = await MedicineInfo.find()
      .sort({ extractedAt: -1 })
      .limit(5)
      .select("_id extractedAt");

    res.json({ meds });
  } catch (err) {
    console.error("Failed to fetch recent scans:", err);
    res.status(500).json({ error: "fetch-recent-failed", message: err.message });
  }
});

/*  GET /api/med-info/:id – return EXACT JSON the AI produced */
router.get('/:id', async (req, res) => {
  try {
    const doc = await MedicineInfo.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ error: 'not-found' });

    // send only what the user want – AI output
    res.json(doc.aiResponse);
  } catch (err) {
    console.error('/:id fetch error:', err);
    res.status(500).json({ error: 'fetch-failed', message: err.message });
  }
});


export default router;
