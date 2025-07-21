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

export function NavMain({ items }) {
  console.log(items)
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <Collapsible key={item.title} className="group/collapsible">
            <SidebarMenuItem>
              {item.items
                ? <CollapsibleTrigger >
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span className="overflow-hidden">{item.title}</span>
                    <ChevronRight
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                : <SidebarMenuButton asChild tooltip={item.title}>
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span className="overflow-hidden">{item.title}</span>
                  </Link>
                </SidebarMenuButton>}
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map(subItem => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuButton asChild tooltip={subItem.title}>
                        <Link to={subItem.url}>
                          <span>{subItem.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
