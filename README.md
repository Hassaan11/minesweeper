# Minesweeper Game

## Overview
This project is an implementation of the classic Minesweeper game, developed using React with TypeScript and powered by Vite for lightning-fast builds and a smooth development experience. The game features a customizable grid, allowing players to specify the width, height, and number of mines. It handles all fundamental gameplay logic, including win and loss conditions, as well as a built-in timer.

You can play the deployed version of the game [here](https://minesweeper-gamma-seven.vercel.app/).

## Technology Stack
- **Frontend**: React, TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest
- **Deployment**: Vercel

## Core Project Files
- **Homepage.js**: Serves as the landing page where users can input the parameters for the game board.
- **Board.js**: Manages the rendering of the game board, processes cell click events, and tracks the game status (win/lose).
- **Cell.js**: Represents individual cells on the game board, rendering them according to their current state.
- **Timer.js**: Displays the game timer and handles time tracking.
- **Navbar.js**: Provides navigation and displays game statistics.

### Key Functions

**`initializeAndFillBoard`**

- **Purpose**: Initializes a game board of specified dimensions, placing mines and calculating the number of neighboring mines for each cell.
  
- **Implementation**: 
   - Utilizes a shuffle-based approach to randomly place mines in the board.
   - It employs `Array.from` to create a 2D array of cells, where each cell is an object containing `mine`, `revealed`, and `neighbors` properties.
   - After placing the mines, it calculates the neighbor counts for each cell surrounding a mine using predefined directions from a JSON file.

   ```typescript
   export const initializeAndFillBoard = (width: number, height: number, numMines: number): CellType[][] => {
      const size = width * height;

      // Create a flattened array for the board cells
      const cells = Array(size).fill(0).map(() => ({
         mine: false,
         revealed: false,
         neighbors: 0
      }));

      // Randomly shuffle the array, placing mines in the first `numMines` positions
      const indices = Array.from({ length: size }, (_, index) => index);
      for (let i = size - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      // Place mines in the first `numMines` cells
      for (let i = 0; i < numMines; i++) {
         const idx = indices[i];
         cells[idx].mine = true;

         // Calculate neighbors for each mine placed
         const x = Math.floor(idx / width);
         const y = idx % width;

         direction.DIRECTIONS.forEach(([dx, dy]) => {
            const newX = x + dx;
            const newY = y + dy;
            if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
            cells[newX * width + newY].neighbors++;
            }
         });
      }

      // Reshape the 1D array back into a 2D array
      const board: CellType[][] = [];
      for (let i = 0; i < height; i++) {
         board.push(cells.slice(i * width, (i + 1) * width));
      }

      return board;
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