import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardPage from "./page";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";

vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/hooks/useTasks", () => ({
  useTasks: vi.fn(),
}));

vi.mock("@/components/layout/Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock("@/components/tasks/TaskList", () => ({
  TaskList: () => <div data-testid="task-list">TaskList</div>,
}));

vi.mock("@/components/auth/ProtectedRoute", () => ({
  ProtectedRoute: ({ children }: { children: any }) => <div data-testid="protected-route">{children}</div>,
}));

describe("Dashboard Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as any).mockReturnValue({ user: { id: "1" }, loading: false });
    (useTasks as any).mockReturnValue({
      tasks: [],
      loading: false,
      addTask: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
    });
  });

  it("should render Navbar", () => {
    render(<DashboardPage />);
    expect(screen.getByTestId("navbar")).toBeDefined();
  });

  it("should render TaskList", () => {
    render(<DashboardPage />);
    expect(screen.getByTestId("task-list")).toBeDefined();
  });

  it("should render 'Add Task' button", () => {
    render(<DashboardPage />);
    expect(screen.getByRole("button", { name: /add task/i })).toBeDefined();
  });

  it("should open TaskModal when 'Add Task' clicked", () => {
    render(<DashboardPage />);
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    // Since Dialog is often portal-ed and mocked components might behave differently,
    // we check for the text inside the Modal.
    expect(screen.getByText(/fill in the details/i)).toBeDefined();
  });
});
