"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="group relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-600/0 via-blue-600/0 to-blue-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <CardHeader>
        <div className="mb-2 inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}
