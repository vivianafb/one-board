"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  isMounted: boolean;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Marcar como montado después de la hidratación
  useEffect(() => {
    setIsMounted(true);
    // Cargar estado desde localStorage solo en el cliente
    const saved = localStorage.getItem("sidebar-open");
    if (saved !== null) {
      setIsOpen(saved === "true");
    }
  }, []);

  // Guardar estado en localStorage cuando cambie (solo en cliente)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("sidebar-open", String(isOpen));
    }
  }, [isOpen, isMounted]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider
      value={{ isOpen, toggleSidebar, openSidebar, closeSidebar, isMounted }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
