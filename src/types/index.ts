export interface CellType {
  mine: boolean;
  revealed: boolean;
  neighbors: number;
}

export interface BoardProps {
  width: number;
  height: number;
  numMines: number;
}

export interface CellProps {
  cell: {
    mine: boolean;
    revealed: boolean;
    neighbors: number;
  };
  reveal: () => void;
}

export interface FormState {
  height: number;
  width: number;
  mines: number;
}