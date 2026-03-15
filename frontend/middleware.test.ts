import { describe, it, expect, vi, beforeEach } from 'vitest';
import middleware from './middleware';
import { NextResponse, NextRequest } from 'next/server';
import { authClient } from '@/lib/auth';

vi.mock('next/server', () => ({
  NextResponse: {
    next: vi.fn(() => ({ type: 'next' })),
    redirect: vi.fn((url) => ({ type: 'redirect', url })),
  },
}));

vi.mock('@/lib/auth', () => ({
  authClient: {
    getSession: vi.fn(),
  },
}));

describe('Auth Middleware', () => {
  const createRequest = (path: string) => {
    return {
      nextUrl: { pathname: path },
      url: `http://localhost:3000${path}`,
      headers: { get: vi.fn() },
    } as unknown as NextRequest;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should allow authenticated user to access /dashboard', async () => {
    (authClient.getSession as any).mockResolvedValue({ data: { user: {} } });
    const req = createRequest('/dashboard');
    
    const res = await middleware(req);
    expect(res).toEqual({ type: 'next' });
  });

  it('should redirect unauthenticated user to /login', async () => {
    (authClient.getSession as any).mockResolvedValue({ data: null });
    const req = createRequest('/dashboard');
    
    const res = await middleware(req);
    expect(res).toMatchObject({ type: 'redirect' });
    expect((res as any).url.toString()).toContain('/login');
  });

  it('should allow access to /login and /signup without session', async () => {
    (authClient.getSession as any).mockResolvedValue({ data: null });
    const req = createRequest('/login');
    
    const res = await middleware(req);
    expect(res).toEqual({ type: 'next' });
  });

  it('should redirect authenticated user away from /login', async () => {
    (authClient.getSession as any).mockResolvedValue({ data: { user: {} } });
    const req = createRequest('/login');
    
    const res = await middleware(req);
    expect(res).toMatchObject({ type: 'redirect' });
    expect((res as any).url.toString()).toContain('/dashboard');
  });
});
