"use client";

import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import ContentGenerationForm from "@/components/ip-claim/ContentGenerationForm";
import ContentDisplay from "@/components/ip-claim/ContentDisplay";
import IpClaimDisplay from "@/components/ip-claim/IpClaimDisplay";
import { handleGenerateContent } from "@/app/actions";
import type { GenerateAIContentInput, GenerateAIContentOutput } from "@/ai/flows/generate-ai-content";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const [generatedContent, setGeneratedContent] = React.useState<string | null>(null);
  const [generatedContentType, setGeneratedContentType] = React.useState<'text' | 'image' | null>(null);
  const [ipDetails, setIpDetails] = React.useState<{
    ipHash: string | null;
    timestamp: number | null;
    certificatePreview: string | null;
  }>({ ipHash: null, timestamp: null, certificatePreview: null });

  const handleSubmit = async (data: GenerateAIContentInput) => {
    setIsLoading(true);
    setGeneratedContent(null);
    setGeneratedContentType(data.contentType); // Set content type for loading state
    setIpDetails({ ipHash: null, timestamp: null, certificatePreview: null });

    try {
      const result = await handleGenerateContent(data);
      
      if (result && 'error' in result && result.error) {
        toast({
          title: "Error Generating Content",
          description: result.error,
          variant: "destructive",
        });
        setGeneratedContentType(null); // Reset content type on error
      } else if (result) {
        const output = result as GenerateAIContentOutput; // Cast because we checked for error
        setGeneratedContent(output.content);
        setGeneratedContentType(data.contentType);
        setIpDetails({
          ipHash: output.ipHash,
          timestamp: output.timestamp,
          certificatePreview: output.certificatePreview,
        });
        toast({
          title: "Content Generated Successfully!",
          description: "Your AI content and IP claim details are ready.",
        });
      } else {
         toast({
          title: "Error Generating Content",
          description: "Received an unexpected response from the server.",
          variant: "destructive",
        });
        setGeneratedContentType(null);
      }
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setGeneratedContentType(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          <span className="block">Generate & Claim Your</span>
          <span className="block text-primary">AI-Powered Intellectual Property</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
          Transform your ideas into verifiable digital assets. Use our AI tools to create unique content and instantly claim its IP rights.
        </p>
      </section>

      <section className="max-w-2xl mx-auto p-6 sm:p-8 bg-card rounded-2xl shadow-xl">
        <ContentGenerationForm onSubmit={handleSubmit} isLoading={isLoading} />
      </section>
      
      {(generatedContent || isLoading || generatedContentType ) && (
        <>
          <Separator className="my-8 sm:my-12" />
          <section className="grid md:grid-cols-2 gap-8 items-start">
            <div className="md:col-span-1">
              <ContentDisplay 
                content={generatedContent} 
                contentType={generatedContentType} 
                isLoading={isLoading && generatedContentType !== null}
              />
            </div>
            <div className="md:col-span-1">
              {(ipDetails.ipHash || ipDetails.timestamp || ipDetails.certificatePreview) && !isLoading && (
                <IpClaimDisplay 
                  ipHash={ipDetails.ipHash} 
                  timestamp={ipDetails.timestamp} 
                  certificatePreview={ipDetails.certificatePreview} 
                />
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
