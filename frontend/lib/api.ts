import { Task, TaskFormData, ApiResponse } from "@/types";
import { getToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Centralized fetch wrapper that automatically attaches the Better Auth
 * session token to the Authorization header.
 */
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = await getToken();
    const headers = new Headers(options.headers);
    
    // Attach JWT/Session Token to Authorization header
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    
    headers.set("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });

    // Handle session expiry or unauthorized access
    if (response.status === 401) {
      return { error: "Unauthorized" };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.message || "An unexpected error occurred" };
    }

    // Handle 204 No Content (e.g. DELETE)
    if (response.status === 204) {
      return { data: undefined as T };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("API Request Error:", error);
    return { error: "Something went wrong, please check your connection" };
  }
}

export const getTasks = async (userId: string): Promise<ApiResponse<Task[]>> => {
  return request<Task[]>(`/${userId}/tasks`);
};

export const createTask = async (
  userId: string,
  data: TaskFormData
): Promise<ApiResponse<Task>> => {
  return request<Task>(`/${userId}/tasks`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateTask = async (
  userId: string,
  taskId: number,
  data: TaskFormData
): Promise<ApiResponse<Task>> => {
  return request<Task>(`/${userId}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteTask = async (
  userId: string,
  taskId: number
): Promise<ApiResponse<void>> => {
  return request<void>(`/${userId}/tasks/${taskId}`, {
    method: "DELETE",
  });
};

export const toggleComplete = async (
  userId: string,
  taskId: number
): Promise<ApiResponse<Task>> => {
  return request<Task>(`/${userId}/tasks/${taskId}/complete`, {
    method: "PATCH",
  });
};
