import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import { vi, describe, beforeEach, it, afterEach, expect } from 'vitest';
import { toast } from 'react-toastify';

vi.mock("react-toastify", async () => {
  const actual = await vi.importActual("react-toastify");
  return {
    ...actual,
    toast: {
      error: vi.fn(),
    },
  };
});

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  })
  it('shows an alert when submitting an empty form', () => {
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(toast.error).toHaveBeenCalledWith("Height and Width must be between 2 and 50!");
  })

  it('displays the board when the form is filled correctly', async () => {
    fireEvent.change(screen.getByLabelText(/Height/i), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText(/Width/i), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText(/Mines/i), {
      target: { value: '10' },
    });

    fireEvent.click(screen.getByRole('button', { name: /start/i }));

  });
});