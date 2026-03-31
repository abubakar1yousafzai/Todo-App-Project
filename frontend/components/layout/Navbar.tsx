"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import { LogOut, CheckSquare } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { tasks } = useTasks();

  return (
    <header className="bg-white sticky top-0 z-50 soft-shadow">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-orange-200">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-800 tracking-tight leading-none">My Tasks</span>
            <span className="text-xs font-medium text-slate-400 mt-1">{tasks.length} total tasks</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          {user && (
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-sm font-semibold text-slate-700 leading-none">{user.name || 'User'}</span>
              <span className="text-[10px] font-medium text-slate-400 mt-0.5">{user.email}</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="flex items-center gap-2 h-10 px-4 text-slate-600 hover:text-primary hover:bg-orange-50 rounded-xl transition-all font-semibold"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
