"use client";

import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskFormData } from "@/types";
import { toast } from "sonner";

interface AddTaskInputProps {
  onAdd: (data: TaskFormData) => Promise<any>;
}

export function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await onAdd({
        title: title.trim(),
        priority,
        due_date: dueDate || null,
        is_pinned: false,
      });
      
      if (!response?.error) {
        setTitle("");
        setDueDate("");
        setPriority("medium");
        setShowOptions(false);
        toast.success("Task added successfully");
      }
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-2 soft-shadow transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/20 border border-slate-50">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex items-center gap-2 p-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setShowOptions(true)}
            className="flex-1 h-12 border-none bg-transparent text-lg font-bold placeholder:text-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-700"
          />
          <Button 
            type="submit" 
            disabled={!title.trim() || loading}
            className="bg-primary hover:bg-primary/90 text-white rounded-full w-12 h-12 p-0 shadow-lg shadow-orange-200 transition-all active:scale-90"
          >
            <Plus size={24} strokeWidth={4} />
          </Button>
        </div>

        {showOptions && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 border-t border-slate-50 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100">
                {(["high", "medium", "low"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                      priority === p
                        ? p === "high" 
                          ? "bg-red-500 text-white shadow-md shadow-red-100" 
                          : p === "medium"
                          ? "bg-orange-500 text-white shadow-md shadow-orange-100"
                          : "bg-blue-500 text-white shadow-md shadow-blue-100"
                        : "text-slate-400 hover:text-slate-600 hover:bg-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="task-date-input"
                />
                <label 
                  htmlFor="task-date-input" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all border ${
                    dueDate 
                      ? "bg-primary/10 text-primary border-primary/20" 
                      : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-white hover:text-slate-600"
                  }`}
                >
                  <Calendar size={14} />
                  {dueDate ? new Date(dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "Due date"}
                </label>
              </div>
            </div>
            
            <button 
              type="button" 
              onClick={() => {
                setShowOptions(false);
                setTitle("");
              }}
              className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-500 px-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
