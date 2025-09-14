"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type User = {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
};

type AccessLog = {
    id: number;
    action: string;
    timestamp: string;
    user: User;
    document: number; // or you can fetch document title if nested
};

export default function AccessLogsTable() {
    const [logs, setLogs] = useState<AccessLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const getPageNumber = (url: string | null) => {
        if (!url) return null;
        const params = new URLSearchParams(url.split("?")[1]);
        return params.get("page") ? parseInt(params.get("page")!) : 1;
    };

    const fetchLogs = async (url: string = "/accesslogs/") => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get(url);
            setLogs(res.data.results || []);
            setNextPage(res.data.next);
            setPrevPage(res.data.previous);
            setTotalCount(res.data.count);

            if (!res.data.previous) {
                setCurrentPage(1);
            } else {
                setCurrentPage(getPageNumber(res.data.previous)! + 1);
            }
        } catch (err: any) {
            console.error("Failed to fetch access logs", err);
            setError(err?.response?.data?.detail || "Failed to load logs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold mb-4">Access Logs ({totalCount})</h1>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            ) : error ? (
                <div className="text-destructive py-4">{error}</div>
            ) : logs.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                    No logs found.
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-sm text-left text-muted-foreground border-b">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Action</th>
                                    <th className="p-3">Timestamp</th>
                                    <th className="p-3">User</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Document</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log) => (
                                    <tr
                                        key={log.id}
                                        className="odd:bg-muted/20 hover:bg-muted transition-colors"
                                    >
                                        <td className="p-3 align-top text-sm">{log.id}</td>
                                        <td className="p-3 align-top text-sm font-medium">{log.action}</td>
                                        <td className="p-3 align-top text-sm">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="p-3 align-top text-sm">
                                            {log.user.first_name} {log.user.last_name}
                                        </td>
                                        <td className="p-3 align-top text-sm">{log.user.email}</td>
                                        <td className="p-3 align-top text-sm">{log.user.role}</td>
                                        <td className="p-3 align-top text-sm">{log.document}</td>
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
                            onClick={() => prevPage && fetchLogs(prevPage)}
                            className="hover:bg-primary hover:text-white transition-colors"
                        >
                            Prev
                        </Button>

                        <span className="text-sm font-medium">
                            Page {currentPage} of {Math.ceil(totalCount / logs.length)}
                        </span>

                        <Button
                            size="sm"
                            variant="outline"
                            disabled={!nextPage}
                            onClick={() => nextPage && fetchLogs(nextPage)}
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
