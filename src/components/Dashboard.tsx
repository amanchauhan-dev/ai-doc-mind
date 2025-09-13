"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { FileText, FileSpreadsheet, Upload as UploadIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

type FileItem = {
  id: string;
  name: string;
  category: string;
  size: string;
  date: string;
};

const uploadedFiles: FileItem[] = [
  { id: "#0001", name: "Financial_Report_Q3.pdf", category: "Finance", size: "2.4 MB", date: "2024-01-15 14:30" },
  { id: "#0002", name: "Employee_Handbook.docx", category: "HR", size: "1.8 MB", date: "2024-01-14 09:15" },
  { id: "#0003", name: "Budget_Analysis.xlsx", category: "Finance", size: "856 KB", date: "2024-01-13 16:45" },
  { id: "#0004", name: "Technical_Specifications.pdf", category: "Technical", size: "3.2 MB", date: "2024-01-12 11:20" },
  { id: "#0005", name: "Contract_Template.docx", category: "Legal", size: "924 KB", date: "2024-01-11 13:55" },
];

const downloadedFiles: FileItem[] = [
  { id: "#D001", name: "Project_Summary.pdf", category: "Finance", size: "1.2 MB", date: "2024-02-10 10:15" },
  { id: "#D002", name: "Company_Policy.docx", category: "HR", size: "2.1 MB", date: "2024-02-09 12:00" },
];

// Helper to return icon based on file extension
const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <FileText className="inline w-4 h-4 mr-2 text-red-500" />;
    case "doc":
    case "docx":
      return <FileText className="inline w-4 h-4 mr-2 text-blue-500" />;
    case "xls":
    case "xlsx":
      return <FileSpreadsheet className="inline w-4 h-4 mr-2 text-green-500" />;
    default:
      return <FileText className="inline w-4 h-4 mr-2 text-gray-500" />;
  }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"uploaded" | "downloaded">("uploaded");

  const files = activeTab === "uploaded" ? uploadedFiles : downloadedFiles;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-blue-50 dark:bg-blue-900/10">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <Card className="shadow-lg border border-blue-200 dark:border-blue-700">
          <CardHeader>
            {/* Tabs & Upload Button */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("uploaded")}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === "uploaded"
                      ? "bg-blue-600 text-white shadow"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  Uploaded
                </button>
                <button
                  onClick={() => setActiveTab("downloaded")}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === "downloaded"
                      ? "bg-blue-600 text-white shadow"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  Downloaded
                </button>
              </div>

              {activeTab === "uploaded" && (
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 shadow-md">
                  <UploadIcon className="w-5 h-5" />
                  <Link href="/dashboard/upload-file">Upload</Link>
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left table-auto border-collapse">
                <thead className="bg-blue-100 dark:bg-blue-800">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">File Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Size</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr
                      key={file.id}
                      className="border-b hover:bg-blue-50 dark:hover:bg-blue-800 transition"
                    >
                      <td className="p-3">{file.id}</td>
                      <td className="p-3 flex items-center">{getFileIcon(file.name)}{file.name}</td>
                      <td className="p-3">{file.category}</td>
                      <td className="p-3">{file.size}</td>
                      <td className="p-3">{file.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
