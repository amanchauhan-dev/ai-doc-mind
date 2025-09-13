import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_500px_at_50%_-20%,hsl(var(--primary)/0.2),transparent_70%)]" />
      <div className="container text-center">
        <h3 className="text-3xl font-bold md:text-4xl">Turn chaos into clarity</h3>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Upload a folder of documents and get a searchable, structured knowledge base within minutes.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button size="lg" className="h-12 px-6">
            <Upload className="mr-2" /> Login
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-6" asChild>
            <a href="#how">See how it works</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
