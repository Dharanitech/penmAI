import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;
const isProduction =
  process.env.NODE_ENV === 'production' ||
  fs.existsSync(path.resolve(process.cwd(), 'dist/index.html'));

// Initialize Gemini if API key is present
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Health check endpoint for Cloud Run and monitoring
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    environment: isProduction ? 'production' : 'development',
    geminiConfigured: Boolean(ai),
    timestamp: new Date().toISOString(),
  });
});

// Server-side Gemini chat endpoint with automatic fallback
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language = 'ta', currentQuestionKey = 'initial' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (ai) {
      try {
        const prompt = `You are penmAI (பெண்மை + AI) — "Her Voice. Her Language. Her Access."
The user is a first-time woman user in India who may have low digital literacy.
She speaks in ${language === 'ta' ? 'Tamil' : language === 'hi' ? 'Hindi' : 'English'}.
User message: "${message}"
Current stage: "${currentQuestionKey}"

Guidelines:
1. Speak warmly, respectfully, and simply in ${language === 'ta' ? 'conversational Tamil' : language === 'hi' ? 'conversational Hindi' : 'simple English'}.
2. Never overwhelm her. Ask only ONE question at a time.
3. If she expresses uncertainty ("I don't know" / "தெரியாது" / "नहीं पता"), reassure her warmly and explain where to find the info (e.g. Aadhaar card, Ration card, local e-Sevai / VAO office).
4. Return a concise, friendly response.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const replyText = response.text || '';
        return res.json({ replyText, mode: 'gemini' });
      } catch (geminiErr: any) {
        console.warn('Gemini API call failed, using fallback:', geminiErr?.message);
      }
    }

    // Fallback response if Gemini is not configured or fails
    const fallbackReplies: Record<string, string> = {
      ta: 'நிச்சயமாக. உங்களுக்கு பொருத்தமான அரசு மற்றும் திறன் பயிற்சி சேவையை அறிய உதவுகிறேன். உங்கள் வயது அல்லது தேவையைத் தெரிவிக்கவும்.',
      en: 'Certainly. I will help you identify the right government welfare and skill development resources. Please share what you need.',
      hi: 'बिल्कुल। मैं आपके लिए सही सरकारी योजना और कौशल प्रशिक्षण खोजने में मदद करूंगी। कृपया बताएं कि आपको क्या सहायता चाहिए।',
    };

    return res.json({
      replyText: fallbackReplies[language] || fallbackReplies.ta,
      mode: 'fallback',
    });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Explain government bureaucratic terms in simple words
app.post('/api/explain', async (req, res) => {
  try {
    const { term, language = 'ta' } = req.body;
    if (!term) {
      return res.status(400).json({ error: 'Term is required' });
    }

    if (ai) {
      try {
        const prompt = `Explain the bureaucratic or digital government term "${term}" to a first-time woman user in ${language === 'ta' ? 'simple Tamil' : language === 'hi' ? 'simple Hindi' : 'plain English'}.
Keep it under 3 sentences. No technical jargon. Give an everyday analogy if helpful.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        return res.json({ explanation: response.text || '', mode: 'gemini' });
      } catch (geminiErr: any) {
        console.warn('Gemini explain call failed:', geminiErr?.message);
      }
    }

    return res.json({
      explanation: `"${term}" என்பது விண்ணப்பத்தில் கேட்கப்படும் விவரமாகும். உங்கள் ஆதார் அல்லது ரேஷன் கார்டில் இதைக் காணலாம்.`,
      mode: 'fallback',
    });
  } catch (err: any) {
    console.error('Error in /api/explain:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve frontend: Vite middlewares in dev, static dist in production
async function startServer() {
  if (isProduction) {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));

    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`penmAI server listening on port ${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
