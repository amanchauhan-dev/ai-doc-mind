
import type { Metadata } from "next";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "File Dashboard",
  description: "Dashboard for file management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

        <div className="flex flex-col md:flex-row h-screen bg-blue-50 dark:bg-blue-900/10">
          <Sidebar />
          <main className="flex-1 p-4 md:p-8 overflow-auto">
            {children}
          </main>
        </div>
  );
}