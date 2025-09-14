import React from "react";
import DocumentPage from "./ShowDetails";

interface PageProps {
    params: { id: string }; // dynamic route param
}

export default async function Page({ params }: PageProps) {
    const { id } = await params
    return <DocumentPage id={id} />;
}
