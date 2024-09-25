# Minesweeper Game

## Overview
This project is an implementation of the classic Minesweeper game, developed using React with TypeScript. It is a basic web game that features a customizable grid, allowing players to specify the width, height, and number of mines. The game effectively manages fundamental gameplay logic, including win and loss conditions, as well as a timer.

## Core Project Files
- **Homepage.js**: Serves as the landing page where users can input the parameters for the game board.
- **Board.js**: Manages the rendering of the game board, processes cell click events, and tracks the game status (win/lose).
- **Cell.js**: Represents individual cells on the game board, rendering them according to their current state.
- **Timer.js**: Displays the game timer and handles time tracking.
- **Navbar.js**: Provides navigation and displays game statistics.

### Key Functions

1. **`generateEmptyBoard(width: number, height: number): CellType[][]`**
   - **Purpose**: Initializes a blank board of specified dimensions without any mines or neighbor counts.
   - **Implementation**: Utilizes `Array.from` to create a 2D array, where each cell is an object containing `mine`, `revealed`, and `neighbors` properties.


   ```typescript
   export const generateEmptyBoard = (width: number, height: number): CellType[][] => {
     return Array.from({ length: height }, () =>
       Array.from({ length: width }, () => ({
         mine: false,
         revealed: false,
         neighbors: 0,
       }))
     );
   };
   ```

2. **`placeMines(board: CellType[][], numMines: number, width: number, height: number)`**
   - **Purpose**: Randomly places a specified number of mines on the board.
   - **Implementation**:Continuously selects random coordinates and places a mine if the cell is empty, ensuring that the number of placed mines matches `numMines`.


   ```typescript
   export const placeMines = (board: CellType[][], numMines: number, width: number, height: number) => {
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
   ```

3. **`countNeighbors(board: CellType[][], x: number, y: number): number`**
   - **Purpose**: Counts the number of mines surrounding a specific cell.
   - **Implementation**:Utilizes predefined directions to iterate through neighboring cells and count how many contain mines.


   ```typescript
   export const countNeighbors = (board: CellType[][], x: number, y: number): number => {
      return direction.DIRECTIONS.reduce((count, [dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        return count + (board[newX]?.[newY]?.mine ? 1 : 0);
      }, 0);
    };
   ```

4. **`calculateNeighbors(board: CellType[][])`**
   - **Purpose**: Updates the `neighbors` property for each cell that does not contain a mine.
   - **Implementation**:Iterates through each cell and calls countNeighbors to set the appropriate count.


   ```typescript
   export const calculateNeighbors = (board: CellType[][]) => {
      board.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (!cell.mine) {
            cell.neighbors = countNeighbors(board, i, j);
          }
        });
      });
    };
   ```

## Code Optimization

### Initial Implementation
Initially, the application used props drilling to pass data through multiple component layers. The entire board generation logic and UI rendering were handled directly in `App.tsx`, making the component cluttered and challenging to manage. 

### Optimized Implementation
I optimized the application's structure by implementing the Context API to manage global state, reducing the need for props drilling. Additionally, I added React Router for better navigation, allowing different components to manage their own views and states independently. This led to a cleaner and more maintainable codebase:
- **Context API**: Centralizes state management, making data accessible throughout the component tree without passing props explicitly.
- **React Router**: Enables seamless navigation between different parts of the application, enhancing user experience.

### Impact of the Change
- **Improved Maintainability**: The refactor simplified the code structure, making it easier to manage and understand.
- **Enhanced User Experience**: The introduction of routing provided a more fluid navigation experience, allowing users to interact with different views without reloading the entire application.

## Further Improvements
To enhance the Minesweeper game further, I plan to implement the following features:

1. **Redux for State Management**: 
   - Introduce Redux to handle more complex state management needs, particularly for managing game state across different components.
   - This will allow for a more predictable state structure and easier debugging.

2. **Flag Cell Feature**:
   - Add functionality that allows players to flag cells they suspect contain mines. This feature will enhance gameplay strategy and provide visual feedback.

3. **Enhanced UI/UX**:
   - Improve the visual design of the game with better graphics and animations, making it more engaging for players.

## Preliminary Requirements
Ensure you have the following installed to run the project:
1. **Node.js**: Version 16 or later recommended. Download from [Node.js official website](https://nodejs.org/).
2. **npm or yarn**: Manage dependencies through npm (included with Node.js) or yarn.

Check installation:
```bash
node -v
npm -v
```

If you don't have Node.js installed, follow the [Node.js download and installation guide](https://nodejs.org/).

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Hassaan11/minesweeper.git
   ```
2. Navigate to the project directory:
   ```bash
   cd minesweeper
   ```
3. Install the project dependencies:
   ```bash
   npm install
   ```
4. Start the game:
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173/` to play the game. It can be changed if this post is already being used.

6. Run Test cases:
   ```bash
   npm test
   ```