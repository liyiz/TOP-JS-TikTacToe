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
            players.push(CreatePlayer('x')); // will be first player
            players.push(CreatePlayer('o'));

            // Set who is going to play first
            // No need, first player is already set by first in array
            // We do have a function to progress player order -> nextPlayer();

            // Wait for input events of current player to select available grid cell
            // Need eventlistener for placeMarker();
            // initEvents(); // Comment out for now so this can be put into a specific render function

            

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

        function CreatePlayer(marker) {

            let cells = [];
            const getState = () => {
                // loop through board state and log indexes that match player marker
            }
            function getMarker() {
                return marker;
            }

            return {
                getMarker,
                marker: marker,
                getState

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

        // Check what cells player one occupies
        // This can probably go in createPlayer
        function PlayerState (player) {

        }

        const checkWinner = (player) => {
            // player parameter is passed in from placeMarker() and is so we can check which 'x' or 'o' player has just made a move.

            const pMarker = players[player].marker;

            console.log("Just tried to check for a winner.")

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

            // 0. Define winning states
            const winningStates = [
                [0, 1, 2], // [x, x, x, o, o, o, o, o, o]
                [3, 4, 5], // [o, o, o, x, x, x, o, o, o]
                [6, 7, 8], // [o, o, o, o, o, o, x, x, x]
                [0, 3, 6], // [x, o, o, x, o, o, x, o, o]
                [1, 4, 7], // [o, x, o, o, x, o, o, x, o]
                [2, 5, 8], // [o, o, x, o, o, x, o, o, x]
                [0, 4, 8], // [x, o, o, o, x, o, o, o, x]
                [2, 4, 6]  // [o, o, x, o, x, o, x, o, o]
            ]

            // 1. Get current board state
            const gameState = getBoard();
            

            // 2. Compare current board state with array of winning combination states

            // Which player to check is currently hardcoded for 'x'
            let occupiedCells = gameState.map((item, index) => {
                if (item === pMarker) return index;
            }).filter( item => {
                if (item != undefined) return true;
            });

            console.log('Player has markers in:', occupiedCells);

            
            // 2b. Search winningStates and check each of its arrays' array elements against the occupiedCells array elements
            const results = winningStates.find(element => element.every(item => occupiedCells.includes(item)));

            console.log('The winning result is', results);


            // 3. Declare a winner
            function checkWin(win) {

                const hasNull = gameState.includes(null);

                if (win) {
                    return true;
                } 
                
                if (hasNull) { 
                    // continue the game
                    return "There are still moves to make, continue the game.";
                } else {
                    // If there is no winner, we need to check if all cells are occupied
                    return "All grid cells occupied. Game over!";
                }
            }
            
            console.log(checkWin(results));


            //      Then go off to reset game state
            // 4. If no winner, return from function
        }

        // deal with an input from player
        // usage: gameInstance.placeMarker( players_index, cell_grid);
        const placeMarker = (player, cellIndex) => {
            // Place either a 'o' or 'x' in the selected grid cell
            // const availableCells = board.filter((row) => row[gridcell].getValue() === null).map(row => row[gridcell]);
            // console.log(cellIndex);
            // assign gridcell with player marker
            // gridcell = player.marker; // wrong way to do it!
            board.splice(cellIndex, 1, players[player].marker);

            // Check if there is a winner after player made their play
            checkWinner(player);

            return getBoard();
            
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
    const game = Game();

    // Temporarily expose for debugging
    window.game = game;

    game.init(); // Start the app

    
});