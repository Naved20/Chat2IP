import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Hash, Clock, Award } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

type IpClaimDisplayProps = {
  ipHash: string | null;
  timestamp: number | null;
  certificatePreview: string | null;
};

export default function IpClaimDisplay({ ipHash, timestamp, certificatePreview }: IpClaimDisplayProps) {
  if (!ipHash && !timestamp && !certificatePreview) {
    return null; // Don't render if there's no IP data
  }

  const claimedDate = timestamp ? new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }) : 'N/A';

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Intellectual Property Claim Details
        </CardTitle>
        {timestamp && (
            <Badge variant="secondary" className="mt-2 w-fit">Claimed on: {claimedDate}</Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {ipHash && (
          <div>
            <h3 className="flex items-center gap-2 text-md font-semibold text-foreground mb-1">
              <Hash className="h-5 w-5 text-muted-foreground" />
              IP Hash (SHA256)
            </h3>
            <p className="text-sm text-muted-foreground break-all bg-muted/50 p-2 rounded-md">{ipHash}</p>
          </div>
        )}
        
        {certificatePreview && (
          <div>
            <h3 className="flex items-center gap-2 text-md font-semibold text-foreground mb-1">
              <Award className="h-5 w-5 text-muted-foreground" />
              Certificate Preview
            </h3>
            <div className="text-sm text-muted-foreground p-3 border border-dashed rounded-md bg-muted/50 min-h-[80px]">
              {/* This will render the certificatePreview string. If it's a data URI for an image, this won't render it as an image.
                  A more sophisticated check would be needed if it could be an image data URI.
                  For now, assuming it's textual or a simple string representation. */}
              <p className="whitespace-pre-wrap break-words">{certificatePreview}</p>
            </div>
          </div>
        )}
         {!ipHash && !certificatePreview && (
            <p className="text-muted-foreground">IP details will appear here once content is generated and claimed.</p>
        )}
      </CardContent>
    </Card>
  );
}
