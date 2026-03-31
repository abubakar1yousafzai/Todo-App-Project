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

vi.mock("@/components/tasks/StatsCards", () => ({
  StatsCards: () => <div data-testid="stats-cards">StatsCards</div>,
}));

vi.mock("@/components/tasks/SearchBar", () => ({
  SearchBar: () => <div data-testid="search-bar">SearchBar</div>,
}));

vi.mock("@/components/tasks/FilterTabs", () => ({
  FilterTabs: () => <div data-testid="filter-tabs">FilterTabs</div>,
}));

vi.mock("@/components/tasks/AddTaskInput", () => ({
  AddTaskInput: ({ onAdd }: any) => (
    <button data-testid="add-task-input" onClick={() => onAdd({ title: "New" })}>
      Add Task Mock
    </button>
  ),
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
      filteredTasks: [],
      loading: false,
      addTask: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
      searchQuery: "",
      setSearchQuery: vi.fn(),
      activeFilter: "All",
      setActiveFilter: vi.fn(),
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

  it("should render StatsCards, SearchBar, and FilterTabs", () => {
    render(<DashboardPage />);
    expect(screen.getByTestId("stats-cards")).toBeDefined();
    expect(screen.getByTestId("search-bar")).toBeDefined();
    expect(screen.getByTestId("filter-tabs")).toBeDefined();
  });

  it("should render AddTaskInput", () => {
    render(<DashboardPage />);
    expect(screen.getByTestId("add-task-input")).toBeDefined();
  });
});
