import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';
import { authClient, getCurrentUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

vi.mock('@/lib/auth', () => ({
  authClient: {
    signIn: {
      email: vi.fn(),
    },
    signOut: vi.fn(),
  },
  getCurrentUser: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('useAuth Hook', () => {
  const mockRouter = { push: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue(mockRouter);
  });

  it('should return user when session exists', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    (getCurrentUser as any).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth());

    // Wait for useEffect
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it('should return null when no session', async () => {
    (getCurrentUser as any).mockResolvedValue(null);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should set loading true while fetching session', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    (getCurrentUser as any).mockReturnValue(promise);

    const { result } = renderHook(() => useAuth());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolvePromise!({ id: '1' });
    });
  });

  it('should redirect to /login when logout() called', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(authClient.signOut).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
    expect(result.current.user).toBeNull();
  });

  it('should redirect to /dashboard on successful login', async () => {
    (authClient.signIn.email as any).mockResolvedValue({ data: {}, error: null });
    (getCurrentUser as any).mockResolvedValue({ id: '1' });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('test@example.com', 'Password123');
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
  });

  it('should return error message on invalid credentials', async () => {
    (authClient.signIn.email as any).mockResolvedValue({ 
      data: null, 
      error: { message: 'Invalid email or password' } 
    });

    const { result } = renderHook(() => useAuth());

    let error;
    await act(async () => {
      error = await result.current.login('wrong@example.com', 'wrong');
    });

    expect(error).toBe('Invalid email or password');
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
