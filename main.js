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
            // setupPlayers(2); // Add 2 players to the game
            players.push(Player('o'));
            players.push(Player('x')); // Players are associated with their index in players array

            // May need to do an error catch here to make sure only 1 player's turn is set to on
            players[0].toggleTurn; // Set first player's turn to on
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
                    board[i].push(Cell(i.toString() + ', ' + j.toString()));
                }
            }
        }

        function Player(marker) {
            let isTurn = false;
            const getMarker = () => marker
            const toggleTurn = () => isTurn = !isTurn;
            return {
                getMarker,
                toggleTurn
            }
        }

        // Get a player object
        function getPlayer(playerIndex) {
            return player[playerIndex];
        }

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


        const getBoard = () => board;
    

        return {
            // Public methods (e.g., init)
            init,
            initGrid,
            checkWinner,
            placeToken,
            defaultGridSize,
            getBoard,
            getPlayer
        };
    }
  
    // 
    const gameInstance = Game();

    // Temporarily expose for debugging
    window.gameInstance = gameInstance;

    gameInstance.init(); // Start the app

    
});