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

    Render.initEvents(); // Hook up event listeners
    Game.init(); // Start the app

});

// Module/IIFE pattern for scoping
const Game = ( function() {

    // Private variables/functions
    const board = [];
    const players = [];
    let currentPlayerIndex = 0;

    const init = () => { 
        
        initGrid(9); // Create or reset the game board 3x3

        players.length = 0; // Removes existing players if any
        currentPlayerIndex = 0;

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

    // Visuals related
    const initGrid = (gridSize) => {
        // Reset the grid
        for (let i = 0; i < gridSize; i++) {
            board[i] = null;
        }
        Render.resetGrid();
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
    function getCurrentPlayerIndex() {
        return currentPlayerIndex;
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
        let gameState = {};
        gameState.board = getBoard();

        // 2. Compare current board state with array of winning combination states

        // Which player to check is currently hardcoded for 'x'
        let occupiedCells = gameState.board.map((item, index) => {
            if (item === pMarker) return index;
        }).filter( item => {
            if (item != undefined) return true;
        });

        console.log(`Player ${pMarker} has markers in cell ${occupiedCells}`);

        
        // 2b. Search winningStates and check each of its arrays' array elements against the occupiedCells array elements
        const results = winningStates.find(element => element.every(item => occupiedCells.includes(item)));
        // !results ? console.log('There are no winning results.') : console.log('The winning result is', results);


        // 3. Declare a winner
        if (results) {
            // game has a winner
            // console.log(`The winner is ${player}`);
            // call function to game over state, send player as argument
            return gameOver(player);
        }

        const hasNull = gameState.board.includes(null);
        if (hasNull) {
            console.log("There are still moves to make, continue the game.");
            // switch to next player
            nextPlayer();
        } else {
            // console.log("All grid cells occupied. Game over!");
            // call function to game over state
            return gameOver(); // rely on parameter default
        }

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

    const gameOver = (result = null) => {
        if (result != null) {
            console.log(`The winner is ${players[result].marker}`);
        } else {
            console.log(`The game has ended in a draw`);
        }
        // Code for resetting the game to start anew.
        console.log("Add in an input here, but running game reset automatically for now");
        init(); // reset the game
    }

    const bloop = () => {
        return "bloop";
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
        currentPlayerIndex,
        getCurrentPlayerIndex,
        bloop
    };
})();

const Render = ( function() {

    const container = document.querySelector('#container');
    const gridCells = document.getElementsByClassName('cell');
    const gridCellsArray = Array.from(gridCells);
    
    function resetGrid() {
        // create DOM elements for grid
        gridCellsArray.forEach((el) => {
            if (el.classList.contains("x")) {
                el.classList.toggle("x");
            } else if (el.classList.contains("o")) {
                el.classList.toggle("o");
            }
        });
    }

    function showRestartBtn() {
        
    }

    function initEvents() {

        const handleClick = (e) => {
            
            const currentPlayer = Game.getPlayer(Game.getCurrentPlayerIndex());
            const currentPlayerMarker = currentPlayer.getMarker();
            const element = e.target
            // element is the child -> Array.from(child.parentNode.children).indexOf(child);
            const elementIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
            // use elementIndex to reference the game board array
            // console.log('You have clicked on the grid cell', elementIndex, 'and its value is', board[elementIndex]);
            
            Game.placeMarker(Game.getCurrentPlayerIndex(), elementIndex)
            element.classList.toggle(currentPlayerMarker); // debug, cell filled in when clicked

            // Check if grid cell has a player marker or not 
            console.log('You have clicked on the grid cell', elementIndex, 'and its value is', Game.getBoard()[elementIndex], Game.getBoard());
            
        }

        // .getElementsByClassName returns an array-like object, not an array
        // Use Array.from to make it compatible with .forEach
        gridCellsArray.forEach((el) => {
            // Attach click eventlistener to each <div class="cell">
            el.addEventListener('click', handleClick);
        });
    }

    return {
        initEvents,
        resetGrid
    }
})();