import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TaskModal } from "./TaskModal";

describe("TaskModal Component", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render title and description inputs", () => {
    render(
      <TaskModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );
    expect(screen.getByLabelText(/title/i)).toBeDefined();
    expect(screen.getByLabelText(/description/i)).toBeDefined();
  });

  it("should show 'Title is required' when title empty on submit", async () => {
    render(
      <TaskModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );
    fireEvent.submit(screen.getByRole("form", { name: /task-form/i }));
    expect(await screen.findByText(/title is required/i)).toBeDefined();
  });

  it("should call onSubmit with correct data", async () => {
    mockOnSubmit.mockResolvedValue({ data: {} });
    render(
      <TaskModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "New Task" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Desc" } });
    
    fireEvent.submit(screen.getByRole("form", { name: /task-form/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "New Task",
        description: "Desc",
      });
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should close when Cancel clicked", () => {
    render(
      <TaskModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should show loading state on submit button", async () => {
    mockOnSubmit.mockReturnValue(new Promise(() => {})); // Never resolves
    render(
      <TaskModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Task" } });
    fireEvent.submit(screen.getByRole("form", { name: /task-form/i }));
    
    expect(screen.getByRole("button", { name: /saving/i })).toBeDefined();
  });

  it("should pre-fill title and description from initialData", () => {
    const initialData = { title: "Edit Me", description: "Old desc" };
    render(
      <TaskModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={initialData}
      />
    );
    expect(screen.getByLabelText(/title/i).getAttribute("value")).toBe("Edit Me");
    expect(screen.getByLabelText(/description/i).getAttribute("value")).toBe("Old desc");
  });

  it("should show 'Edit Task' title in edit mode", () => {
    const initialData = { title: "Edit Me" };
    render(
      <TaskModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={initialData}
      />
    );
    expect(screen.getByText(/edit task/i)).toBeDefined();
  });

  it("should call onSubmit with updated data", async () => {
    const initialData = { title: "Edit Me", description: "Old" };
    mockOnSubmit.mockResolvedValue({ data: {} });
    render(
      <TaskModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={initialData}
      />
    );
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Updated Task" } });
    fireEvent.submit(screen.getByRole("form", { name: /task-form/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Updated Task",
        description: "Old",
      });
    });
  });
});
