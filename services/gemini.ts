/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export async function generateBrand(prompt: string, fileBase64?: string, mimeType?: string): Promise<any> {
  try {
    const response = await fetch('/api/generate-brand', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, fileBase64, mimeType }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to generate brand from server');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gemini Brand Gen Error:", error);
    throw error;
  }
}

export async function bringToLife(prompt: string, fileBase64?: string, mimeType?: string): Promise<string> {
  try {
    const response = await fetch('/api/generate-html', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, fileBase64, mimeType }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to generate HTML from server');
    }
    const data = await response.json();
    return data.html;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
}

export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/generate-image', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to generate image from server');
    }
    const data = await response.json();
    return data.imageUrl; // Will be a data:image/... base64 URL
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
}