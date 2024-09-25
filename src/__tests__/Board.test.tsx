import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Board from '../components/board';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { toast } from 'react-toastify';

vi.mock('react-toastify', async () => {
  const actual = await vi.importActual('react-toastify');
  return {
    ...actual,
    toast: {
      error: vi.fn(),  // Mock toast.error
      success: vi.fn(), // Mock toast.success
    },
  };
});


describe('Board Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();  // Restore mocks after each test
  });
  it('renders the board with cells', () => {
    render(<Board name="bot" width={5} height={5} numMines={3} />);
    const cells = screen.queryAllByTestId("cells");
    expect(cells.length).toBe(25);
  });

  it('reveals a cell when clicked', () => {
    render(<Board name="bot" width={3} height={3} numMines={1} />);
    const firstCell = screen.queryAllByTestId("cells")[0];
    fireEvent.click(firstCell);
    expect(firstCell.getAttribute("class")).toContain('bg-white')

  });

  it('shows "You Won!" when all non-mine cells are revealed', () => {
    render(<Board name="bot" width={3} height={3} numMines={0} />);
    const cells = screen.queryAllByTestId("cells");
    cells.forEach((cell) => fireEvent.click(cell));
    expect(toast.success).toHaveBeenCalledWith("Congratulations! You've Won!");
  });

  it('shows "You Lose!" when a mine is revealed', async () => {
    render(<Board name="bot" width={3} height={3} numMines={9} />);
    const cells = screen.queryAllByTestId("cells");
    cells.forEach((cell) => fireEvent.click(cell));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Game Over! You hit a mine!");
    });
  });
});
