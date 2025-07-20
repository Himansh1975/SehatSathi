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
 * @param {string} text - Text to convert to speech
 * @param {string} lang - Language code ('hi' or 'en')
 */
export async function tts(text = '', lang = null) {
  const langHint = lang || detectLang(text);
  
  // Use different voice for different languages
  const voice = langHint === 'hi' ? 'alloy' : 'nova';

  try {
    const speech = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice,
      input: text,
      response_format: 'mp3'
    });

    return Buffer.from(await speech.arrayBuffer());
  } catch (error) {
    console.error('TTS Error:', error);
    throw new Error(`TTS conversion failed: ${error.message}`);
  }
}
