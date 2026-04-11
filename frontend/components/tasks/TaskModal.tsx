"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskFormData } from "@/types";
import { cn } from "@/lib/utils";
import { Calendar, Flag, AlignLeft, Type } from "lucide-react";

const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),
  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
  due_date: z.string().nullable().optional(),
  priority: z.enum(["high", "medium", "low"]).optional(),
});

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => Promise<any>;
  initialData?: TaskFormData;
}

export const TaskModal = ({ isOpen, onClose, onSubmit, initialData }: TaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setDueDate(initialData.due_date || "");
      setPriority(initialData.priority || "medium");
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = taskSchema.safeParse({ title, description, due_date: due_date || null, priority });
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ title, description, due_date: due_date || null, priority });
      onClose();
    } catch (error) {
      console.error("Failed to submit task", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] p-0 border-none rounded-[32px] bg-[#F7F7F8] soft-shadow">
        <DialogHeader className="p-8 bg-white">
          <DialogTitle className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Type className="text-primary" size={20} />
            </div>
            {initialData ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Title & Description */}
            <div className="space-y-6 md:col-span-1">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-slate-400">Task Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className={cn(
                    "h-12 bg-white border-none rounded-2xl soft-shadow focus-visible:ring-1 focus-visible:ring-primary font-semibold",
                    errors.title && "ring-1 ring-red-500"
                  )}
                />
                {errors.title && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-slate-400">Description</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add some details..."
                  className="w-full min-h-[120px] p-4 bg-white border-none rounded-2xl soft-shadow focus:ring-1 focus:ring-primary focus:outline-none font-medium text-sm resize-none"
                />
              </div>
            </div>

            {/* Right Column: Settings */}
            <div className="space-y-6 md:col-span-1">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Flag size={14} /> Priority
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {(["high", "medium", "low"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={cn(
                        "h-11 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2",
                        priority === p 
                          ? p === 'high' ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-100" :
                            p === 'medium' ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-100" :
                            "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-100"
                          : "bg-white border-transparent text-slate-400 hover:border-slate-200"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="due_date" className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Calendar size={14} /> Due Date
                </Label>
                <Input
                  id="due_date"
                  type="date"
                  value={due_date}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="h-12 bg-white border-none rounded-2xl soft-shadow focus-visible:ring-1 focus-visible:ring-primary font-bold"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose} 
              className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-[2] h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-orange-200"
            >
              {loading ? "Saving..." : initialData ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
