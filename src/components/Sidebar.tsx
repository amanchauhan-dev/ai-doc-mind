
"use client";

import { useState } from "react";
import { FileUp, FileDown, Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isUploadedActive = pathname === "/dashboard/uploaded-files";
  const isDownloadedActive = pathname === "/dashboard/downloaded-files";
  const isSearchActive = pathname === "/dashboard/search-files";

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-blue-600 text-white px-4 py-3 shadow-lg">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Dashboard
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/40 p-6 shadow-2xl flex flex-col transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header / Logo */}
        <div className="mb-8 hidden md:block">
          <Link href="/" className="text-2xl font-bold text-blue-800 dark:text-blue-200 tracking-tight">
            Dashboard
          </Link>
        </div>

        {/* Nav */}
        <nav className="space-y-2">
          <Link href="/dashboard/uploaded-files" passHref>
            <div
              className={`flex items-center px-4 py-2 rounded-xl cursor-pointer transition-all ${
                isUploadedActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-blue-800 dark:text-blue-200 hover:bg-blue-300/50 dark:hover:bg-blue-700/40"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <FileUp className="mr-2 h-5 w-5" /> Uploaded Files
            </div>
          </Link>

          <Link href="/dashboard/downloaded-files" passHref>
            <div
              className={`flex items-center px-4 py-2 rounded-xl cursor-pointer transition-all mt-2 ${
                isDownloadedActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-blue-800 dark:text-blue-200 hover:bg-blue-300/50 dark:hover:bg-blue-700/40"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <FileDown className="mr-2 h-5 w-5" /> Downloaded Files
            </div>
          </Link>
          <Link href="/dashboard/search-files" passHref>
            <div
              className={`flex items-center px-4 py-2 rounded-xl cursor-pointer transition-all mt-2 ${
                isSearchActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-blue-800 dark:text-blue-200 hover:bg-blue-300/50 dark:hover:bg-blue-700/40"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Search className="mr-2 h-5 w-5" /> Search Files
            </div>
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-auto text-sm text-blue-700 dark:text-blue-300 opacity-70">
          © 2025 MyApp
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
