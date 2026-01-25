
import { GoogleGenAI } from "@google/genai";

export const getDashboardInsights = async (data: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = 'gemini-3-flash-preview';
  
  const prompt = `
    Analyze the following dashboard sales data and provide 3 concise, actionable business insights.
    Data: ${JSON.stringify(data)}
    Return the response as a clear, bulleted list of insights.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insights at this time. Please check your connection.";
  }
};
