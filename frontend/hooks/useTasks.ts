import { useState, useEffect, useCallback } from "react";
import { Task, TaskFormData, ApiResponse } from "@/types";
import { 
  getTasks, 
  createTask, 
  updateTask as apiUpdateTask, 
  deleteTask as apiDeleteTask, 
  toggleComplete as apiToggleComplete 
} from "@/lib/api";
import { useAuth } from "./useAuth";

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await getTasks(user.id);
      
      if (response.error) {
        setError(response.error);
      } else {
        // Handle both formats: direct array [] or object { items: [], count: 0 }
        const data = response.data as any;
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (data?.items && Array.isArray(data.items)) {
          setTasks(data.items);
        } else {
          setTasks([]);
        }
      }
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (data: TaskFormData): Promise<ApiResponse<Task>> => {
    if (!user?.id) return { error: "User not authenticated" };

    const response = await createTask(user.id, data);
    
    if (response.data && !response.error) {
      // Extract task from response
      const savedTask = (response.data as any)?.item ?? response.data;
      // Add new task directly to state for immediate UI update
      setTasks(prev => [savedTask, ...prev]);
      return { data: savedTask };
    }
    
    if (response.error) {
      setError(response.error);
    }
    return response;
  };

  const updateTask = async (taskId: number, data: TaskFormData): Promise<ApiResponse<Task>> => {
    if (!user?.id) return { error: "User not authenticated" };

    // Optimistic Update
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, ...data, updated_at: new Date().toISOString() } : t
    ));

    const response = await apiUpdateTask(user.id, taskId, data);
    
    if (response.error) {
      setError(response.error);
      setTasks(previousTasks); // Rollback
      return response;
    }

    const updatedTask = (response.data as any)?.item ?? response.data;
    setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    return { data: updatedTask };
  };

  const deleteTask = async (taskId: number): Promise<ApiResponse<void>> => {
    if (!user?.id) return { error: "User not authenticated" };

    // Optimistic Update
    const previousTasks = [...tasks];
    setTasks(prev => prev.filter(t => t.id !== taskId));

    const response = await apiDeleteTask(user.id, taskId);
    
    if (response.error) {
      setError(response.error);
      setTasks(previousTasks); // Rollback
      return response;
    }

    return response;
  };

  const toggleComplete = async (taskId: number): Promise<ApiResponse<Task>> => {
    if (!user?.id) return { error: "User not authenticated" };

    // Optimistic Update
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed, updated_at: new Date().toISOString() } : t
    ));

    const response = await apiToggleComplete(user.id, taskId);
    
    if (response.error) {
      setError(response.error);
      setTasks(previousTasks); // Rollback
      return response;
    }

    const updatedTask = (response.data as any)?.item ?? response.data;
    setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    return { data: updatedTask };
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    refreshTasks: fetchTasks,
  };
};
