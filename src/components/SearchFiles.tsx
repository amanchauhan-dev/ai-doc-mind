"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadIcon, FileText, FileSpreadsheet, Search } from "lucide-react";
import Link from "next/link";

type FileItem = {
  id: string;
  name: string;
  category: string;
  size: string;
  date: string;
};

const searchFiles: FileItem[] = [
  { id: "#0001", name: "Financial_Report_Q3.pdf", category: "Finance", size: "2.4 MB", date: "2024-01-15 14:30" },
  { id: "#0002", name: "Employee_Handbook.docx", category: "HR", size: "1.8 MB", date: "2024-01-14 09:15" },
  { id: "#0003", name: "Budget_Analysis.xlsx", category: "Finance", size: "856 KB", date: "2024-01-13 16:45" },
  { id: "#0004", name: "Technical_Specifications.pdf", category: "Technical", size: "3.2 MB", date: "2024-01-12 11:20" },
  { id: "#0005", name: "Contract_Template.docx", category: "Legal", size: "924 KB", date: "2024-01-11 13:55" },
  { id: "#0006", name: "Project_Plan.xlsx", category: "Management", size: "1.5 MB", date: "2024-01-18 10:45" },
  { id: "#0007", name: "Meeting_Notes.docx", category: "HR", size: "768 KB", date: "2024-01-19 09:20" },
  { id: "#0008", name: "Client_Agreement.pdf", category: "Legal", size: "2.1 MB", date: "2024-01-20 14:10" },
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

export default function SearchFilePage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter files first
  const filteredFiles = searchFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(search.toLowerCase()) ||
      file.category.toLowerCase().includes(search.toLowerCase()) ||
      file.id.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination applied on filtered files
  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFiles = filteredFiles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Card className="shadow-lg border border-blue-200 dark:border-blue-700">
      <CardHeader className="flex flex-col items-center gap-4">
        <div className="flex justify-between w-full">
          <CardTitle className="text-blue-700 dark:text-blue-300 text-3xl font-bold">
            Search any files...
          </CardTitle>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 shadow-md">
            <UploadIcon className="w-5 h-5" />
            <Link href="/dashboard/upload-file">Upload</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Search Section */}
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
            <Input
              type="text"
              placeholder="Type file name, category or ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset page on new search
              }}
              className="pl-10 pr-4 py-3 rounded-xl border border-blue-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
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
              {currentFiles.length > 0 ? (
                currentFiles.map((file) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No matching files found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredFiles.length > 0 && (
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
        )}
      </CardContent>
    </Card>
  );
}
