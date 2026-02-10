"use client";

import Link from "next/link";
import React from "react";
import { User, Settings, Bell, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui.store";

const Navbar = () => {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const iconButtons = [
    { icon: Bell, label: "Notifications", hasBadge: true },
    { icon: Settings, label: "Settings" },
    { icon: User, label: "Profile" },
  ];

  return (
    <div className="flex justify-between items-center px-2 sm:px-4 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          onClick={toggleSidebar}
          className={cn(
            "md:hidden",
            "p-2 rounded-lg transition-all duration-200",
            "hover:bg-muted active:scale-95",
            "text-muted-foreground hover:text-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
          aria-label="Abrir/cerrar menú"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link
          href="/"
          className="font-semibold text-base sm:text-lg hover:opacity-80 transition-opacity truncate"
        >
          OneBoard
        </Link>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* En XS (<= 320px) dejamos solo notificaciones para evitar overflow */}
        {iconButtons.map(({ icon: Icon, label, hasBadge }, idx) => (
          <button
            key={label}
            className={cn(
              idx > 0 ? "hidden sm:inline-flex" : "inline-flex",
              "relative p-2 rounded-lg transition-all duration-200",
              "hover:bg-muted active:scale-95",
              "text-muted-foreground hover:text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            aria-label={label}
          >
            <Icon className="h-5 w-5" />
            {hasBadge && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full ring-2 ring-background" />
            )}
          </button>
        ))}

        <div className="ml-1 sm:ml-2 pl-1 sm:pl-2 border-l border-border">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
