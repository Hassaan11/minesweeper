import React from 'react';

interface CellProps {
  cell: {
    revealed: boolean;
  };
  reveal: () => void;
}

const Cell: React.FC<CellProps> = ({ cell, reveal }) => {
  return (
    <div
      className={`w-10 h-10 flex justify-center items-center bg-gray-400 border border-gray-700 cursor-pointer ${cell.revealed ? '!bg-white' : ''
        }`}
      onClick={reveal}
    >
    </div>
  );
};

export default Cell;
