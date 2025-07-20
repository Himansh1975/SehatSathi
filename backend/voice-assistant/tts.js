// tts.js – bilingual Text-to-Speech helper
import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/** Detects Hindi by spotting Devanagari characters. */
function detectLang(str = '') {
  return /[\u0900-\u097F]/.test(str) ? 'hi' : 'en';
}

/**
 * Generate speech (MP3 buffer) from text.
 * OpenAI TTS supports multiple languages automatically; we still send a
 * language hint for clarity.
 */
export async function tts(text = '') {
  const langHint = detectLang(text);

  const speech = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy',           // multi-lingual voice works for hi & en
    input: text,
    response_format: 'mp3',  
    language: langHint        // ignored by older SDKs harmless
  });

  return Buffer.from(await speech.arrayBuffer());
}
