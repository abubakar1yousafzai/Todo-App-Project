"use client";

import { Task } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTasks } from "@/hooks/useTasks";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const { toggleComplete, togglePin } = useTasks();
  const isOverdue = task.due_date && new Date(task.due_date) < new Date(new Date().setHours(0, 0, 0, 0)) && !task.completed;

  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-orange-500",
    low: "bg-blue-500",
  };

  const barColor = task.completed ? "bg-green-500" : priorityColors[task.priority];

  return (
    <div className={cn(
      "group relative flex items-center gap-4 p-4 bg-white rounded-[20px] transition-all duration-300 hover-lift soft-shadow border border-transparent hover:border-slate-100",
      task.completed && "opacity-75"
    )}>
      {/* Left Priority Bar */}
      <div className={cn("absolute left-0 top-4 bottom-4 w-1.5 rounded-r-full transition-colors", barColor)} />

      {/* Checkbox (Custom Circle Style) */}
      <div className="pl-2">
        <button
          onClick={() => toggleComplete(task.id)}
          data-testid="task-toggle"
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
            task.completed 
              ? "bg-green-500 border-green-500 text-white" 
              : "border-slate-200 hover:border-primary"
          )}
        >
          {task.completed && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0" onClick={() => onEdit(task)} role="button" aria-label={`Task: ${task.title}`}>
        <h3 className={cn(
          "text-base font-bold text-slate-700 truncate transition-all",
          task.completed && "line-through text-slate-400"
        )}>
          {task.title}
        </h3>
        
        <div className="flex items-center gap-3 mt-1">
          {task.due_date && (
            <div className={cn(
              "flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider",
              isOverdue ? "text-red-500" : "text-slate-400"
            )}>
              <Calendar size={12} />
              <span>{new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
          )}
          {!task.completed && (
            <span className={cn(
              "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
              task.priority === 'high' ? "bg-red-50 text-red-500" :
              task.priority === 'medium' ? "bg-orange-50 text-orange-500" : "bg-blue-50 text-blue-500"
            )}>
              {task.priority}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            togglePin(task.id);
          }}
          className={cn(
            "rounded-full transition-all",
            task.is_pinned ? "text-primary bg-orange-50" : "text-slate-300 hover:text-slate-600"
          )}
        >
          <Pin size={18} fill={task.is_pinned ? "currentColor" : "none"} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          data-testid="task-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};
