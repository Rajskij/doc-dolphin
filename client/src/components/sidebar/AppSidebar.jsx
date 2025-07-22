import * as React from "react"
import { LifeBuoy, FlaskConical, Home, Send, NotebookPen } from "lucide-react";

import { NavMain } from "@/components/sidebar/NavMain"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
    },
    {
      icon: NotebookPen,
      title: 'Mood Journal',
      url: '#',
      items: [
        {
          name: 'Log Mood',
          url: '/mood'
        },
        {
          name: 'Mood History',
          url: '/mood/history'
        },
        {
          name: 'Mood Insights',
          url: '/mood/insights'
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
