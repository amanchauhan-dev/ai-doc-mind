"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input"; // <-- ShadCN Input
import { ProgressBarLink } from "@/context/progress-bar";

type DocumentItem = {
    id: number;
    title: string;
    category: string | null;
    author: string | null;
    date: string | null;
    summary: string | null;
    file: string | null;
};

export default function DocumentsTable() {
    const [items, setItems] = useState<DocumentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    // 🔎 search states
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const getPageNumber = (url: string | null) => {
        if (!url) return null;
        const params = new URLSearchParams(url.split("?")[1]);
        return params.get("page") ? parseInt(params.get("page")!) : 1;
    };

    const fetchDocs = async (url: string = "/documents/", query: string = "") => {
        setLoading(true);
        setError(null);
        try {
            const fullUrl = query
                ? `${url}${url.includes("?") ? "&" : "?"}query=${encodeURIComponent(query)}`
                : url;

            const res = await api.get(fullUrl);
            setItems(res.data.results || []);
            setNextPage(res.data.next);
            setPrevPage(res.data.previous);
            setTotalCount(res.data.count);

            if (!res.data.previous) {
                setCurrentPage(1);
            } else {
                setCurrentPage(getPageNumber(res.data.previous)! + 1);
            }
        } catch (err: any) {
            console.error("Failed to fetch documents", err);
            setError(err?.response?.data?.detail || "Failed to load documents");
        } finally {
            setLoading(false);
        }
    };

    // 🔄 debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500); // 500ms debounce
        return () => clearTimeout(handler);
    }, [search]);

    // Fetch docs when search changes
    useEffect(() => {
        fetchDocs("/documents/", debouncedSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    // Initial fetch
    useEffect(() => {
        fetchDocs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">
                    Documents {`(${totalCount})`}
                </h1>
            </div>
            <div> {/* 🔍 Search Bar */}
                <Input
                    type="text"
                    placeholder="Search documents..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-lg mx-auto my-2 w-full"
                /></div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            ) : error ? (
                <div className="text-destructive py-4">{error}</div>
            ) : items.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                    No documents found.
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-sm text-left text-muted-foreground border-b">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Title</th>
                                    <th className="p-3">Category</th>
                                    <th className="p-3">Author</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">File</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((doc) => (
                                    <tr
                                        key={doc.id}
                                        className="odd:bg-muted/20 hover:bg-muted transition-colors"
                                    >
                                        <td className="p-3 align-top text-sm">
                                            {doc.id}
                                        </td>
                                        <td className="p-3 align-top text-sm font-medium">
                                            {doc.title}
                                        </td>
                                        <td className="p-3 align-top text-sm">
                                            {doc.category ?? "-"}
                                        </td>
                                        <td className="p-3 align-top text-sm">
                                            {doc.author ?? "-"}
                                        </td>
                                        <td className="p-3 align-top text-sm">
                                            {doc.date ?? "-"}
                                        </td>
                                        <td className="p-3 align-top text-sm">
                                            {doc.file ? (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    asChild
                                                >
                                                    <ProgressBarLink
                                                        href={`/dashboard/documents/${doc.id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Open
                                                    </ProgressBarLink>
                                                </Button>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={!prevPage}
                            onClick={() =>
                                prevPage && fetchDocs(prevPage, debouncedSearch)
                            }
                            className="hover:bg-primary hover:text-white transition-colors"
                        >
                            Prev
                        </Button>

                        <span className="text-sm font-medium">
                            Page {currentPage} of{" "}
                            {Math.ceil(totalCount / items.length)}
                        </span>

                        <Button
                            size="sm"
                            variant="outline"
                            disabled={!nextPage}
                            onClick={() =>
                                nextPage && fetchDocs(nextPage, debouncedSearch)
                            }
                            className="hover:bg-primary hover:text-white transition-colors"
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
