"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/layout/Navbar";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskModal } from "@/components/tasks/TaskModal";
import { DeleteConfirmDialog } from "@/components/tasks/DeleteConfirmDialog";
import { StatsCards } from "@/components/tasks/StatsCards";
import { SearchBar } from "@/components/tasks/SearchBar";
import { AddTaskInput } from "@/components/tasks/AddTaskInput";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types";
import { toast } from "sonner";

export default function DashboardPage() {
  const { 
    tasks,
    filteredTasks,
    loading, 
    error, 
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    addTask, 
    updateTask, 
    deleteTask, 
    toggleComplete,
    togglePin,
    refreshTasks 
  } = useTasks();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingTaskId(id);
  };

  const handleConfirmDelete = async () => {
    if (deletingTaskId) {
      const response = await deleteTask(deletingTaskId);
      if (response?.error) {
        toast.error("Something went wrong");
      }
      setDeletingTaskId(null);
    }
  };

  const handleModalSubmit = async (data: any) => {
    let response;
    if (editingTask) {
      response = await updateTask(editingTask.id, data);
      if (response?.error) {
        toast.error("Something went wrong");
      } else {
        toast.success("Task updated successfully");
      }
    } else {
      response = await addTask(data);
      if (response?.error) {
        toast.error("Something went wrong");
      }
    }
  };

  const handleToggleComplete = async (taskId: number) => {
    const response = await toggleComplete(taskId);
    if (response?.error) {
      toast.error("Failed to update task status");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F7F7F8]">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24">
          
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={refreshTasks} 
              disabled={loading}
              className="rounded-xl text-slate-400 hover:text-primary hover:bg-orange-50"
              title="Refresh tasks"
            >
              <RefreshCcw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          <div className="mb-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <StatsCards 
            tasks={tasks} 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />

          <div className="mt-4 mb-8">
            <AddTaskInput onAdd={addTask} />
          </div>

          <div className="bg-white rounded-[32px] p-6 soft-shadow min-h-[400px] border border-slate-50">
            <TaskList 
            tasks={filteredTasks}
            loading={loading}
            error={error}
            onToggle={handleToggleComplete}
            onTogglePin={togglePin}
            onEditTask={handleEditTask} 
            onDeleteTask={handleDeleteClick} 
            />          </div>
        </main>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={editingTask}
        />

        <DeleteConfirmDialog
          isOpen={deletingTaskId !== null}
          onClose={() => setDeletingTaskId(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </ProtectedRoute>
  );
}
