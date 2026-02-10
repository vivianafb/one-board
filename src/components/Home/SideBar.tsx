"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/stores/ui.store";
import React from "react";
import { Home, ArrowLeftRight, PiggyBank, TrendingUp, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_WIDTH = "18rem";
const SIDEBAR_WIDTH_COLLAPSED = "4rem";

const SideBar = () => {
  const pathname = usePathname();
  const isOpen = useUIStore((s) => s.isSidebarOpen);
  const isHydrated = useUIStore((s) => s.isHydrated);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const closeSidebar = useUIStore((s) => s.closeSidebar);
    
  // Evita "flash" antes de hidratar (mobile-first: cerrado).
  const sidebarOpen = isHydrated ? isOpen : false;
  
  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
    { href: "/savings", label: "Savings", icon: PiggyBank },
    { href: "/investments", label: "Investments", icon: TrendingUp },
  ];

  // En móvil: al navegar, cerramos el drawer.
  React.useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // En móvil: ESC cierra el drawer.
  React.useEffect(() => {
    if (!sidebarOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen, closeSidebar]);

  return (
    <>
      {/* Mobile drawer */}
      <div className={cn("md:hidden", sidebarOpen ? "pointer-events-auto" : "pointer-events-none")}>
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/40 transition-opacity duration-200",
            sidebarOpen ? "opacity-100" : "opacity-0"
          )}
          aria-hidden="true"
          onClick={closeSidebar}
        />
        <aside
          className={cn(
            "fixed left-0 top-0 bottom-0 z-50 w-72 max-w-[85vw]",
            "bg-sidebar/90 backdrop-blur-xl border-r border-sidebar-border/50 shadow-xl overflow-hidden",
            "transform transition-transform duration-200 ease-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          aria-label="Menú"
        >
          <div className="border-b border-sidebar-border flex items-center justify-between h-16 px-4">
            <div className="text-lg font-semibold text-sidebar-foreground">OneBoard</div>
            <button
              type="button"
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-200"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5 text-sidebar-foreground" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg text-sm font-medium px-4 py-3",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        "transition-colors duration-200",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                          : "text-sidebar-foreground"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
                        )}
                      />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>

      {/* Desktop sidebar (colapsable) */}
      <aside
        className="hidden md:flex bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border/50 flex-col flex-shrink-0 shadow-lg overflow-hidden"
        style={{
          width: sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED,
          transition: isHydrated ? "width 300ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        }}
      >
        <div
          className={cn(
            "border-b border-sidebar-border flex items-center relative h-16",
            "transition-all duration-300 ease-in-out",
            sidebarOpen ? "px-6" : "px-2"
          )}
        >
          <div className="absolute right-0 top-0 bottom-0 w-px bg-sidebar-border" />
          {sidebarOpen ? (
            <div className="flex items-center justify-between w-full gap-4">
              <div
                className={cn(
                  "text-xl font-bold tracking-tight text-sidebar-foreground",
                  "transition-all duration-300 ease-in-out",
                  "overflow-hidden whitespace-nowrap"
                )}
              >
                OneBoard
              </div>
              <button
                type="button"
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 cursor-pointer flex-shrink-0"
                aria-label="Colapsar/expandir sidebar"
              >
                <Menu className="h-5 w-5 text-sidebar-foreground" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={toggleSidebar}
              className="w-full p-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-200 cursor-pointer flex items-center justify-center"
              aria-label="Colapsar/expandir sidebar"
            >
              <Menu className="h-5 w-5 text-sidebar-foreground" />
            </button>
          )}
        </div>

        <nav
          className="flex-1 overflow-y-auto py-4 transition-all duration-300 ease-in-out"
          style={{
            paddingLeft: sidebarOpen ? "1rem" : "0.5rem",
            paddingRight: sidebarOpen ? "1rem" : "0.5rem",
          }}
        >
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
                      sidebarOpen ? "gap-3 px-4 py-3" : "justify-center px-2 py-3"
                    )}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-all duration-300 ease-in-out flex-shrink-0",
                        isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
                      )}
                    />
                    {sidebarOpen && (
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
    </>
  );
};

export default SideBar;
