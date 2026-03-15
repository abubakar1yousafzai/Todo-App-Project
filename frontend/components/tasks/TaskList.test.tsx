import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskList } from "./TaskList";

describe("TaskList Component", () => {
  const mockOnToggle = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const mockTasks = [
    { id: 1, title: "Task 1", completed: false, user_id: "1", created_at: "", updated_at: "" },
    { id: 2, title: "Task 2", completed: true, user_id: "1", created_at: "", updated_at: "" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render TaskCard for each task", () => {
    render(
      <TaskList 
        tasks={mockTasks} 
        loading={false} 
        error={null} 
        onToggle={mockOnToggle}
        onEditTask={mockOnEdit} 
        onDeleteTask={mockOnDelete} 
      />
    );
    expect(screen.getByText("Task 1")).toBeDefined();
    expect(screen.getByText("Task 2")).toBeDefined();
  });

  it("should show 'No tasks yet' when empty", () => {
    render(
      <TaskList 
        tasks={[]} 
        loading={false} 
        error={null} 
        onToggle={mockOnToggle}
        onEditTask={mockOnEdit} 
        onDeleteTask={mockOnDelete} 
      />
    );
    expect(screen.getByText(/no tasks yet/i)).toBeDefined();
  });

  it("should show loading skeleton when loading", () => {
    const { container } = render(
      <TaskList 
        tasks={[]} 
        loading={true} 
        error={null} 
        onToggle={mockOnToggle}
        onEditTask={mockOnEdit} 
        onDeleteTask={mockOnDelete} 
      />
    );
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
