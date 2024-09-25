import React, { useState, useEffect } from 'react';
import Cell from './cell';
import Timer from './timer';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

interface CellType {
  mine: boolean;
  revealed: boolean;
  neighbors: number;
}

interface BoardProps {
  name: string;
  width: number;
  height: number;
  numMines: number;
}

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
];


const generateEmptyBoard = (width: number, height: number): CellType[][] => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      mine: false,
      revealed: false,
      neighbors: 0,
    }))
  );
};

const placeMines = (
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

const countNeighbors = (board: CellType[][], x: number, y: number): number => {
  return DIRECTIONS.reduce((count, [dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    return count + (board[nx]?.[ny]?.mine ? 1 : 0);
  }, 0);
};

const calculateNeighbors = (
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

const Board: React.FC<BoardProps> = ({ name, width, height, numMines }) => {
  const [board, setBoard] = useState<CellType[][]>([]);
  const [gameStatus, setGameStatus] = useState<{ over: boolean; won: boolean }>(
    { over: false, won: false }
  );
  const [cellsLeft, setCellsLeft] = useState<number>(
    width * height - numMines
  );
  const [timer, setTimer] = useState<{ running: boolean; reset: boolean }>({
    running: false,
    reset: false,
  });

  useEffect(() => {
    initializeBoard();
  }, [width, height, numMines]);

  const initializeBoard = () => {
    const newBoard = generateEmptyBoard(width, height);
    placeMines(newBoard, numMines, width, height);
    calculateNeighbors(newBoard);
    setBoard(newBoard);
    setGameStatus({ over: false, won: false });
    setCellsLeft(width * height - numMines);
    setTimer({ running: false, reset: true });
  };

  const revealCell = (x: number, y: number) => {
    if (gameStatus.over || board[x][y].revealed) return;

    const newBoard = [...board];
    const cell = newBoard[x][y];
    cell.revealed = true;

    if (cell.mine) {
      endGame(newBoard, false);
    } else {
      setCellsLeft((prev) => prev - 1);
      if (cellsLeft - 1 === 0) {
        endGame(newBoard, true);
      }
    }
    setBoard(newBoard);
  };

  const endGame = (newBoard: CellType[][], won: boolean) => {
    if (!won) {
      revealAllMines(newBoard)
      toast.error(`Game Over! You hit a mine!`);
    };
    setGameStatus({ over: true, won });
    const records: { name: string; games: number; won: number }[] = JSON.parse(localStorage.getItem('record') || '[]');
    const playerName = name || 'bot';
    const recordIndex = records.findIndex(record => record.name === playerName);
    if (recordIndex !== -1) {
      records[recordIndex].games += 1;
      if (won) {
        records[recordIndex].won += 1;
        toast.success(`Congratulations! You've Won!`);
      }
    } else {
      records.push({ name: playerName, games: 1, won: won ? 1 : 0 });
    }
    localStorage.setItem('record', JSON.stringify(records));
    setTimer((prev) => ({ ...prev, running: false }));
  };


  const revealAllMines = (board: CellType[][]) => {
    board.forEach((row) =>
      row.forEach((cell) => {
        if (cell.mine) cell.revealed = true;
      })
    );
  };

  return (
    <>
      {name && <h3>Hello {name}</h3>}
      <Box
        className="border border-gray-800 mx-auto flex flex-col my-8"
        sx={{ p: 2 }}
        component="section"
      >
        <div className="flex justify-between w-full mb-4">
          <Timer isRunning={timer.running} reset={timer.reset} />
          <RestartAltIcon onClick={initializeBoard} className="cursor-pointer" />
        </div>
        {board.map((row, x) => (
          <div key={x} className="flex">
            {row.map((cell, y) => (
              <Cell key={y} cell={cell} reveal={() => revealCell(x, y)} />
            ))}
          </div>
        ))}
      </Box>
    </>
  );
};

export default Board;
