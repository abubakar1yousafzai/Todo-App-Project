import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AuthForm } from './AuthForm';
import { authClient } from '@/lib/auth';
import { useRouter } from 'next/navigation';

vi.mock('@/lib/auth', () => ({
  authClient: {
    signUp: { email: vi.fn() },
    signIn: { email: vi.fn() },
  },
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('AuthForm Component', () => {
  const mockRouter = { push: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue(mockRouter);
  });

  it('should render email and password fields', () => {
    render(<AuthForm type="login" />);
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
    expect(screen.getByLabelText(/password/i)).toBeDefined();
  });

  it('should show "Email is required" when email empty', async () => {
    render(<AuthForm type="login" />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/email is required/i)).toBeDefined();
  });

  it('should show "Invalid email format" when email wrong format', async () => {
    render(<AuthForm type="login" />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    await act(async () => {
      fireEvent.submit(screen.getByRole('form', { name: /auth-form/i }));
    });
    expect(await screen.findByText(/invalid email format/i)).toBeDefined();
  });

  it('should show "Password must be at least 8 characters"', async () => {
    render(<AuthForm type="login" />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/password must be at least 8 characters/i)).toBeDefined();
  });

  it('should show "Password must contain at least 1 uppercase letter"', async () => {
    render(<AuthForm type="login" />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/password must contain at least 1 uppercase letter/i)).toBeDefined();
  });

  it('should show "Password must contain at least 1 number"', async () => {
    render(<AuthForm type="login" />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/password must contain at least 1 number/i)).toBeDefined();
  });

  it('should show "Email already registered" on 409 (signup)', async () => {
    (authClient.signUp.email as any).mockResolvedValue({ 
      data: null, 
      error: { status: 409 } 
    });

    render(<AuthForm type="signup" />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'existing@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(await screen.findByText(/email already registered/i)).toBeDefined();
  });

  it('should show "Invalid email or password" on 401 (login)', async () => {
    (authClient.signIn.email as any).mockResolvedValue({ 
      data: null, 
      error: { status: 401 } 
    });

    render(<AuthForm type="login" />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/invalid email or password/i)).toBeDefined();
  });

  it('should disable submit button when loading', async () => {
    (authClient.signIn.email as any).mockReturnValue(new Promise(() => {})); // Never resolves

    render(<AuthForm type="login" />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByRole('button', { name: /processing/i })).toBeDisabled();
  });
});
