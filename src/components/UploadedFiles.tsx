"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadIcon, FileText, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

export default function UploadedFilesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(uploadedFiles.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFiles = uploadedFiles.slice(startIndex, startIndex + itemsPerPage);
  return (
    <Card className="shadow-lg border border-blue-200 dark:border-blue-700">
      <CardHeader className="flex flex-col items-center gap-4">
        <div className="flex justify-between w-full">
          <CardTitle className="text-blue-700 dark:text-blue-300 text-3xl font-bold">
            Uploaded Files...
          </CardTitle>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 shadow-md">
            <UploadIcon className="w-5 h-5" />
            <Link href="/dashboard/upload-file">Upload</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
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
              {currentFiles.map((file) => (
                <tr
                  key={file.id}
                  className="border-b hover:bg-blue-50 dark:hover:bg-blue-800 transition"
                >
                  <td className="p-3">{file.id}</td>
                  <td className="p-3 flex items-center">
                    {getFileIcon(file.name)}
                    {file.name}
                  </td>
                  <td className="p-3">{file.category}</td>
                  <td className="p-3">{file.size}</td>
                  <td className="p-3">{file.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border-blue-300 text-blue-600 hover:bg-blue-100"
          >
            Prev
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white shadow-md"
                  : "border-blue-300 text-blue-600 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border-blue-300 text-blue-600 hover:bg-blue-100"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}