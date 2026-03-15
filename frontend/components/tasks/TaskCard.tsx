"use client";

import { Task } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskCard = ({ task, onToggle, onEdit, onDelete }: TaskCardProps) => {
  return (
    <Card className={cn("transition-all", task.completed && "bg-muted/50")}>
      <CardContent className="p-4 flex items-center gap-4">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          aria-label="Toggle task"
        />
        
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-medium leading-none truncate",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={cn(
                "text-sm text-muted-foreground mt-1 line-clamp-2",
                task.completed && "line-through opacity-70"
              )}
            >
              {task.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            title="Edit Task"
            aria-label={`Edit task: ${task.title}`}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            title="Delete Task"
            aria-label={`Delete task: ${task.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
