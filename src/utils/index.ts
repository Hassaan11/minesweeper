import { CellType } from "../types";
import direction from '../constants/directions.json'

// Generates an empty board of the given width and height with cells initialized (no mines or neighbors)
export const generateEmptyBoard = (width: number, height: number): CellType[][] => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      mine: false,
      revealed: false,
      neighbors: 0,
    }))
  );
};

// Places a specified number of mines randomly on the board
export const placeMines = (
  board: CellType[][],
  numMines: number,
  width: number,
  height: number
) => {
  let placedMines = 0;
  while (placedMines < numMines) {
    const x = Math.floor(Math.random() * height);
    const y = Math.floor(Math.random() * width);

    // Only place the mine if the cell doesn't already contain one
    if (!board[x][y].mine) {
      board[x][y].mine = true;
      placedMines++;
    }
  }
};

// Counts the number of neighboring mines around a given cell
// x refers to Horizontal and y refers to Vertical
export const countNeighbors = (board: CellType[][], x: number, y: number): number => {
  return direction.DIRECTIONS.reduce((count, [dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    return count + (board[newX]?.[newY]?.mine ? 1 : 0);
  }, 0);
};

// Calculates the number of neighboring mines for each cell on the board
export const calculateNeighbors = (
  board: CellType[][],
) => {
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (!cell.mine) {
        cell.neighbors = countNeighbors(board, i, j);
      }
    });
  });
};

// Reveals all mines on the board when the game is over
export const revealAllMines = (board: CellType[][]) => {
  board.forEach((row) =>
    row.forEach((cell) => {
      if (cell.mine) cell.revealed = true;
    })
  );
};
