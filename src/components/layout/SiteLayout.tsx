import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-0">
          <a href="#" className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-gradient-to-br from-primary to-blue-600" />
            <span className="text-lg font-extrabold tracking-tight">IndexIQ</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-md text-muted-foreground hover:text-foreground">Features</a>
            <a href="#how" className="text-md text-muted-foreground hover:text-foreground">How it works</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button>
              <User className="mr-2" /> Login
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 md:px-0 py-10 md:py-16">{children}</main>

    </div>
  );
}
