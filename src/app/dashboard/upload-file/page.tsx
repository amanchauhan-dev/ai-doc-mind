'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileSpreadsheet, Plus, Upload as UploadIcon, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Helper function to get the appropriate icon based on file type
const getFileIcon = (file: File) => {
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
        return <ImageIcon className="w-10 h-10 text-blue-500 mb-2" />;
    } else if (fileType === "application/pdf") {
        return <FileText className="w-10 h-10 text-red-500 mb-2" />;
    } else if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        return <FileSpreadsheet className="w-10 h-10 text-green-500 mb-2" />;
    }
    return <FileText className="w-10 h-10 text-gray-500 mb-2" />;
};

export default function UploadBox() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file to upload!");
            return;
        }
        alert(`File "${file.name}" uploaded successfully!`);
        setFile(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const selectedFile = e.dataTransfer.files[0] || null;
        setFile(selectedFile);
    };

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            return () => URL.revokeObjectURL(url);
        }
        setPreviewUrl(null);
    }, [file]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50 p-4">
            <Card className="w-full max-w-md shadow-lg border border-blue-300">
                <CardHeader>
                    <CardTitle className="text-blue-600 text-xl font-bold">
                        Upload Your File
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    <label
                        htmlFor="file-upload"
                        className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer transition ${
                            isDragging ? "border-blue-600 bg-blue-100" : "border-blue-400 bg-white"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {file && file.type.startsWith("image/") ? (
                            <Image src={previewUrl as string} alt="File Preview" className="h-full w-full object-contain p-2" width={100} height={100}/>
                        ) : (
                            <>
                                {file ? getFileIcon(file) : <Plus className="w-10 h-10 text-blue-500 mb-2" />}
                                <span className="text-blue-600 font-medium">
                                    {isDragging ? "Drop your file here" : file ? file.name : "Click or drag file to upload"}
                                </span>
                            </>
                        )}
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    {file && (
                        <p className="text-blue-700 font-medium">
                            Selected file: {file.name}
                        </p>
                    )}
                    <Button
                        onClick={handleUpload}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                    >
                        <UploadIcon className="w-5 h-5" /> Upload
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}