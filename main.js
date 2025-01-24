document.addEventListener('DOMContentLoaded', () => {
    // Module/IIFE pattern for scoping
    function Game() {
        // Private variables/functions
        const init = () => { 
            initGrid(defaultGridSize);
            console.table(board);
        }

        const defaultGridSize = 3;

        const playerOne = {
            marker: 'x'
        }
        const playerTwo = {
            marker: 'o'
        }

        const board = [];

        const initGrid = (gridSize) => {
            // Reset the grid
            for (let i = 0; i < gridSize; i++) {
                board[i] = [];
                for (let j = 0; j < gridSize; j++) {
                    board[i].push(Cell());
                }
            }
        }

        // Factory function for handling cells for the game board
        function Cell() {

            let value = '';
          
            // Accept a player's token to change the value of the cell
            const addToken = (player) => {
                value = player;
            };
          
            // How we will retrieve the current value of this cell through closure
            const getValue = () => value;
          
            return {
                addToken,
                getValue
            };
        }

        const checkWinner = () => {
            // Scan the grid for a winning line
        }

        const placeToken = (gridcell, player) => {
            // Place either a 'o' or 'x' in the selected grid cell
        }

        return {
            // Public methods (e.g., init)
            init,
            initGrid,
            checkWinner,
            placeToken,
            defaultGridSize
        };
    }
  
    const gameInstance = Game();
    gameInstance.init(); // Start the app
});