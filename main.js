// Check the state of the board
// Check whose turn it is (is it 'X' or 'O'?)
// Check if there is a winner
// Wait for input from current player (Select a cell)

document.addEventListener('DOMContentLoaded', () => {
    // Module/IIFE pattern for scoping
    function Game() {
        // Private variables/functions
        const init = () => { 
            initGrid(defaultGridSize); // Create or reset the game board

            // Create players
            players.push(createPlayer('o'));
            players.push(createPlayer('x'));

            // Set who is going to play first
            // ...

            // Check if there is a winner
            checkWinner();

            // Debug stuff
            console.table(players);
            console.table(board);

        }

        const defaultGridSize = 3;
        const board = [];
        const players = [];
        let turn = 0; // track number of turns passed

        const initGrid = (gridSize) => {
            // Reset the grid
            for (let i = 0; i < gridSize; i++) {
                board[i] = [];
                for (let j = 0; j < gridSize; j++) {
                    // Send coordinate as string to Cell()
                    // Create empty cell
                    const initCell = Cell().setValue(null);
                    // Add cell to board array
                    board[i].push();
                }
            }
        }

        function createPlayer(marker) {
            return {
                marker: marker
            }
        }

        // Get a player object
        function getPlayer(playerIndex) {
            return players[playerIndex];
        }

        // Factory function for handling cells for the game board
        function Cell() {

            // This variable is not returned, so it is a private variable
            // It can only be accessed via the public functions returned (addToken and getValue)
            let value = '';
          
            const setValue = (newValue) => {
                value = newValue;
            };
          
            // How we will retrieve the current value of this cell through closure
            const getValue = () => value;
          
            return {
                setValue,
                getValue
            };
        }

        const checkWinner = () => {
            // Scan the grid for a winning line
            // [x][x][x]
            // [o][o][o]
            // [o][o][o]
        }

        const placeToken = (gridcell, player) => {
            // Place either a 'o' or 'x' in the selected grid cell
            const availableCells = board.filter((row) => row[gridcell].getValue() === null).map(row => row[gridcell]);
        }

        const getBoard = () => board;
    
        return {
            // Public methods (e.g., init)
            init,
            initGrid,
            checkWinner,
            placeToken,
            defaultGridSize,
            getBoard,
            getPlayer,
            players
        };
    }
  
    // 
    const gameInstance = Game();

    // Temporarily expose for debugging
    window.gameInstance = gameInstance;

    gameInstance.init(); // Start the app

    
});