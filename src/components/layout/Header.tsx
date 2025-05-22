import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="IPClaim Homepage">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            CHAT2IP
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          {/* Future navigation items can go here, e.g., login button */}
          {/* <Button variant="ghost">Login</Button> */}
        </nav>
      </div>
    </header>
  );
}
