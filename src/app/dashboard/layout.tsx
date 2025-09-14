"use client";

import { AppSidebar } from "@/app/dashboard/_components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/auth-provider";
import { usePathname } from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Extract the last part after "/"
    const rawTitle = pathname?.split("/").filter(Boolean).pop() || "Dashboard";

    // Capitalize first letter & replace hyphens with spaces
    const pageTitle =
        rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1).replace(/-/g, " ");

    return (
        <AuthProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between pr-4">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <h1 className="font-semibold">{pageTitle}</h1>
                        </div>
                        <div>
                            <ModeToggle />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthProvider>
    );
}

export default Layout;
