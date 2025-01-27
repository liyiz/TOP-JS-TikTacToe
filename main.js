// 1. Game displays which grid cells are empty, and which grid cells have markers and whose marker.
// 2. Game shows whose turn it is
// 3. That player selects a valid grid cell to place their marker
// 4. The cell updates its value to the player's marker
// 5. Game checks if there is a winning state for either player
// 6. If there is a 3 in a row match, then the marker value is identified, and the win is given to that player.

document.addEventListener('DOMContentLoaded', () => {
    // Module/IIFE pattern for scoping
    function Game() {
        // Private variables/functions
        const init = () => { 
            initGrid(defaultGridSize); // Create or reset the game board
            // setupPlayers(2); // Add 2 players to the game
            players.push(Player('o'));
            players.push(Player('x')); // Players are associated with their index in players array
            console.table(players);
            console.table(board);

        }

        const defaultGridSize = 3;
        const board = [];
        const players = [];

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

        // function setupPlayers(playerCount) {
        //     for (let i = 0; i < playerCount; i++) {
        //          // code to add as many players as playerCount
        //     }
        //     return {
        //         // players...
        //     }
        // }

        function Player(marker) {
            const getMarker = () => marker
            return {
                getMarker
            }
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