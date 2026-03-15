import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTasks, createTask, updateTask, deleteTask, toggleComplete } from './api';
import { getToken } from './auth';

vi.mock('./auth', () => ({
  getToken: vi.fn(),
}));

describe('API Client', () => {
  const userId = 'user-123';
  const mockTask = { id: 1, title: 'Test Task', completed: false };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    (getToken as any).mockResolvedValue('mock-token');
  });

  it('should call GET /api/{userId}/tasks with correct userId', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([mockTask]),
    });

    const response = await getTasks(userId);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/api/${userId}/tasks`),
      expect.any(Object)
    );
    expect(response.data).toEqual([mockTask]);
  });

  it('should attach Authorization Bearer token to every request', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await getTasks(userId);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.any(Headers),
      })
    );
    const callHeaders = (global.fetch as any).mock.calls[0][1].headers;
    expect(callHeaders.get('Authorization')).toBe('Bearer mock-token');
  });

  it('should call POST /api/{userId}/tasks with correct body', async () => {
    const taskData = { title: 'New Task' };
    (global.fetch as any).mockResolvedValue({
      ok: true,
      status: 201,
      json: () => Promise.resolve({ ...mockTask, ...taskData }),
    });

    await createTask(userId, taskData);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/api/${userId}/tasks`),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(taskData),
      })
    );
  });

  it('should call PUT /api/{userId}/tasks/{taskId} with correct body', async () => {
    const taskId = 1;
    const taskData = { title: 'Updated Task' };
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ...mockTask, ...taskData }),
    });

    await updateTask(userId, taskId, taskData);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/api/${userId}/tasks/${taskId}`),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(taskData),
      })
    );
  });

  it('should call DELETE /api/{userId}/tasks/{taskId}', async () => {
    const taskId = 1;
    (global.fetch as any).mockResolvedValue({
      ok: true,
      status: 204,
    });

    await deleteTask(userId, taskId);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/api/${userId}/tasks/${taskId}`),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });

  it('should call PATCH /api/{userId}/tasks/{taskId}/complete', async () => {
    const taskId = 1;
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ...mockTask, completed: true }),
    });

    await toggleComplete(userId, taskId);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/api/${userId}/tasks/${taskId}/complete`),
      expect.objectContaining({
        method: 'PATCH',
      })
    );
  });

  it('should return ApiResponse with error when API returns 401', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 401,
    });

    const response = await getTasks(userId);
    expect(response.error).toBe('Unauthorized');
  });

  it('should return ApiResponse with error when network fails', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Network error'));

    const response = await getTasks(userId);
    expect(response.error).toBe('Something went wrong, please check your connection');
  });
});
