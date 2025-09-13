import FeatureCard from "@/components/FeatureCard";
import {
  FolderSearch,
  ShieldCheck,
  Sprout,
  FileText,
  Search,
  Gauge,
} from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Built for unstructured data at scale
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to classify, index, and retrieve documents intelligently.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<FolderSearch className="text-primary" />}
            title="Automatic Classification"
            desc="Categorize into Finance, HR, Technical Reports, Contracts, Invoices, and more with transformer models."
          />
          <FeatureCard
            icon={<FileText className="text-primary" />}
            title="Metadata & Summaries"
            desc="Extract titles, authors, key topics, entities, and concise summaries for a powerful index."
          />
          <FeatureCard
            icon={<Search className="text-primary" />}
            title="Semantic Search"
            desc="Retrieve by meaning, not just keywords, powered by embeddings and vector indexing."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-primary" />}
            title="Security First"
            desc="Use open-source models or connect private LLMs to keep sensitive data confidential."
          />
          <FeatureCard
            icon={<Gauge className="text-primary" />}
            title="Real-time Ingestion"
            desc="Stream processing for large batches with progress tracking and monitoring dashboards."
          />
          <FeatureCard
            icon={<Sprout className="text-primary" />}
            title="Developer-friendly"
            desc="Clean APIs, audit trails, and export for downstream analytics and BI tools."
          />
        </div>
      </div>
    </section>
  );
}
