import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ImageIcon } from 'lucide-react';

type ContentDisplayProps = {
  content: string | null;
  contentType: 'text' | 'image' | null;
  isLoading: boolean;
};

export default function ContentDisplay({ content, contentType, isLoading }: ContentDisplayProps) {
  if (isLoading) {
    return (
      <Card className="rounded-2xl shadow-lg animate-pulse">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            {contentType === 'image' ? <ImageIcon className="h-6 w-6 text-muted-foreground" /> : <FileText className="h-6 w-6 text-muted-foreground" />}
            Generating Content...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full bg-muted rounded-lg"></div>
        </CardContent>
      </Card>
    );
  }

  if (!content || !contentType) {
    return (
       <Card className="rounded-2xl shadow-lg border-dashed border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-muted-foreground">
            <ImageIcon className="h-6 w-6" />
            <span>Your Content Will Appear Here</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[200px]">
            <p className="text-muted-foreground">Submit a prompt to generate content.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {contentType === 'image' ? <ImageIcon className="h-6 w-6 text-primary" /> : <FileText className="h-6 w-6 text-primary" />}
          Generated {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {contentType === 'image' ? (
          <div className="relative aspect-square w-full max-w-md mx-auto bg-muted rounded-lg overflow-hidden">
            <Image
              src={content.startsWith('data:') ? content : `https://placehold.co/600x600.png`} // Basic check for data URI
              alt="Generated AI Image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
              data-ai-hint="abstract creative"
            />
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-none p-4 bg-muted/50 rounded-lg whitespace-pre-wrap break-words">
            {content}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
