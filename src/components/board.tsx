import React, { useState, useEffect } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

import { BoardProps, CellType } from '../types';
import { useUpdateContext } from '../context/UpdateContext';
import Cell from './cell';
import Timer from './timer';
import { generateEmptyBoard, placeMines, calculateNeighbors, revealAllMines } from '../utils';

const Board: React.FC<BoardProps> = ({ width, height, numMines }) => {
  const { update, setUpdate } = useUpdateContext();

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
    setTimer({ running: true, reset: !timer.reset });
  };

  // Function to reveal a cell when clicked
  const revealCell = (x: number, y: number) => {
    // If the game is over or the cell is already revealed, do nothing
    if (gameStatus.over || board[x][y].revealed) return;

    const newBoard = [...board];
    const cell = newBoard[x][y];
    cell.revealed = true;

    // If the clicked cell is a mine, the game ends
    if (cell.mine) {
      endGame(newBoard, false);
    } else {
      setCellsLeft((prev) => prev - 1);

      // If no more non-mine cells are left, the player wins
      if (cellsLeft - 1 === 0) {
        endGame(newBoard, true);
      }
    }
    setBoard(newBoard);
  };

  // Function to handle end of the game
  const endGame = (newBoard: CellType[][], won: boolean) => {
    // If the game is lost, reveal all mines and show a toast notification
    if (!won) {
      revealAllMines(newBoard)
      toast.error(`You Lost! You hit a mine!`);
    };
    setGameStatus({ over: true, won });

    // Retrieve the game record from localStorage or initialize a new one
    let record: { games: number; won: number } = JSON.parse(localStorage.getItem('record') || '{}');
    if (Object.keys(record).length > 0) {
      record.games += 1;
    } else {
      record = { games: 1, won: 0 }
    }

    // If the player wins, increment the win count and show a success toast
    if (won) {
      record.won += 1;
      toast.success(`Congratulations! You've Won!`);
    }

    // Save the updated game record in localStorage and stop the timer
    localStorage.setItem('record', JSON.stringify(record));
    setTimer((prev) => ({ ...prev, running: false }));
    setUpdate(!update)
  };

  return (
    <Box
      className="border border-gray-800 mx-auto flex flex-col my-8"
      sx={{ p: 2, m: 2 }}
      component="section"
    >
      {/* Timer and reset button */}
      <div className="flex justify-between w-full mb-4">
        <Timer isRunning={timer.running} reset={timer.reset} />
        <RestartAltIcon onClick={initializeBoard} className="cursor-pointer" />
      </div>

      {/* Render the game board with cells */}
      {board.map((row, x) => (
        <div key={x} className="flex">
          {row.map((cell, y) => (
            <div className="m-2" key={`${x} ${y}`}>
              <Cell key={y} cell={cell} reveal={() => revealCell(x, y)} />
            </div>
          ))}
        </div>
      ))}
    </Box>
  );
};

export default Board;
