// TODO: Add in player name input

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

        // Debug stuff
        console.table(players);
        console.table(board);

        startGame();
    }

    function nextPlayer() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        console.log('Current Player:', players[currentPlayerIndex].getMarker());
    }

    const initGrid = (gridSize) => {
        // Reset the grid
        for (let i = 0; i < gridSize; i++) {
            board[i] = null;
        }
        Render.resetGrid();
    }

    function CreatePlayer(marker) {

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
        
        // Check if cell is empty
        if (board[cellIndex] === null){
            board.splice(cellIndex, 1, players[player].marker);
            Render.setCellVisual(players[player].marker, cellIndex);
        }

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
            Render.processMessage(players[result].marker);
        } else {
            console.log(`The game has ended in a draw`);
            Render.processMessage();
        }

        
        // Code for resetting the game to start anew.
        console.log("Game has ended. Waiting for user input to restart.");
        // 1. disable cell click events
        Render.disableEvents();
        // 2. show "Play Again" button
        // Make sure button triggers game reset functions
        // init(); // reset the game
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
    const resetBtn = document.querySelector('#restart');
    const messageBox = document.querySelector('#message');
    const modalBox = document.querySelector('#dialog')
    const btnStartGame = document.querySelector('#startGame');
    const btnFormDetails = document.querySelector('#getDetails');
    const btnFormCancel = document.querySelector('#cancel');


    const icon_x = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
    const icon_o = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="7"/></svg>'
    


    function resetGrid() {
        // create DOM elements for grid
        gridCellsArray.forEach((el) => {
            if (el.classList.contains("x") || el.classList.contains("o")) {
                el.classList.remove("x", "o");
            }
        });

        container.classList.remove("disabled");
        // container.children is an HTMLCollection, which is not technically an Array.
        // use Array.from to convert to array.
        Array.from(container.children).forEach((el) => {
            el.classList.remove("disabled");
            el.innerHTML = '';
        });

        // messageBox.innerHTML = icon_x + ' vs. ' + icon_o;

    }

    function disableEvents() {
        container.classList.add("disabled");
    }

    const disableCell = (index) => {
        container.children[index].classList.add("disabled");
    }

    const processMessage = (winner = '') => {
        let message = '';

        if (winner === 'x') {
            message = icon_x + ' is the winner!';
        } else if (winner === 'o') {
            message = icon_o + ' is the winner!';
        } else {
            message = 'Game is a tie!';
        }

        showMessage(message);
    }

    const showMessage = (message) => {
        // function to update the message to announce winner etc.
        return messageBox.innerHTML = message;
    }

    function showRestartBtn() {
        
    }

    const showDialog = () => {
        modalBox.showModal();
        console.log("modal now visible!");
    }

    const cancelDialog = () => {
        // reset any forms and close the dialog/modal
        modalBox.close();
    }

    const handleFormDetails = () => {
        // take info from modal forms and input to correct elements to display player names.
        console.log("handling the form details!");
    }

    


    const setCellVisual = (playerMarker, elementIndex) => {
        // add or remove class from selected grid cell
        // I need the element that is currently selected first. But if this is being called from 
        // Game.placeMarker(), then I need to make sure this function knows what I'm targeting.
        // playerMarker is the string 'x' or 'o'
        // elementIndex is the index of the element child of '#container'

        container.children[elementIndex].classList.add(playerMarker);

        let icon = document.createElement('div');
        icon.classList.add('icon');
        if (playerMarker === 'x') {
            icon.innerHTML += icon_x;
            container.children[elementIndex].appendChild(icon);
        }
        if (playerMarker === 'o') {
            icon.innerHTML += icon_o;
            container.children[elementIndex].appendChild(icon);
        }

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

            // element.classList.add(currentPlayerMarker);
            Game.placeMarker(Game.getCurrentPlayerIndex(), elementIndex); // setCellVisual called from here too
            disableCell(elementIndex);

            // Check if grid cell has a player marker or not 
            console.log('You have clicked on the grid cell', elementIndex, 'and its value is', Game.getBoard()[elementIndex], Game.getBoard());
            
        }

        // .getElementsByClassName returns an array-like object, not an array
        // Use Array.from to make it compatible with .forEach
        gridCellsArray.forEach((el) => {
            // Attach click eventlistener to each <div class="cell">
            el.addEventListener('click', handleClick);
        });

        // attach event to the restart button
        resetBtn.addEventListener('click', () => {
            Game.init();
        })

        btnStartGame.addEventListener('click', showDialog);
        btnFormDetails.addEventListener('click', handleFormDetails);
        btnFormCancel.addEventListener('click', cancelDialog);
    }

    return {
        initEvents,
        resetGrid,
        disableEvents,
        setCellVisual,
        showMessage,
        processMessage
    }
})();