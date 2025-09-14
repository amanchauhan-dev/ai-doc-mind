"use client"


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/auth-provider"

export function NavUser() {
  const { user } = useAuth()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={''} alt={user?.first_name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.first_name + " " + user?.last_name}</span>
            <span className="truncate text-xs">{user?.email}</span>
          </div>
        </SidebarMenuButton>

      </SidebarMenuItem>
    </SidebarMenu>
  )
}
