import { describe, it, expect, vi } from "vitest";
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
  };

  const mockOnToggle = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  it("should render task title and description", () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText("Test Task")).toBeDefined();
    expect(screen.getByText("Test Description")).toBeDefined();
  });

  it("should render completion toggle", () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByRole("checkbox")).toBeDefined();
  });

  it("should show strikethrough when task completed", () => {
    const completedTask = { ...mockTask, completed: true };
    render(
      <TaskCard
        task={completedTask}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    const title = screen.getByText("Test Task");
    expect(title.className).toContain("line-through");
  });

  it("should call onToggle with task id when toggle clicked", () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it("should call onEdit with task when edit clicked", () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    fireEvent.click(screen.getByTitle(/edit task/i));
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
  });

  it("should call onDelete with task id when delete clicked", () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    fireEvent.click(screen.getByTitle(/delete task/i));
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
