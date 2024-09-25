import React from 'react';
import { CellProps } from '../types';

const Cell: React.FC<CellProps> = ({ cell, reveal }) => {
  const numberColors = [
    '', 'text-blue-500', 'text-green-500', 'text-red-500', 'text-purple-500',
  ];

  return (
    <div
      className={`w-14 h-14 flex justify-center items-center bg-gray-900 border rounded-lg shadow-md transition-all duration-200
        ${cell.revealed
          ? 'bg-white text-gray-900 border-gray-400 shadow-inner'
          : 'bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800'
        } cursor-pointer hover:shadow-lg active:scale-95`}
      onClick={reveal}
      data-testid="cells"
    >
      {cell.revealed && (cell.mine ? '💣' :
        <span className={`${numberColors[cell.neighbors]} font-bold`}>
          {cell.neighbors > 0 ? cell.neighbors : ''}
        </span>
      )}
    </div>
  );
};

export default Cell;