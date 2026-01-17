
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RoadmapResult, RoadmapSource } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateRoadmap(topic: string): Promise<RoadmapResult> {
    const prompt = `Create a highly structured 4-week learning roadmap for: "${topic}". 
    
    Target: Beginner-to-intermediate learners.
    
    REQUIRED FORMAT:
    # [Roadmap Title]
    
    ## Week [Number]: [Weekly Objective]
    
    ### Day [Number]: Goal: [One-sentence concrete daily goal]
    [Detailed explanation of what to learn and practice on this specific day. Include specific concepts or sub-topics.]
    
    (Repeat for Days 1-7 for each of the 4 weeks)
    
    ## Resources
    Provide 3-5 high-quality, specific web resources for this topic.
    
    Note: Ensure every single day has a "Goal: [Description]" line immediately following the Day header.`;

    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "No roadmap generated.";
      
      // Extract grounding sources
      const sources: RoadmapSource[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web) {
            sources.push({
              title: chunk.web.title,
              uri: chunk.web.uri
            });
          }
        });
      }

      // De-duplicate sources
      const uniqueSources = Array.from(new Set(sources.map(s => s.uri)))
        .map(uri => sources.find(s => s.uri === uri)!)
        .slice(0, 8);

      return {
        content: text,
        sources: uniqueSources,
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to generate your learning roadmap. Please try again later.");
    }
  }
}

export const geminiService = new GeminiService();
