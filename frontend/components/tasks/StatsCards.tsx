"use client";

import { Task } from "@/types";
import { CheckCircle2, AlertTriangle, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardsProps {
  tasks: Task[];
}

export function StatsCards({ tasks }: StatsCardsProps) {
  const completedCount = tasks.filter(t => t.completed).length;
  const highPriorityCount = tasks.filter(t => t.priority === "high" && !t.completed).length;
  const incompleteCount = tasks.filter(t => !t.completed).length;

  const stats = [
    {
      label: "Completed",
      count: completedCount,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
      iconColor: "text-green-600",
    },
    {
      label: "High Priority",
      count: highPriorityCount,
      icon: AlertTriangle,
      color: "bg-red-100 text-red-600",
      iconColor: "text-red-600",
    },
    {
      label: "Incomplete",
      count: incompleteCount,
      icon: Circle,
      color: "bg-orange-100 text-orange-600",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="soft-card p-6 flex flex-col items-center justify-center text-center border-none">
          <div className={`p-3 rounded-full ${stat.color} mb-3`}>
            <stat.icon size={24} className={stat.iconColor} />
          </div>
          <span className="text-3xl font-bold text-slate-800">{stat.count}</span>
          <span className="text-sm font-medium text-slate-500">{stat.label}</span>
        </Card>
      ))}
    </div>
  );
}
