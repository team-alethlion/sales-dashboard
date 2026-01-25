
import { GoogleGenAI } from "@google/genai";

/**
 * Fetches dashboard insights from the Gemini model based on provided sales data.
 */
export const getDashboardInsights = async (data: any) => {
  // Initialize the Gemini client with the API key from environment variables.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze the following dashboard sales data and provide 3 concise, actionable business insights.
    Data: ${JSON.stringify(data)}
    Return the response as a clear, bulleted list of insights.
  `;

  try {
    // Call generateContent with the model name and prompt.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Directly access the .text property from the response.
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate insights at this time. Please check your connection.";
  }
};
