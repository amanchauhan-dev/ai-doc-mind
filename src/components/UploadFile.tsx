"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon } from "lucide-react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }
    // Here you can handle the upload logic (API call)
    alert(`File "${file.name}" uploaded successfully!`);
    setFile(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg border border-blue-300">
        <CardHeader>
          <CardTitle className="text-blue-600 text-xl font-bold">
            Upload Your File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="file"
            onChange={handleFileChange}
            className="border-blue-400 focus:ring-blue-500"
            accept=".pdf,.doc,.docx,.txt" // restrict file types if needed
          />
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
