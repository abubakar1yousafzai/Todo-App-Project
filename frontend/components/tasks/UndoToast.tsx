"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface UndoToastProps {
  onUndo: () => void;
}

export const UndoToast = ({ onUndo }: UndoToastProps) => {
  return (
    <div className="flex items-center justify-between w-full gap-4 bg-white p-4 rounded-2xl soft-shadow border border-slate-100 min-w-[300px]">
      <div className="flex items-center gap-3">
        <div className="bg-orange-50 p-2 rounded-full">
          <RotateCcw size={16} className="text-primary" />
        </div>
        <span className="text-sm font-bold text-slate-600">Task deleted accidentally?</span>
      </div>
      <Button
        variant="default"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onUndo();
        }}
        className="h-9 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange-100"
      >
        Undo
      </Button>
    </div>
  );
};
