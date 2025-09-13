"use client";

import { Button } from "@/components/ui/button";
import { User, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-20%,hsl(var(--primary)/0.25),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent" />
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            AI-Powered Document Classification & Intelligent Indexing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Automatically categorize documents, extract metadata and summaries, and enable lightning-fast semantic search — with enterprise-grade security and optional private LLMs.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-6">
              <User className="mr-2" /> Login
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6" asChild>
              <a href="#features">
                <Sparkles className="mr-2" /> Explore features
              </a>
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Your data stays private. Keep models on-prem or connect secure LLMs.
          </p>
        </div>
      </div>
    </section>
  );
}
