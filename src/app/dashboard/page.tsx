"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Stats = {
  total_documents: number;
  unknown_documents: number;
  hr_documents: number;
  invoice_documents: number;
  legal_documents: number;
  contracts_documents: number;
  technical_reports_documents: number;
};

export default function Page() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats/");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.total_documents ?? 0}</p>
            <p className="text-muted-foreground text-sm">
              All uploaded documents in the system
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Unknown Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.unknown_documents ?? 0}</p>
            <p className="text-muted-foreground text-sm">
              Documents that could not be classified
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.invoice_documents ?? 0}</p>
            <p className="text-muted-foreground text-sm">
              Financial and billing-related documents
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 mt-4">
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>HR Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.hr_documents ?? 0}</p>
            <p className="text-muted-foreground text-sm">
              Employee and HR-related files
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Legal Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.legal_documents ?? 0}</p>
            <p className="text-muted-foreground text-sm">
              Contracts, compliance, and legal paperwork
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Technical Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {stats?.technical_reports_documents ?? 0}
            </p>
            <p className="text-muted-foreground text-sm">
              Research and technical documentation
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
