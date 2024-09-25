import React, { useState, useEffect } from 'react';
import Cell from './cell';

interface CellType {
  revealed: boolean;
}

interface BoardProps {
  width: number;
  height: number;
  numMines: number;
}

const generateEmptyBoard = (width: number, height: number): CellType[][] => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      revealed: false,
    }))
  );
};

const Board: React.FC<BoardProps> = ({ width, height, numMines }) => {
  const [board, setBoard] = useState<CellType[][]>([]);

  useEffect(() => {
    initializeBoard();
  }, [width, height, numMines]);

  const initializeBoard = () => {
    const newBoard = generateEmptyBoard(width, height);
    setBoard(newBoard);
  };

  const revealCell = (x: number, y: number) => {
    if (board[x][y].revealed) return;

    const newBoard = [...board];
    const cell = newBoard[x][y];
    cell.revealed = true;

    setBoard(newBoard);
  };

  return (
    <div>
      {board.map((row, x) => (
        <div key={x} className="flex">
          {row.map((cell, y) => (
            <Cell key={y} cell={cell} reveal={() => revealCell(x, y)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
