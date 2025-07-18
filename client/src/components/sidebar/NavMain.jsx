"use client"

import { FlaskConical,Home, User } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

export function NavMain({
  items
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip='Title'>
              <Link to='/'>
                <Home />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Collapsible>
        <Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip='Title'>
              <Link to='/about'>
                <FlaskConical />
                <span>Analyzer</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Collapsible>
        <Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip='Title'>
              <Link to='/users'>
                <User />
                <span>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
