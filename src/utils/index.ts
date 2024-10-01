import { CellType } from "../types";
import direction from '../constants/directions.json'

// This function uses a shuffle-based approach for placing mines, and updates the count of neighboring mines for each cell immediately after mine placement.
export const initializeBoardEfficiently = (width: number, height: number, numMines: number): CellType[][] => {
  const size = width * height;

  // Create a flattened array for the board cells
  const cells = Array(size).fill(0).map(() => ({
    mine: false,
    revealed: false,
    neighbors: 0
  }));

  // Randomly shuffle the array, placing mines in the first `numMines` positions
  const indices = Array.from({ length: size }, (_, index) => index);
  for (let i = size - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Place mines in the first `numMines` cells
  for (let i = 0; i < numMines; i++) {
    const idx = indices[i];
    cells[idx].mine = true;

    // Calculate neighbors for each mine placed
    const x = Math.floor(idx / width);
    const y = idx % width;

    direction.DIRECTIONS.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
        cells[newX * width + newY].neighbors++;
      }
    });
  }

  // Reshape the 1D array back into a 2D array
  const board: CellType[][] = [];
  for (let i = 0; i < height; i++) {
    board.push(cells.slice(i * width, (i + 1) * width));
  }

  return board;
};

// Reveals all mines on the board when the game is over
export const revealAllMines = (board: CellType[][]) => {
  board.forEach((row) =>
    row.forEach((cell) => {
      if (cell.mine) cell.revealed = true;
    })
  );
};
