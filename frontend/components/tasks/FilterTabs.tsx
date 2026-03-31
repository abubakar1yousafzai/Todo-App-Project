"use client";

import { FilterType } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";

interface FilterTabsProps {
  activeFilter: FilterType;
  onChange: (filter: FilterType) => void;
}

export function FilterTabs({ activeFilter, onChange }: FilterTabsProps) {
  const filters: FilterType[] = ["All", "Completed", "Pending", "High Priority"];

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? "default" : "secondary"}
          size="sm"
          onClick={() => onChange(filter)}
          className={`rounded-full px-5 py-1.5 h-auto text-sm font-semibold transition-all duration-200 border-none ${
            activeFilter === filter 
              ? "bg-primary text-white hover:bg-primary/90 shadow-md" 
              : "bg-slate-200 text-slate-600 hover:bg-slate-300"
          }`}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
