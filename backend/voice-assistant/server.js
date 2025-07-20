
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import express from 'express';
// import { createServer } from 'http';
// import { WebSocketServer } from 'ws';
// dotenv.config();


// import express from 'express';
// import { createServer } from 'http';
// import { WebSocketServer } from 'ws';
// // import prescriptionRoutes from './routes/prescription.js';

// // import prescriptionRoutes from './routes/prescription.js';
// import medicineInfoRoutes from './routes/medicineInfo.js';

// import { initSTT } from './stt.js';
// import { chat }    from './chat.js';
// import { tts }     from './tts.js';

// //NEW: load our prescription/reminder feature
// import prescriptionRoutes from './routes/prescription.js';
// import reminderRoutes     from './routes/reminder.js';
// import startReminderCron  from './scheduler/reminderCron.js';

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser:    true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => {
//     console.error(' MongoDB connection error', err);
//     process.exit(1);
//   });

// const app  = express();
// const port = process.env.PORT || 8080;

// app.use(express.json({ limit: '2mb' }));

// app.use('/api/prescription', prescriptionRoutes);
// app.use('/api/reminders',    reminderRoutes);

// app.use('/api/med-info', medicineInfoRoutes);

// app.post('/chat', async (req, res) => {
//   const answer = await chat(req.body.text || '');
//   res.json({ answer });
// });

// app.post('/tts', async (req, res) => {
//   const mp3 = await tts(req.body.text);
//   res.set('Content-Type', 'audio/mpeg').send(mp3);
// });

// const httpServer = createServer(app);
// const wss = new WebSocketServer({ server: httpServer, path: '/ws/stt' });

// initSTT(wss);

// httpServer.listen(port, () => {
//   console.log(`Voice backend running at http://localhost:${port}`);
//   // start the background job that flips due reminders to “sent”
//   startReminderCron();
// });

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; 
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

dotenv.config();

//IMPORT ROUTES & MODULES
import medicineInfoRoutes from './routes/medicineInfo.js';
import { initSTT } from './stt.js';
import { chat } from './chat.js';
import { tts } from './tts.js';
import prescriptionRoutes from './routes/prescription.js';
import reminderRoutes from './routes/reminder.js';
import startReminderCron from './scheduler/reminderCron.js';

//CONNECT MONGODB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

//EXPRESS SERVER SETUP
const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://sehat-sathi.vercel.app'] 
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '2mb' }));

const port = process.env.PORT || 8080;

app.use(cors()); 
app.use(express.json({ limit: '2mb' }));

//API ROUTES
app.use('/api/prescription', prescriptionRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/med-info', medicineInfoRoutes);

// app.post('/chat', async (req, res) => {
//   const answer = await chat(req.body.text || '');
//   res.json({ answer, lang });
// });
app.post('/chat', async (req, res) => {
  try {
    const { answer, lang } = await chat(req.body.text || '');
    res.json({ answer, lang }); // includes language
  } catch (err) {
    console.error("Chat handler failed:", err);
    res.status(500).json({ error: 'chat-error' });
  }
});

// app.post('/tts', async (req, res) => {
//   const mp3 = await tts(req.body.text);
//   res.set('Content-Type', 'audio/mpeg').send(mp3);
// });
app.post('/tts', async (req, res) => {
  try {
    const { text, lang } = req.body;
    const mp3 = await tts(text, lang); // override
    res.set('Content-Type', 'audio/mpeg').send(mp3);
  } catch (err) {
    console.error("TTS failed:", err);
    res.status(500).send("TTS error");
  }
});

//WEBSOCKET SERVER 
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer, path: '/ws/stt' });

initSTT(wss);

//START SERVER
httpServer.listen(port, () => {
  console.log(`Voice backend running at http://localhost:${port}`);
  startReminderCron(); 
});
