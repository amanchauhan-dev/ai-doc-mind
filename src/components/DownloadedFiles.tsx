"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

type FileItem = {
  id: string;
  name: string;
  category: string;
  size: string;
  date: string;
};

const downloadedFiles: FileItem[] = [
  { id: "#D001", name: "Project_Summary.pdf", category: "Finance", size: "1.2 MB", date: "2024-02-10 10:15" },
  { id: "#D002", name: "Company_Policy.docx", category: "HR", size: "2.1 MB", date: "2024-02-09 12:00" },
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

export default function DownloadedFilesPage() {
  const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
  
    const totalPages = Math.ceil(downloadedFiles.length / itemsPerPage);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFiles = downloadedFiles.slice(startIndex, startIndex + itemsPerPage);
  return (
    <Card className="shadow-lg border border-blue-200 dark:border-blue-700">
      <CardHeader className="flex flex-col items-center gap-4">
                <div className="flex justify-between w-full">
                <CardTitle className="text-blue-700 dark:text-blue-300 text-3xl font-bold">
                    Downloaded files...
                </CardTitle>
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
        </div>        {/* Pagination */}
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