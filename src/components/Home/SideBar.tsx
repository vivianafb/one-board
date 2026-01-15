"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import { Home, ArrowLeftRight, PiggyBank, TrendingUp, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_WIDTH = "18rem";
const SIDEBAR_WIDTH_COLLAPSED = "4rem";

const SideBar = () => {
  const pathname = usePathname();
  const { isOpen, toggleSidebar, isMounted } = useSidebar();
  
  // Evitar renderizado hasta que esté montado (evita hydration mismatch)
  if (!isMounted) {
    return (
      <aside
        className="bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border/50 flex flex-col flex-shrink-0 shadow-lg"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <div className="border-b border-sidebar-border h-16 flex items-center px-6">
          <div className="text-xl font-bold tracking-tight text-sidebar-foreground">
            OneBoard
          </div>
        </div>
      </aside>
    );
  }

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
    { href: "/savings", label: "Savings", icon: PiggyBank },
    { href: "/investments", label: "Investments", icon: TrendingUp },
  ];

  return (
    <aside
      className="bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border/50 flex flex-col flex-shrink-0 shadow-lg overflow-hidden"
      style={{
        width: isOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED,
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Header con botón toggle */}
      <div className={cn(
        "border-b border-sidebar-border flex items-center relative h-16",
        "transition-all duration-300 ease-in-out",
        isOpen ? "px-6" : "px-2"
      )}>
        {/* Separador vertical a la derecha del header */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-sidebar-border" />
        {isOpen ? (
          <div className="flex items-center justify-between w-full gap-4">
            <div className={cn(
              "text-xl font-bold tracking-tight text-sidebar-foreground",
              "transition-all duration-300 ease-in-out",
              "overflow-hidden whitespace-nowrap"
            )}>
              OneBoard
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 cursor-pointer flex-shrink-0"
              aria-label="Toggle Sidebar"
            >
              <Menu className="h-5 w-5 text-sidebar-foreground" />
            </button>
          </div>
        ) : (
          <button
            onClick={toggleSidebar}
            className="w-full p-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 cursor-pointer flex items-center justify-center"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-5 w-5 text-sidebar-foreground" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 transition-all duration-300 ease-in-out" style={{ paddingLeft: isOpen ? "1rem" : "0.5rem", paddingRight: isOpen ? "1rem" : "0.5rem" }}>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    "transition-all duration-300 ease-in-out",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "text-sidebar-foreground",
                    isOpen ? "gap-3 px-4 py-3" : "justify-center px-2 py-3"
                  )}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-all duration-300 ease-in-out flex-shrink-0",
                      isActive
                        ? "text-sidebar-accent-foreground"
                        : "text-sidebar-foreground"
                    )}
                  />
                  {isOpen && (
                    <span className="overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>


    </aside>
  );
};

export default SideBar;
