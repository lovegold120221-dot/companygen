import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

const SYSTEM_INSTRUCTION = `You are an expert AI Engineer and Product Designer specializing in "bringing artifacts to life".
Your goal is to take a user uploaded file—which might be a polished UI design, a messy napkin sketch, a photo of a whiteboard with jumbled notes, or a picture of a real-world object (like a messy desk)—and instantly generate a fully functional, interactive, single-page HTML/JS/CSS application.

CORE DIRECTIVES:
1. **Analyze & Abstract**: Look at the image.
    - **Sketches/Wireframes**: Detect buttons, inputs, and layout. Turn them into a modern, clean UI.
    - **Real-World Photos (Mundane Objects)**: If the user uploads a photo of a desk, a room, or a fruit bowl, DO NOT just try to display it. **Gamify it** or build a **Utility** around it.
      - *Cluttered Desk* -> Create a "Clean Up" game where clicking items (represented by emojis or SVG shapes) clears them, or a Trello-style board.
      - *Fruit Bowl* -> A nutrition tracker or a still-life painting app.
    - **Documents/Forms**: specific interactive wizards or dashboards.

2. **NO EXTERNAL IMAGES**:
    - **CRITICAL**: Do NOT use <img src="..."> with external URLs (like imgur, placeholder.com, or generic internet URLs). They will fail.
    - **INSTEAD**: Use **CSS shapes**, **inline SVGs**, **Emojis**, or **CSS gradients** to visually represent the elements you see in the input.
    - If you see a "coffee cup" in the input, render a ☕ emoji or draw a cup with CSS. Do not try to load a jpg of a coffee cup.

3. **Make it Interactive**: The output MUST NOT be static. It needs buttons, sliders, drag-and-drop, or dynamic visualizations.
4. **Self-Contained**: The output must be a single HTML file with embedded CSS (<style>) and JavaScript (<script>). No external dependencies unless absolutely necessary (Tailwind via CDN is allowed).
5. **Robust & Creative**: If the input is messy or ambiguous, generate a "best guess" creative interpretation. Never return an error. Build *something* fun and functional.

RESPONSE FORMAT:
Return ONLY the raw HTML code. Do not wrap it in markdown code blocks (\`\`\`html ... \`\`\`). Start immediately with <!DOCTYPE html>.`;

app.post('/api/generate-html', async (req, res) => {
  try {
    const { prompt, fileBase64, mimeType } = req.body;
    const parts: any[] = [];
    
    const finalPrompt = fileBase64 
      ? "Analyze this image/document. Detect what functionality is implied. If it is a real-world object (like a desk), gamify it (e.g., a cleanup game). Build a fully interactive web app. IMPORTANT: Do NOT use external image URLs. Recreate the visuals using CSS, SVGs, or Emojis." 
      : prompt || "Create a demo app that shows off your capabilities.";

    parts.push({ text: finalPrompt });

    if (fileBase64 && mimeType) {
      parts.push({
        inlineData: {
          data: fileBase64,
          mimeType: mimeType,
        },
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
      },
    });

    let text = response.text || "<!-- Failed to generate content -->";
    text = text.replace(/^```html\s*/, '').replace(/^```\s*/, '').replace(/```$/, '');
    
    res.json({ html: text });
  } catch (error) {
    console.error("Gemini HTML Gen Error:", error);
    res.status(500).json({ error: 'Failed to generate HTML' });
  }
});

app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    let imageUrl = '';
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        imageUrl = `data:image/jpeg;base64,${base64EncodeString}`;
        break;
      }
    }

    if (!imageUrl) {
      throw new Error("No image data found in response");
    }

    res.json({ imageUrl });
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.post('/api/generate-brand', async (req, res) => {
  try {
    const { prompt, fileBase64, mimeType } = req.body;
    
    const SYSTEM_INSTRUCTION = `You are an expert Brand Identity Designer.
The user will give you a company description, name, or abstract idea, or an image of an object to base the brand on.
Generate a complete corporate identity in JSON format.
The JSON must strictly follow this structure:
{
  "company_name": "Short Name",
  "company_legal_name": "Full legal name e.g. LLC",
  "primary_color": "#HEX based on brand vibe (e.g., #D4A017)",
  "primary_color_light": "#HEX slightly lighter (e.g., #F0BE45)",
  "secondary_color": "#HEX (e.g., #1A1A1A)",
  "background_color": "#000000",
  "text_color": "#FFFFFF",
  "company_address": "Realistic mock address",
  "company_email": "hello@domain.com",
  "company_website": "www.domain.com",
  "founder_name": "Mock Founder Name",
  "slogan_1": "Catchy slogan 1",
  "slogan_2": "Catchy slogan 2",
  "slogan_3": "Catchy slogan 3",
  "logo_svg": "A minimalist inline SVG tag for their logo. MUST NOT include markdown. Starts with <svg>. Use currentColor or the primary color. Make it beautifully designed. Should scale well to 100x100.",
  "logo_icon": "A single representative emoji or Unicode character",
  "social_banners": ["Banner 1 text", "Banner 2 text", "Banner 3 text"],
  "social_posts": [
    {"text": "Post 1 short text", "sub": "Call to action"},
    {"text": "Post 2", "sub": "site link"},
    {"text": "Post 3", "sub": "promo"}
  ]
}
Return ONLY valid JSON.`;

    const parts: any[] = [{ text: prompt || "Generate a brand based on this input." }];
    if (fileBase64 && mimeType) {
      parts.push({
        inlineData: {
          data: fileBase64,
          mimeType: mimeType,
        },
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: [{ role: 'user', parts }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    let jsonText = response.text || "{}";
    res.json(JSON.parse(jsonText));
  } catch (error) {
    console.error("Gemini Brand Gen Error:", error);
    res.status(500).json({ error: 'Failed to generate brand' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
