import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Task, TaskFormData, ApiResponse } from "@/types";
import { 
  getTasks, 
  createTask, 
  updateTask as apiUpdateTask, 
  deleteTask as apiDeleteTask, 
  toggleComplete as apiToggleComplete,
  togglePin as apiTogglePin
} from "@/lib/api";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import { UndoToast } from "@/components/tasks/UndoToast";

export type FilterType = "All" | "Completed" | "Pending" | "High Priority";

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const deleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingDeleteIdRef = useRef<number | null>(null);

  const fetchTasks = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await getTasks(user.id);
      
      if (response.error) {
        setError(response.error);
      } else {
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

  useEffect(() => {
    return () => {
      if (deleteTimeoutRef.current) {
        clearTimeout(deleteTimeoutRef.current);
      }
    };
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = 
          activeFilter === "All" ||
          (activeFilter === "Completed" && task.completed) ||
          (activeFilter === "Pending" && !task.completed) ||
          (activeFilter === "High Priority" && task.priority === "high" && !task.completed);
        
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [tasks, searchQuery, activeFilter]);

  const addTask = async (data: TaskFormData): Promise<ApiResponse<Task>> => {
    if (!user?.id) return { error: "User not authenticated" };

    const response = await createTask(user.id, data);
    
    if (response.data && !response.error) {
      const savedTask = (response.data as any)?.item ?? response.data;
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

    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { 
        ...t, 
        ...data, 
        updated_at: new Date().toISOString() 
      } : t
    ));

    const response = await apiUpdateTask(user.id, taskId, data);
    
    if (response.error) {
      setError(response.error);
      setTasks(previousTasks);
      return response;
    }

    const updatedTask = (response.data as any)?.item ?? response.data;
    setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    return { data: updatedTask };
  };

  const deleteTask = async (taskId: number): Promise<ApiResponse<void>> => {
    if (!user?.id) return { error: "User not authenticated" };

    if (pendingDeleteIdRef.current && deleteTimeoutRef.current) {
      clearTimeout(deleteTimeoutRef.current);
      apiDeleteTask(user.id, pendingDeleteIdRef.current);
    }

    const tasksBackup = [...tasks];
    const taskToDelete = tasks.find(t => t.id === taskId);

    if (!taskToDelete) return { error: "Task not found" };

    setTasks(prev => prev.filter(t => t.id !== taskId));
    pendingDeleteIdRef.current = taskId;

    const handleUndo = () => {
      if (deleteTimeoutRef.current) {
        clearTimeout(deleteTimeoutRef.current);
        deleteTimeoutRef.current = null;
      }
      pendingDeleteIdRef.current = null;
      setTasks(tasksBackup);
      toast.dismiss("undo-delete-toast");
    };

    toast.custom(() => <UndoToast onUndo={handleUndo} />, {
      duration: 5000,
      id: "undo-delete-toast"
    });

    deleteTimeoutRef.current = setTimeout(async () => {
      if (pendingDeleteIdRef.current === taskId) {
        await apiDeleteTask(user.id, taskId);
        pendingDeleteIdRef.current = null;
        deleteTimeoutRef.current = null;
      }
    }, 5000);

    return { data: undefined };
  };

  const toggleComplete = async (taskId: number): Promise<ApiResponse<Task>> => {
    if (!user?.id) return { error: "User not authenticated" };

    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed, updated_at: new Date().toISOString() } : t
    ));

    const response = await apiToggleComplete(user.id, taskId);
    
    if (response.error) {
      setError(response.error);
      setTasks(previousTasks);
      return response;
    }

    const updatedTask = (response.data as any)?.item ?? response.data;
    setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    return { data: updatedTask };
  };

  const togglePin = async (taskId: number): Promise<ApiResponse<Task>> => {
    if (!user?.id) return { error: "User not authenticated" };

    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, is_pinned: !t.is_pinned, updated_at: new Date().toISOString() } : t
    ));

    const response = await apiTogglePin(user.id, taskId);
    
    if (response.error) {
      setError(response.error);
      setTasks(previousTasks);
      return response;
    }

    const updatedTask = (response.data as any)?.item ?? response.data;
    setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    return { data: updatedTask };
  };

  return {
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
    refreshTasks: fetchTasks,
  };
};
