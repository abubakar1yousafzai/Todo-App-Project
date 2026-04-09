import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskCard } from "./TaskCard";
import { Task } from "@/types";

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
  const mockOnToggle = vi.fn();
  const mockOnTogglePin = vi.fn();

  it("should render task title", () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onTogglePin={mockOnTogglePin}
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
        onToggle={mockOnToggle}
        onTogglePin={mockOnTogglePin}
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
        onToggle={mockOnToggle}
        onTogglePin={mockOnTogglePin}
      />
    );
    const title = screen.getByText("Test Task");
    expect(title.className).toContain("line-through");
  });

  it("should call onToggle with task id when custom checkbox clicked", () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onTogglePin={mockOnTogglePin}
      />
    );
    const toggleBtn = screen.getByTestId("task-toggle");
    fireEvent.click(toggleBtn);
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it("should call onEdit with task when title area clicked", () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onTogglePin={mockOnTogglePin}
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
        onToggle={mockOnToggle}
        onTogglePin={mockOnTogglePin}
      />
    );
    fireEvent.click(screen.getByTestId("task-delete"));
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
