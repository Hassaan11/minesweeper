import React, { useState, useEffect } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

import { BoardProps, CellType } from '../types';
import { useUpdateContext } from '../context/UpdateContext';
import Cell from './cell';
import Timer from './timer';
import { initializeAndFillBoard, revealAllMines } from '../utils';

const Board: React.FC<BoardProps> = ({ width, height, numMines }) => {
  const { update, setUpdate } = useUpdateContext();

  const [board, setBoard] = useState<CellType[][]>([]);
  const [gameStatus, setGameStatus] = useState<{ over: boolean; won: boolean }>(
    { over: false, won: false }
  );
  const [timer, setTimer] = useState<{ running: boolean; reset: boolean }>({
    running: false,
    reset: false,
  });

  useEffect(() => {
    initializeBoard();
  }, [width, height, numMines]);

  // Function to initialize the board
  const initializeBoard = () => {
    const newBoard = initializeAndFillBoard(width, height, numMines);
    setBoard(newBoard);
    setGameStatus({ over: false, won: false });
    setTimer({ running: true, reset: !timer.reset });
  };

  // Recursive function to reveal empty cells and their neighbors
  const revealEmptyCells = (board: CellType[][], row: number, col: number) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (
          newRow >= 0 &&
          newRow < width &&
          newCol >= 0 &&
          newCol < height &&
          !board[newRow][newCol].revealed
        ) {
          board[newRow][newCol].revealed = true;
          if (board[newRow][newCol].neighbors === 0) {
            revealEmptyCells(board, newRow, newCol);
          }
        }
      }
    }
  };

  // Function to count how many non-mine, unrevealed cells are left
  const countNonMineUnrevealedCells = (board: CellType[][]) => {
    let count = 0;
    board.forEach(row => {
      row.forEach(cell => {
        if (!cell.revealed && !cell.mine) {
          count++;
        }
      });
    });
    return count;
  };

  // Function to reveal a cell when clicked
  const revealCell = (x: number, y: number) => {
    if (gameStatus.over || board[x][y].revealed) return;

    const newBoard = [...board];
    const cell = newBoard[x][y];
    cell.revealed = true;

    // If the clicked cell is a mine, the game ends
    if (cell.mine) {
      endGame(newBoard, false);
    } else {
      if (newBoard[x][y].neighbors === 0) {
        revealEmptyCells(newBoard, x, y);
      }

      // If all non-mine cells are revealed, the player wins
      const cellsLeft = countNonMineUnrevealedCells(newBoard);
      if (cellsLeft === 0) {
        endGame(newBoard, true);
      }
    }
    setBoard(newBoard);
  };

  // Function to handle the end of the game
  const endGame = (newBoard: CellType[][], won: boolean) => {
    if (!won) {
      revealAllMines(newBoard);
      toast.error(`You Lost! You hit a mine!`);
    } else {
      toast.success(`Congratulations! You've Won!`);
    }
    setGameStatus({ over: true, won });

    let record: { games: number; won: number } = JSON.parse(localStorage.getItem('record') || '{}');
    if (Object.keys(record).length > 0) {
      record.games += 1;
    } else {
      record = { games: 1, won: 0 };
    }
    if (won) record.won += 1;

    localStorage.setItem('record', JSON.stringify(record));
    setTimer((prev) => ({ ...prev, running: false }));
    setUpdate(!update);
  };

  return (
    <Box
      className="mx-auto flex flex-col items-center p-6 my-8 bg-white rounded-xl shadow-2xl"
      component="section"
      sx={{
        background: 'linear-gradient(135deg, #e3f2fd, #f1f8e9)',
        border: '1px solid #ccc',
        minWidth: '350px',
        boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
      }}
    >
      {/* Timer and reset button */}
      <div className="flex justify-between items-center w-full mb-6">
        <div className="text-2xl font-semibold text-gray-700">
          <Timer isRunning={timer.running} reset={timer.reset} />
        </div>
        <RestartAltIcon
          onClick={initializeBoard}
          className="cursor-pointer text-4xl text-gray-500 hover:text-gray-700 transition-all duration-200 transform hover:scale-110"
        />
      </div>

      {/* Render the game board with cells */}
      {board.map((row, x) => (
        <div key={x} className="flex">
          {row.map((cell, y) => (
            <div key={`${x}-${y}`} className="m-1 transition-all hover:scale-105">
              <Cell key={`${x}-${y}`} cell={cell} reveal={() => revealCell(x, y)} />
            </div>
          ))}
        </div>
      ))}
    </Box>
  );
};

export default Board;
