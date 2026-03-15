import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from './page';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';

vi.mock('@/components/auth/AuthForm', () => ({
  AuthForm: ({ type }: { type: string }) => <div data-testid="auth-form">{type}</div>,
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: any, href: string }) => <a href={href}>{children}</a>,
}));

describe('Login Page', () => {
  const mockRouter = { push: vi.fn() };
  const mockSearchParams = { get: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue(mockRouter);
    (useSearchParams as any).mockReturnValue(mockSearchParams);
  });

  it('should render AuthForm with type="login"', () => {
    (useAuth as any).mockReturnValue({ user: null, loading: false });
    mockSearchParams.get.mockReturnValue(null);
    
    render(<LoginPage />);
    const form = screen.getByTestId('auth-form');
    expect(form.textContent).toBe('login');
  });

  it('should redirect authenticated user to /dashboard', () => {
    (useAuth as any).mockReturnValue({ user: { id: '1' }, loading: false });
    render(<LoginPage />);
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
  });

  it('should show loading state', () => {
    (useAuth as any).mockReturnValue({ user: null, loading: true });
    render(<LoginPage />);
    expect(screen.getByText(/loading/i)).toBeDefined();
  });

  it('should display success message from URL', () => {
    (useAuth as any).mockReturnValue({ user: null, loading: false });
    mockSearchParams.get.mockReturnValue("Account created successfully");
    
    render(<LoginPage />);
    expect(screen.getByText(/account created! please sign in/i)).toBeDefined();
  });
});
