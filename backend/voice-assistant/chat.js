//chat.js – bilingual (Hindi / English) Support

import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//Returns 'hi' for Hindi, 'en' otherwise.
function detectLang(str = '') {
  const hindi = (str.match(/[\u0900-\u097F]/g) || []).length;
  const english = (str.match(/[a-zA-Z]/g) || []).length;

  if (hindi === 0 && english === 0) return 'unknown';
  return hindi > english ? 'hi' : 'en';
}


//Send user text to OpenAI Chat Completion and return assistant answer in the same language (Hindi or English).
 
export async function chat(userText = '') {
  const lang = detectLang(userText);
  const systemPrompt = lang === 'hi'
    ? `आप एक सहायक स्वास्थ्य सहायक हैं। आप बुजुर्गों की मदद करते हैं। सभी उत्तर **सरल और शुद्ध हिंदी** में दीजिए। स्वास्थ्य सलाह दें लेकिन डॉक्टर से मिलने की सलाह भी दें।`
    : `You are a helpful health assistant for elderly people. Provide clear health advice but always recommend consulting with doctors for serious concerns. Keep responses simple and caring.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userText }
      ],
      max_tokens: 150,
      temperature: 0.7
    });

    return { 
      answer: completion.choices[0].message.content.trim(), 
      lang 
    };

  } catch (err) {
    console.error("OpenAI chat failed:", err);
    const errorMessage = lang === 'hi' 
      ? "मुझे अभी जवाब देने में परेशानी हो रही है। कृपया फिर से कोशिश करें।"
      : "I'm having trouble responding right now. Please try again.";
    
    return { 
      answer: errorMessage, 
      lang 
    };
  }
}
