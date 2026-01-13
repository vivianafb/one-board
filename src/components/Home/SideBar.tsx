"use client";

import Link from "next/link";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const SideBar = () => {
  return (
    <Sidebar>
    <SidebarHeader>
      <div className="px-4 py-3 text-lg font-semibold tracking-tight flex items-center gap-2">
        <SavingsRoundedIcon />
        <span>OneBoard</span>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/investments">Investments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/salary">Salary</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/profile">Profile</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <div className="px-4 py-3 text-xs text-muted-foreground">
        © 2025 OneBoard
      </div>
    </SidebarFooter>
  </Sidebar>
  );
};

export default SideBar;
