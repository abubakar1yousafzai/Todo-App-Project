import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

describe("DeleteConfirmDialog Component", () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render confirmation message", () => {
    render(
      <DeleteConfirmDialog
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );
    expect(screen.getByText(/are you sure you want to delete/i)).toBeDefined();
  });

  it("should call onConfirm when Confirm clicked", () => {
    render(
      <DeleteConfirmDialog
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /delete task/i }));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("should call onCancel when Cancel clicked", () => {
    render(
      <DeleteConfirmDialog
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should not be visible when isOpen is false", () => {
    const { queryByText } = render(
      <DeleteConfirmDialog
        isOpen={false}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );
    expect(queryByText(/are you sure you want to delete/i)).toBeNull();
  });
});
