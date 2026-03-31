export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Task {
  id: number;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  due_date: string | null;
  priority: "high" | "medium" | "low";
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
  due_date?: string | null;
  priority?: "high" | "medium" | "low";
  is_pinned?: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
