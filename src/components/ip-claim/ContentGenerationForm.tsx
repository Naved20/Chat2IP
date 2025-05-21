"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Sparkles, FileText, Image as ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GenerateAIContentInput, GenerateAIContentOutput } from "@/ai/flows/generate-ai-content";

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }).max(1000, {
    message: "Prompt must not exceed 1000 characters.",
  }),
  contentType: z.enum(["text", "image"], {
    required_error: "Please select a content type.",
  }),
});

type ContentGenerationFormProps = {
  onSubmit: (data: GenerateAIContentInput) => Promise<GenerateAIContentOutput | { error: string } | void>;
  isLoading: boolean;
};

export default function ContentGenerationForm({ onSubmit, isLoading }: ContentGenerationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      contentType: "text",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    await onSubmit(values as GenerateAIContentInput);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Your Creative Prompt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., A futuristic cityscape at sunset, or a short poem about resilience..."
                  className="min-h-[120px] resize-none rounded-xl shadow-sm focus:ring-2 focus:ring-primary"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Describe the content you want the AI to generate. Be specific for best results.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Content Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger className="rounded-xl shadow-sm focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select a content type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-xl">
                  <SelectItem value="text">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Text</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="image">
                     <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      <span>Image</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose whether you want to generate text or an image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full sm:w-auto rounded-xl text-base py-3 px-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-5 w-5" />
          )}
          {isLoading ? "Generating..." : "Generate Content"}
        </Button>
      </form>
    </Form>
  );
}
