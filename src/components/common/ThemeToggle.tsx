"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read theme saved or use "light" by default
    const saved = window.localStorage.getItem("oneboard-theme") as Theme | null;
    const initial: Theme = saved === "dark" || saved === "light" ? saved : "light";

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("oneboard-theme", next);
  };

  // Evitar hidration mismatc
  if (!mounted) {
    return (
      <div className="w-12 h-6 rounded-full bg-muted animate-pulse" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "bg-gradient-to-r from-amber-400 to-orange-500 dark:from-slate-700 dark:to-slate-900",
        "shadow-lg hover:shadow-xl"
      )}
      aria-label="Toggle theme"
    >
      {/* Toggle circle */}
      <span
        className={cn(
          "absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ease-in-out",
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        )}
      >
        {theme === "dark" ? (
          <Moon className="h-3 w-3 text-slate-700" />
        ) : (
          <Sun className="h-3 w-3 text-amber-500" />
        )}
      </span>

      {/* Icons in background */}
      <div className="flex w-full items-center justify-between px-1.5">
        <Sun
          className={cn(
            "h-3.5 w-3.5 transition-opacity duration-300",
            theme === "light" ? "opacity-100 text-white" : "opacity-0"
          )}
        />
        <Moon
          className={cn(
            "h-3.5 w-3.5 transition-opacity duration-300",
            theme === "dark" ? "opacity-100 text-white" : "opacity-0"
          )}
        />
      </div>
    </button>
  );
}
