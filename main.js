document.addEventListener('DOMContentLoaded', () => {
    // Module/IIFE pattern for scoping
    const Game = (() => {
        // Private variables/functions
        const init = () => { console.log("Hello, World!") }

        const gridsize = 3;
        const board = [];

        const initGrid = (gridsize) => {
            // Reset the grid
            for (let i = 0; i < gridsize; i++) {
                board[i] = [];
                for (let j = 0; j < gridsize; j++) {
                    board[i].push(Cell());
                }
            }
        }

        function Cell() {
            
            let value = 0;
          
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

        const playPiece = (gridcell, pieceType) => {
            // Place either a 'o' or 'x' in the selected grid cell
        }



        return {
            // Public methods (e.g., init)
            init,
            initGrid,
            checkWinner,
            playPiece
        };
    })();
  
    Game.init(); // Start the app
  });