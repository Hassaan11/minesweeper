import React from 'react';

import { CellProps } from '../types';

const Cell: React.FC<CellProps> = ({ cell, reveal }) => {
  return (
    <div
      className={`w-10 h-10 flex justify-center items-center bg-gray-900 border border-gray-700 ${cell.revealed ? '!bg-white' : ''
        }`}
      data-testid='cells'
      onClick={reveal}
    >
      {cell.revealed && (cell.mine ? '💣' : cell.neighbors || '')}
    </div>
  );
};

export default Cell;
