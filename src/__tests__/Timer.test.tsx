import { render, screen, act, cleanup } from '@testing-library/react';
import Timer from '../components/timer';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('Timer Component', () => {
  afterEach(() => {
    cleanup();
  })
  it('starts at 0 seconds', () => {
    render(<Timer isRunning={false} reset={false} />);
    expect(screen.getByText(/Timer: 0/i)).not.toBeNull();
  });

  it('increments time when running', () => {
    vi.useFakeTimers();
    render(<Timer isRunning={true} reset={false} />);
    act(() => {
      vi.advanceTimersByTime(3000); // advance time by 3 seconds
    });
    expect(screen.getByText(/Timer: 3/i)).not.toBeNull();
    vi.useRealTimers();
  });

  it('resets timer when reset prop is true', () => {
    vi.useFakeTimers();
    const { rerender } = render(<Timer isRunning={true} reset={false} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    rerender(<Timer isRunning={false} reset={true} />);
    expect(screen.getByText(/Timer: 0/i)).not.toBeNull();
  });
});
