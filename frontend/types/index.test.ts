import { describe, it, expect } from 'vitest';
import { User, Task, TaskFormData, ApiResponse } from './index';

describe('TypeScript Interfaces', () => {
  it('should ensure User interface has required fields', () => {
    const user: User = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User'
    };
    expect(user.id).toBe('1');
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');
  });

  it('should ensure Task interface has required fields', () => {
    const task: Task = {
      id: 1,
      user_id: 'user-1',
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
      created_at: '2026-03-06T00:00:00Z',
      updated_at: '2026-03-06T00:00:00Z'
    };
    expect(task.id).toBe(1);
    expect(task.user_id).toBe('user-1');
    expect(task.title).toBe('Test Task');
    expect(task.completed).toBe(false);
  });

  it('should ensure TaskFormData has required title and optional description', () => {
    const data: TaskFormData = {
      title: 'New Task'
    };
    expect(data.title).toBe('New Task');
    expect(data.description).toBeUndefined();
  });

  it('should ensure ApiResponse has optional data and optional error', () => {
    const success: ApiResponse<string> = {
      data: 'success'
    };
    const failure: ApiResponse<string> = {
      error: 'error'
    };
    expect(success.data).toBe('success');
    expect(failure.error).toBe('error');
  });
});
