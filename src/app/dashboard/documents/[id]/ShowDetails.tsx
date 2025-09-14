"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/axios";

interface DocumentType {
    id: number;
    title: string;
    category: string;
    author: string | null;
    date: string | null;
    summary: string;
    file: string;
}

interface ChatMessage {
    role: "user" | "bot";
    text: string;
}

interface Props {
    id: string;
}

export default function DocumentPage({ id }: Props) {
    const [document, setDocument] = useState<DocumentType | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [pdfError, setPdfError] = useState<string | null>(null);

    const [sessionId, setSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");

    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Get document details
                const response = await api.get(`/documents/${id}/`);
                setDocument(response.data);

                // Handle PDF URL with better error handling
                const fileUrl = response.data.file;
                if (fileUrl) {
                    let finalUrl = fileUrl;

                    // If it's not already a full URL, construct it
                    if (!fileUrl.startsWith('http')) {
                        const baseUrl = api.defaults.baseURL || window.location.origin;
                        finalUrl = `${baseUrl}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
                    }

                    console.log('PDF URL:', finalUrl); // Debug log
                    setPdfUrl(finalUrl);
                } else {
                    setPdfError("No PDF file found");
                }

                // Create chat session
                const sessionRes = await api.post("/chatbot/create-session/", {
                    document_id: response.data.id,
                });

                setSessionId(sessionRes.data.session_id);
                setMessages(sessionRes.data.history || []);
            } catch (error: any) {
                console.error("Failed to fetch document/session:", error);
                setPdfError(`Failed to load document: ${error?.message || 'Unknown error'}`);
            }
        }
        fetchData();
    }, [id]);

    // Auto-scroll chat
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !sessionId) return;

        const question = input.trim();
        setInput("");

        // Add user message immediately for better UX
        setMessages(prev => [...prev, { role: "user", text: question }]);

        try {
            const res = await api.post("/chatbot/ask-question/", {
                session_id: sessionId,
                question,
            });

            // Backend returns full updated history
            setMessages(res.data.history);
        } catch (error) {
            console.error("Failed to ask question:", error);
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: "Error: could not get answer." },
            ]);
        }
    };

    // Alternative PDF viewer component
    const PDFViewer = ({ url }: { url: string }) => {
        const [embedError, setEmbedError] = useState(false);

        return (
            <div className="w-full h-full">
                {!embedError ? (
                    <embed
                        src={url}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        className="rounded-b-2xl"
                        onError={() => setEmbedError(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                        <p className="text-muted-foreground">PDF preview not available</p>
                        <Button
                            onClick={() => window.open(url, '_blank')}
                            variant="outline"
                        >
                            Open PDF in new tab
                        </Button>
                        <a
                            href={url}
                            download
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Download PDF
                        </a>
                    </div>
                )}
            </div>
        );
    };


    const renderDownloadButton = () => {
        if (!pdfUrl) return null;

        return (
            <a
                href={pdfUrl}
                download={document?.title || "document.pdf"} // optional: custom filename
                className="inline-block m-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition"
            >
                View
            </a>
        );
    };
    // ======================
    // RENDER FUNCTIONS
    // ======================
    const renderDocumentViewer = () => {
        if (!document) return <div className="flex items-center justify-center h-full">Loading document...</div>;

        return (
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <CardTitle>{document.title}</CardTitle>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p><span className="font-medium">Category:</span> {document.category}</p>
                        <p><span className="font-medium">Author:</span> {document.author ?? "Unknown"}</p>
                        <p><span className="font-medium">Date:</span> {document.date ?? "N/A"}</p>
                    </div>
                    {document.summary && (
                        <div className="mt-2">
                            <p className="text-sm font-medium mb-1">Summary:</p>
                            <p className="text-xs text-muted-foreground line-clamp-3">
                                {document.summary}
                            </p>
                        </div>
                    )}
                </CardHeader>
                <Separator />
                <CardContent className="flex-1 p-0">
                    {/* {pdfError ? (
                        <div className="flex items-center justify-center h-full text-red-500">
                            {pdfError}
                        </div>
                    ) : pdfUrl ? (
                        <PDFViewer url={pdfUrl} />
                    ) : (
                        <div className="flex items-center justify-center h-full">Loading PDF...</div>
                    )} */}
                    {renderDownloadButton()}
                </CardContent>
            </Card>
        );
    };

    const renderChatWindow = () => (
        <div className="grid grid-rows-[50px_500px_50px] h-full overflow-hidden border-2 p-4">
            <div className="">
                <CardTitle>Chat about this document</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Ask questions about the document content
                </p>
            </div>
            <div ref={chatRef} className="p-4 space-y-3 overflow-y-auto">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Start a conversation about this document</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`p-3 rounded-lg max-w-[80%] ${msg.role === "user"
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-muted"
                                }`}
                        >
                            <div className="text-sm font-medium mb-1">
                                {msg.role === "user" ? "You" : "AI"}
                            </div>
                            <div className="whitespace-pre-wrap">{msg.text}</div>
                        </div>
                    ))
                )}
            </div>
            <div className="flex items-center gap-2 p-4 border-t">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about this document..."
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={!sessionId}
                />
                <Button onClick={handleSend} disabled={!input.trim() || !sessionId}>
                    Send
                </Button>
            </div>
        </div>
    );

    return (
        <div className="h-full p-4">
            {/* Desktop */}
            <div className="hidden md:grid grid-cols-2 gap-4 h-full">
                {renderDocumentViewer()}
                {renderChatWindow()}
            </div>

            {/* Mobile */}
            <div className="md:hidden h-full flex flex-col">
                <Tabs defaultValue="document" className="flex-1 flex flex-col">
                    <TabsList className="grid grid-cols-2 mb-2">
                        <TabsTrigger value="document">Document</TabsTrigger>
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                    </TabsList>
                    <TabsContent value="document" className="flex-1">
                        {renderDocumentViewer()}
                    </TabsContent>
                    <TabsContent value="chat" className="flex-1">
                        {renderChatWindow()}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

