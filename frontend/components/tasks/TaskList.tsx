"use client";

import { TaskCard } from "./TaskCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/types";
import { CheckCircle } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggle: (id: number) => Promise<any>;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}

export const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onToggle, 
  onEditTask, 
  onDeleteTask 
}: TaskListProps) => {
  if (loading && tasks.length === 0) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-[20px]" />
        ))}
      </div>
    );
  }

  if (error && tasks.length === 0) {
    return (
      <div className="p-8 text-center rounded-[20px] bg-red-50 text-red-500 font-semibold">
        <p>{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="p-16 text-center rounded-[24px] bg-slate-50 flex flex-col items-center justify-center">
        <div className="bg-white p-4 rounded-full soft-shadow mb-4">
          <CheckCircle className="h-10 w-10 text-slate-200" />
        </div>
        <p className="text-slate-500 font-bold text-lg">All caught up!</p>
        <p className="text-sm text-slate-400 mt-1">
          No tasks found matching your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};
