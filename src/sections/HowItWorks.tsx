import Step from "@/components/Step";

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative bg-gradient-to-b from-blue-50 to-transparent py-20 md:py-32 px-4 md:px-0 dark:from-blue-900/20"
    >
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">How it works</h2>
          <p className="mt-3 text-muted-foreground">
            From upload to insight in three simple steps.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Step
            number={1}
            title="Ingest & Normalize"
            desc="Upload PDFs, DOCX, emails, and scans. We normalize formats and extract text safely."
          />
          <Step
            number={2}
            title="Classify & Enrich"
            desc="Transformers classify and extract entities, topics, and summaries to enrich the index."
          />
          <Step
            number={3}
            title="Semantic Retrieve"
            desc="Embedding-powered search delivers relevant results with filters, facets, and ranking."
          />
        </div>
      </div>
    </section>
  );
}
