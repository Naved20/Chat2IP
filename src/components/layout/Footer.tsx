export default function Footer() {
  return (
    <footer className="py-8 border-t border-border/40 bg-background/95">
      <div className="container flex flex-col items-center justify-center gap-1 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} IPClaim. All rights reserved.</p>
        <p>
          Powered by{' '}
          <a
            href="#" // Replace with actual Story IP Protocol link if available
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Story IP Protocol
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
