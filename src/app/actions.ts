// src/app/actions.ts
"use server";

import { generateAIContent, type GenerateAIContentInput, type GenerateAIContentOutput } from '@/ai/flows/generate-ai-content';
import { z } from 'zod';

const inputSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty."),
  contentType: z.enum(['text', 'image']),
});

export async function handleGenerateContent(values: GenerateAIContentInput): Promise<GenerateAIContentOutput | { error: string }> {
  const validatedFields = inputSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid input: " + validatedFields.error.flatten().fieldErrors_Message_fn[''],
    };
  }
  
  try {
    // Add any user authentication or validation logic here if needed in the future
    // For example, check if the user is logged in, rate limiting, etc.

    const result = await generateAIContent(validatedFields.data);
    return result;
  } catch (error) {
    console.error("Error generating AI content:", error);
    // Return a structured error that the client can understand
    if (error instanceof Error) {
      return { error: error.message || "Failed to generate content due to an unexpected error." };
    }
    return { error: "Failed to generate content. Please try again." };
  }
}
