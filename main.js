document.addEventListener('DOMContentLoaded', () => {
    // Module/IIFE pattern for scoping
    function Game() {
        // Private variables/functions
        const init = () => { 
            initGrid(defaultGridSize);
            console.table(board);
        }

        const defaultGridSize = 3;
        const board = [];

        const initGrid = (gridSize) => {
            // Reset the grid
            for (let i = 0; i < gridSize; i++) {
                board[i] = [];
                for (let j = 0; j < gridSize; j++) {
                    // Send coordinate as string to Cell()
                    board[i].push(Cell(i.toString() + ', ' + j.toString()));
                }
            }
        }

        function Player(marker) {
            const getMarker = () => marker
            let score = 0
            const updateScore = (value) {
                score += value;
            }
            const getScore = () => score;
            return {
                getMarker, getScore, updateScore
            }
        }

        const playerOne = Player('o');
        const playerTwo = Player('x');

        // Factory function for handling cells for the game board
        function Cell(coord) {

            // This variable is not returned, so it is a private variable
            // It can only be accessed via the public functions returned (addToken and getValue)
            let value = '';
            // const coord = coordinate;
          
            // Accept a player's token to change the value of the cell
            const addToken = (player) => {
                value = player.getMarker();
            };
          
            // How we will retrieve the current value of this cell through closure
            const getValue = () => value;
            const getCoord = () => coord;
          
            return {
                addToken,
                getValue,
                getCoord
            };
        }

        const checkWinner = () => {
            // Scan the grid for a winning line
        }

        const placeToken = (gridcell, player) => {
            // Place either a 'o' or 'x' in the selected grid cell
        }

        const getBoard = () => console.table(board);

        

        return {
            // Public methods (e.g., init)
            init,
            initGrid,
            checkWinner,
            placeToken,
            defaultGridSize,
            getBoard
        };
    }
  
    // 
    const gameInstance = Game();

    // Temporarily expose for debugging
    window.gameInstance = gameInstance;

    gameInstance.init(); // Start the app

    
});