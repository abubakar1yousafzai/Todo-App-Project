"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/layout/Navbar";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskModal } from "@/components/tasks/TaskModal";
import { DeleteConfirmDialog } from "@/components/tasks/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types";
import { toast } from "sonner";

export default function DashboardPage() {
  const { 
    tasks, 
    loading, 
    error, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleComplete,
    refreshTasks 
  } = useTasks();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

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
      } else {
        toast.success("Task deleted successfully");
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
      } else {
        toast.success("Task added successfully");
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
      <div className="min-h-screen bg-muted/20">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
              <p className="text-muted-foreground mt-1">
                Manage your daily goals and productivity.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={refreshTasks} 
                disabled={loading}
                title="Refresh tasks"
              >
                <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button onClick={handleAddTask} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Task</span>
              </Button>
            </div>
          </div>

          <TaskList 
            tasks={tasks}
            loading={loading}
            error={error}
            onToggle={handleToggleComplete}
            onEditTask={handleEditTask} 
            onDeleteTask={handleDeleteClick} 
          />
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
