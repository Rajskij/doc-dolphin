import { FlaskConical, Home, NotepadText } from "lucide-react";
import { Collapsible } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
                <NotepadText />
                <span>Results</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
