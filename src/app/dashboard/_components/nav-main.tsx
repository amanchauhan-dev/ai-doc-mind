"use client"

import { Plus, type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ProgressSideBarLink } from "@/context/progress-bar"
import FileUploadDialog from "./quick-upload"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>

        <SidebarMenuItem className="flex gap-2 items-center bg-primary rounded-md overflow-hidden" >

        </SidebarMenuItem>
        <SidebarMenuItem className="flex items-center gap-2">

          <FileUploadDialog trigger={
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <Plus />
              <span >Quick Upload</span>
            </SidebarMenuButton>
          }
          />

        </SidebarMenuItem>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title} asChild>
              <ProgressSideBarLink href={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </ProgressSideBarLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
