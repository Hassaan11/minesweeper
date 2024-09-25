import React from 'react';

interface CellProps {
  cell: {
    mine: boolean;
    revealed: boolean;
    neighbors: number;
  };
  reveal: () => void;
}

const Cell: React.FC<CellProps> = ({ cell, reveal }) => {
  return (
    <div
      className={`w-10 h-10 flex justify-center items-center bg-gray-900 border border-gray-700 ${cell.revealed ? '!bg-white' : ''
        }`}
      onClick={reveal}
    >
      {cell.revealed && (cell.mine ? '💣' : cell.neighbors || '')}
    </div>
  );
};

export default Cell;
