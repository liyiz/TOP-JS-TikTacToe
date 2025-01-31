// Check the state of the board
// Check whose turn it is (is it 'X' or 'O'?)
// Check if there is a winner
// Wait for input from current player (Select a cell)

// Representation of 3x3 grid in a one dimensional array
// This will help identify winning patterns
            // [0][1][2]
            // [3][4][5]
            // [6][7][8]

document.addEventListener('DOMContentLoaded', () => {
    // Module/IIFE pattern for scoping
    function Game() {

        // Private variables/functions
        const board = [];
        const players = [];
        let currentPlayerIndex = 0; // sets first player to be current player


        const init = () => { 
            initGrid(9); // Create or reset the game board 3x3

            // Create players
            players.push(createPlayer('x')); // will be first player
            players.push(createPlayer('o'));

            // Set who is going to play first
            // No need, first player is already set by first in array
            // We do have a function to progress player order -> nextPlayer();

            // Wait for input events of current player to select available grid cell
            // Need eventlistener for placeMarker();
            // initEvents(); // Comment out for now so this can be put into a specific render function

            // Check if there is a winner
            checkWinner();

            // Debug stuff
            console.table(players);
            console.table(board);

            startGame();

        }

        function nextPlayer() {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            console.log('Current Player:', players[currentPlayerIndex].getMarker());
        }


        function initEvents() {
            const gridCells = document.getElementsByClassName('cell');

            const handleClick = (e) => {
                
                const element = e.target
                // element is the child -> Array.from(child.parentNode.children).indexOf(child);
                const elementIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
                // use elementIndex to reference the game board array
                console.log('You have clicked on the grid cell', elementIndex, 'and its value is', board[elementIndex]);
                // I'm worried that elementIndex and board array indexes aren't coupled here. 
                // Could it be possible for these to ever get out of sync? Maybe not in this context...
                element.classList.toggle("test"); // debug, cell filled in when clicked

                // Check if grid cell has a player marker or not
                
            }

            // .getElementsByClassName returns an array-like object, not an array
            // Use Array.from to make it compatible with .forEach
            Array.from(gridCells).forEach((el) => {
                // Attach click eventlistener to each <div class="cell">
                el.addEventListener('click', handleClick);
            });
        }

        const initGrid = (gridSize) => {
            // Reset the grid
            for (let i = 0; i < gridSize; i++) {
                board[i] = null;
            }
        }

        function createPlayer(marker) {
            function getMarker() {
                return marker;
            }
            return {
                getMarker,
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
            let value = null;
          
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
            // 8 combinations
            // [0, 1, 2] -> [x, x, x, o, o, o, o, o, o]
            // [3, 4, 5] -> [o, o, o, x, x, x, o, o, o]
            // [6, 7, 8] -> [o, o, o, o, o, o, x, x, x]
            // [0, 3, 6] -> [x, o, o, x, o, o, x, o, o]
            // [1, 4, 7] -> [o, x, o, o, x, o, o, x, o]
            // [2, 5, 8] -> [o, o, x, o, o, x, o, o, x]
            // [0, 4, 8] -> [x, o, o, o, x, o, o, o, x]
            // [2, 4, 6] -> [o, o, x, o, x, o, x, o, o]

            // [0][1][2]
            // [3][4][5]
            // [6][7][8]
        }

        const placeMarker = (gridcell, player) => {
            // Place either a 'o' or 'x' in the selected grid cell
            const availableCells = board.filter((row) => row[gridcell].getValue() === null).map(row => row[gridcell]);
        }

        const getBoard = () => board;
    
        const startGame = () => {

        }

        return {
            // Public methods (e.g., init)
            init,
            initGrid,
            checkWinner,
            placeMarker,
            getBoard,
            getPlayer,
            players,
            nextPlayer,
            currentPlayerIndex
        };
    }
  
    // 
    const gameInstance = Game();

    // Temporarily expose for debugging
    window.gameInstance = gameInstance;

    gameInstance.init(); // Start the app

    
});