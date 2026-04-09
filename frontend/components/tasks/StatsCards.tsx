"use client";

import { Task } from "@/types";
import { CheckCircle2, AlertTriangle, Circle, List } from "lucide-react";
import { Card } from "@/components/ui/card";
import { FilterType } from "@/hooks/useTasks";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  tasks: Task[];
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function StatsCards({ tasks, activeFilter, onFilterChange }: StatsCardsProps) {
  const allCount = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  const highPriorityCount = tasks.filter(t => t.priority === "high" && !t.completed).length;

  const stats = [
    {
      id: "All" as FilterType,
      label: "All",
      count: allCount,
      icon: List,
      color: "bg-slate-100 text-slate-600",
      activeColor: "bg-white ring-2 ring-slate-200",
    },
    {
      id: "Completed" as FilterType,
      label: "Completed",
      count: completedCount,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
      activeColor: "bg-white ring-2 ring-green-400 shadow-green-100",
    },
    {
      id: "Pending" as FilterType,
      label: "Pending",
      count: pendingCount,
      icon: Circle,
      color: "bg-orange-100 text-orange-600",
      activeColor: "bg-white ring-2 ring-orange-400 shadow-orange-100",
    },
    {
      id: "High Priority" as FilterType,
      label: "High Priority",
      count: highPriorityCount,
      icon: AlertTriangle,
      color: "bg-red-100 text-red-600",
      activeColor: "bg-white ring-2 ring-red-400 shadow-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {stats.map((stat) => (
        <Card 
          key={stat.id} 
          onClick={() => onFilterChange(stat.id)}
          className={cn(
            "soft-card p-3 flex flex-col items-center justify-center text-center border-none cursor-pointer transition-all duration-300 h-24",
            activeFilter === stat.id ? stat.activeColor + " shadow-lg -translate-y-1" : "bg-white opacity-80 hover:opacity-100"
          )}
        >
          <div className={cn("p-2 rounded-full mb-1", stat.color)}>
            <stat.icon size={18} />
          </div>
          <span className="text-xl font-black text-slate-800 leading-tight">{stat.count}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</span>
        </Card>
      ))}
    </div>
  );
}
