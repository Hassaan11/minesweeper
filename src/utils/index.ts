import { CellType } from "../types";
import direction from '../constants/directions.json'

export const generateEmptyBoard = (width: number, height: number): CellType[][] => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      mine: false,
      revealed: false,
      neighbors: 0,
    }))
  );
};

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
    if (!board[x][y].mine) {
      board[x][y].mine = true;
      placedMines++;
    }
  }
};

export const countNeighbors = (board: CellType[][], x: number, y: number): number => {
  return direction.DIRECTIONS.reduce((count, [dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    return count + (board[nx]?.[ny]?.mine ? 1 : 0);
  }, 0);
};

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


export const revealAllMines = (board: CellType[][]) => {
  board.forEach((row) =>
    row.forEach((cell) => {
      if (cell.mine) cell.revealed = true;
    })
  );
};
