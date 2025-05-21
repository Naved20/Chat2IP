// SummarizeIPDetailsFlow.ts
'use server';
/**
 * @fileOverview Summarizes AI-generated content and IP claim details.
 *
 * - summarizeIPDetails - A function that summarizes the content and IP details.
 * - SummarizeIPDetailsInput - The input type for the summarizeIPDetails function.
 * - SummarizeIPDetailsOutput - The return type for the summarizeIPDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIPDetailsInputSchema = z.object({
  content: z.string().describe('The AI-generated content (text or image).'),
  prompt: z.string().describe('The prompt used to generate the content.'),
  ipHash: z.string().describe('The IP hash of the content.'),
  timestamp: z.string().describe('The timestamp of the IP claim.'),
  ownerName: z.string().describe('The name of the IP owner.'),
  ownerUsername: z.string().describe('The username of the IP owner.'),
});
export type SummarizeIPDetailsInput = z.infer<typeof SummarizeIPDetailsInputSchema>;

const SummarizeIPDetailsOutputSchema = z.object({
  summary: z.string().describe('A clear and organized summary of the AI-generated content and IP claim details.'),
});
export type SummarizeIPDetailsOutput = z.infer<typeof SummarizeIPDetailsOutputSchema>;

export async function summarizeIPDetails(input: SummarizeIPDetailsInput): Promise<SummarizeIPDetailsOutput> {
  return summarizeIPDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIPDetailsPrompt',
  input: {schema: SummarizeIPDetailsInputSchema},
  output: {schema: SummarizeIPDetailsOutputSchema},
  prompt: `You are an AI assistant that summarizes AI-generated content and its associated IP claim details.

  Given the following information, create a concise and well-organized summary:

  Content: {{{content}}}
  Prompt: {{{prompt}}}
  IP Hash: {{{ipHash}}}
  Timestamp: {{{timestamp}}}
  Owner Name: {{{ownerName}}}
  Owner Username: {{{ownerUsername}}}

  Summary:`,
});

const summarizeIPDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeIPDetailsFlow',
    inputSchema: SummarizeIPDetailsInputSchema,
    outputSchema: SummarizeIPDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
