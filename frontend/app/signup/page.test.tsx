import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SignupPage from './page';

vi.mock('@/components/auth/AuthForm', () => ({
  AuthForm: ({ type }: { type: string }) => <div data-testid="auth-form">{type}</div>,
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: any, href: string }) => <a href={href}>{children}</a>,
}));

describe('Signup Page', () => {
  it('should render AuthForm with type="signup"', () => {
    render(<SignupPage />);
    const form = screen.getByTestId('auth-form');
    expect(form.textContent).toBe('signup');
  });

  it('should render link to login page', () => {
    render(<SignupPage />);
    const link = screen.getByRole('link', { name: /log in/i });
    expect(link.getAttribute('href')).toBe('/login');
  });
});
