import { ChevronRight, FlaskConical, Home, NotepadText } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

export function NavMain({
  items
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip='Home'>
            <Link to='/'>
              <Home />
              <span>Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <Collapsible className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger >
              <SidebarMenuButton tooltip='Analyzer'>
                <FlaskConical />
                <span className="overflow-hidden">Test Analyzer</span>
                <ChevronRight
                  className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuButton asChild tooltip='Title'>
                    <Link to='/analyze'>
                      <span>Analyzer</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuButton asChild tooltip='Title'>
                    <Link to='/results'>
                      <span>Results</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <Collapsible>
          <SidebarMenuItem>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
