import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskCard } from "./TaskCard";
import { Task } from "@/types";
import { useTasks } from "@/hooks/useTasks";

vi.mock("@/hooks/useTasks", () => ({
  useTasks: vi.fn(),
}));

describe("TaskCard Component", () => {
  const mockTask: Task = {
    id: 1,
    user_id: "user-1",
    title: "Test Task",
    description: "Test Description",
    completed: false,
    created_at: "",
    updated_at: "",
    priority: "medium",
    due_date: null,
    is_pinned: false,
  };

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const mockToggleComplete = vi.fn();
  const mockTogglePin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTasks as any).mockReturnValue({
      toggleComplete: mockToggleComplete,
      togglePin: mockTogglePin,
    });
  });

  it("should render task title", () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText("Test Task")).toBeDefined();
  });

  it("should render completion toggle button", () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByTestId("task-toggle")).toBeDefined();
  });

  it("should show strikethrough when task completed", () => {
    const completedTask = { ...mockTask, completed: true };
    render(
      <TaskCard
        task={completedTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    const title = screen.getByText("Test Task");
    expect(title.className).toContain("line-through");
  });

  it("should call toggleComplete with task id when custom checkbox clicked", () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    const toggleBtn = screen.getByTestId("task-toggle");
    fireEvent.click(toggleBtn);
    expect(mockToggleComplete).toHaveBeenCalledWith(1);
  });

  it("should call onEdit with task when title area clicked", () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /task: test task/i }));
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
  });

  it("should call onDelete with task id when delete clicked", () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    fireEvent.click(screen.getByTestId("task-delete"));
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
