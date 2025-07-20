
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
    ? [process.env.FRONTEND_URL, 'https://sehat-sathi.vercel.app', /\.vercel\.app$/] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '2mb' }));

const port = process.env.PORT || 8080;

//HEALTH CHECK
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'SehatSathi Backend API',
    timestamp: new Date().toISOString(),
    endpoints: ['/chat', '/tts', '/api/prescription', '/api/reminders', '/api/med-info']
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

//API ROUTES
app.use('/api/prescription', prescriptionRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/med-info', medicineInfoRoutes);

//CHAT ENDPOINT
app.post('/chat', async (req, res) => {
  try {
    const { answer, lang } = await chat(req.body.text || '');
    res.json({ answer, lang });
  } catch (err) {
    console.error("Chat handler failed:", err);
    res.status(500).json({ error: 'chat-error', message: err.message });
  }
});

//TTS ENDPOINT
app.post('/tts', async (req, res) => {
  try {
    const { text, lang } = req.body;
    const mp3 = await tts(text, lang);
    res.set('Content-Type', 'audio/mpeg').send(mp3);
  } catch (err) {
    console.error("TTS failed:", err);
    res.status(500).json({ error: 'tts-error', message: err.message });
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
