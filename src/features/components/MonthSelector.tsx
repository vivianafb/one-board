"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useConfigStore } from "@/features/config/store";

export const MonthSelector = () => {
  const selectedMonth = useConfigStore((s) => s.selectedMonth);
  const { nextMonth, prevMonth } = useConfigStore((s) => s.actions);

  const displayDate = new Date(selectedMonth + "-02").toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-2 bg-background border p-1 rounded-md">
      <Button variant="ghost" size="sm" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
      <div className="flex items-center gap-2 px-2">
        <Calendar className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium capitalize">{displayDate}</span>
      </div>
      <Button variant="ghost" size="sm" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
    </div>
  );
};