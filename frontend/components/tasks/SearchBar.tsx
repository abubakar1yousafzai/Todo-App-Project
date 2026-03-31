"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full mb-4">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <Search size={20} />
      </div>
      <Input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 h-12 bg-white rounded-2xl border-none soft-shadow focus-visible:ring-primary focus-visible:ring-1 text-slate-600 transition-all"
      />
    </div>
  );
}
