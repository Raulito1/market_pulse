import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getMarketInsights(data: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          text: `You are a professional market analyst. Analyze the following real-time market data and provide 3 concise, high-impact insights. Format your response as a JSON array of objects with 'title' and 'description' fields.
          
          Data: ${JSON.stringify(data)}`
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error fetching insights:", error);
    return [
      { title: "Analysis Offline", description: "AI insights are currently unavailable. Please check your connection." }
    ];
  }
}
