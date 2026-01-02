import { GoogleGenAI } from "@google/genai";

// Fix: Strictly follow initialization requirements using process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFitnessAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "You are 'Surefit AI', a friendly and professional fitness assistant for Surefit Gym in Oregun, Ikeja. You help users with workout tips, nutrition advice, and gym information. Keep responses bold, inspiring, and concise. Always mention that they can visit the gym at 2 Adewunmi Estate, Kudirat Abiola Way, Oregun, Ikeja for personalized training.",
      },
    });
    
    // Fix: Access .text property directly as it is not a method.
    return response.text || "I'm sorry, I couldn't process that. How about visiting us at Surefit Gym for a personal consultation?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The gym is busy! Please try again in a moment or visit us in person.";
  }
};
