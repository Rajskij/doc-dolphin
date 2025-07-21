import * as React from "react"
import { LifeBuoy, FlaskConical, Home, Send } from "lucide-react";

import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher"
import { NavMain } from "@/components/sidebar/NavMain"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = {
  navMain: [
    {
      icon: Home,
      title: 'Home',
      url: '/'
    },
    {
      icon: FlaskConical,
      title: 'Test Analyzer',
      url: "#",
      items: [
        {
          name: 'Analyzer',
          url: '/analyze'
        },
        {
          name: 'Results',
          url: '/results'
        }
      ]
    }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ]
}

export function AppSidebar({ ...props }) {
  return (
    // variant: inset or floating add gap from all sides
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={items.navMain} />
      </SidebarContent>
      <SidebarFooter >
        <NavSecondary items={items.navSecondary} className="mt-0" />
      </SidebarFooter>
    </Sidebar>
  );
}
