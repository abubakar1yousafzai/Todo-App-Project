"use client";

import { TaskCard } from "./TaskCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/types";

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
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error && tasks.length === 0) {
    return (
      <div className="p-8 text-center border rounded-xl bg-destructive/5 text-destructive">
        <p>{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="p-12 text-center border-2 border-dashed rounded-xl bg-muted/30">
        <p className="text-muted-foreground font-medium">No tasks yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
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
