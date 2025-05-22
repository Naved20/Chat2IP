// src/app/actions.ts
"use server";

import {
  generateAIContent,
  type GenerateAIContentInput,
  type GenerateAIContentOutput,
} from '@/ai/flows/generate-ai-content';
import { z } from 'zod';

const inputSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty."),
  contentType: z.enum(['text', 'image']),
});

export async function handleGenerateContent(
  values: GenerateAIContentInput
): Promise<GenerateAIContentOutput | { error: string }> {
  const parsed = inputSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstError =
      fieldErrors.prompt?.[0] ||
      fieldErrors.contentType?.[0] ||
      "Invalid input data.";
    return { error: `Invalid input: ${firstError}` };
  }

  try {
    const result = await generateAIContent(parsed.data);
    return result;
  } catch (err) {
    console.error("❌ Error in handleGenerateContent:", err);
    return {
      error:
        err instanceof Error
          ? err.message || "Unexpected error during content generation."
          : "Failed to generate content. Please try again.",
    };
  }
}
