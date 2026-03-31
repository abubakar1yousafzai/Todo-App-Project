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
    expect(screen.getByLabelText(/task title/i)).toBeDefined();
    expect(screen.getByLabelText(/description/i)).toBeDefined();
  });

  it("should show 'Title is required' when title empty on submit", async () => {
    render(
      <TaskModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );
    fireEvent.click(screen.getByRole("button", { name: /create task/i }));
    expect(await screen.findByText(/title is required/i)).toBeDefined();
  });

  it("should call onSubmit with correct data", async () => {
    mockOnSubmit.mockResolvedValue({ data: {} });
    render(
      <TaskModal isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );
    
    fireEvent.change(screen.getByLabelText(/task title/i), { target: { value: "New Task" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Desc" } });
    
    fireEvent.click(screen.getByRole("button", { name: /create task/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "New Task",
        description: "Desc",
        due_date: null,
        priority: "medium",
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
    
    fireEvent.change(screen.getByLabelText(/task title/i), { target: { value: "Task" } });
    fireEvent.click(screen.getByRole("button", { name: /create task/i }));
    
    expect(screen.getByRole("button", { name: /saving/i })).toBeDefined();
  });

  it("should pre-fill title and description from initialData", () => {
    const initialData = { 
      title: "Edit Me", 
      description: "Old desc",
      priority: "medium" as const,
      due_date: null,
      is_pinned: false,
    };
    render(
      <TaskModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={initialData}
      />
    );
    expect(screen.getByLabelText(/task title/i).getAttribute("value")).toBe("Edit Me");
    expect(screen.getByLabelText(/description/i).textContent).toBe("Old desc");
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
    const initialData = { 
      title: "Edit Me", 
      description: "Old",
      priority: "medium" as const,
      due_date: null,
      is_pinned: false,
    };
    mockOnSubmit.mockResolvedValue({ data: {} });
    render(
      <TaskModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={initialData}
      />
    );
    
    fireEvent.change(screen.getByLabelText(/task title/i), { target: { value: "Updated Task" } });
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Updated Task",
        description: "Old",
        due_date: null,
        priority: "medium",
      });
    });
  });
});
