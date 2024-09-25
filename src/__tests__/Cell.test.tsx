import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import Cell from '../components/cell';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('Cell Component', () => {
  afterEach(() => {
    cleanup();
  })
  it('renders without crashing', () => {
    render(<Cell cell={{ mine: false, revealed: false, neighbors: 0 }} reveal={() => { }} />);
    expect(screen.queryAllByTestId("cells")).not.toBeNull();
  });

  it('calls reveal function when clicked', async () => {
    const revealMock = vi.fn();
    render(<Cell cell={{ mine: false, revealed: false, neighbors: 0 }} reveal={revealMock} />);
    await act(() => fireEvent.click(screen.queryAllByTestId("cells")[0]))
    expect(revealMock).toHaveBeenCalled();
  });

  it('displays mine icon when revealed and mine is true', () => {
    render(<Cell cell={{ mine: true, revealed: true, neighbors: 0 }} reveal={() => { }} />);
    expect(screen.getByText('💣')).not.toBeNull();
  });

  it('displays the number of neighbors when clicked', () => {
    render(<Cell cell={{ mine: false, revealed: true, neighbors: 2 }} reveal={() => { }} />);
    expect(screen.getByText('2')).not.toBeNull();
  });
});
