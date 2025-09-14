"use client"

import * as React from "react"
import {
  File,
  LayoutDashboard,
  Sparkle,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/app/dashboard/_components/nav-main"
import { NavUser } from "@/app/dashboard/_components/nav-user"
import { TeamSwitcher } from "@/app/dashboard/_components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "DocMInd",
    email: "docmind@doc.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams:
  {
    name: "Doc Mind",
    logo: Sparkle,
    plan: "AI Powered Doc Manager",
  },
  navMain: [
    {
      title: "Dashbaord",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Documents",
      url: "/dashboard/documents",
      icon: File,

    },
    {
      title: "Logs",
      url: "/dashboard/logs",
      icon: SquareTerminal,
      isActive: true,
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
