import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { useAuth } from "@/hooks/useAuth";

vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("Navbar Component", () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as any).mockReturnValue({
      user: { email: "test@example.com" },
      logout: mockLogout,
    });
  });

  it("should render 'My Tasks' brand", () => {
    render(<Navbar />);
    expect(screen.getByText(/my tasks/i)).toBeDefined();
  });

  it("should render logout button", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /logout/i })).toBeDefined();
  });

  it("should call logout() when logout button clicked", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("should display current user email", () => {
    render(<Navbar />);
    expect(screen.getByText("test@example.com")).toBeDefined();
  });
});
