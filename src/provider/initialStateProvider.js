'use strict';

import { BOARD_HEIGHT, BOARD_WIDTH, NO_PLAYER_VALUE } from '../constants/constants.js';

/**
 * Return an array of specified height and width, with value 0 for each element.
 */
function getInitializedBoard() {
    var rows = new Array(BOARD_HEIGHT);
    for (var i = 0; i < rows.length; i++) {
        rows[i] = new Array(BOARD_WIDTH).fill(0);
    }
    return rows;
}

/**
 * Return the initial state of the gameboard.
 * board: Array of 0s to represent the value of each empty token space
 * moves: Array of current columns that have tokens placed in them
 * gameError: Contains whether an error has occurred in the gameplay
 * gameErrorType: Contains whether the game error is a GAME_ERROR_COLUMN_FULL or GAME_ERROR_DRAW
 * gameOver: Tracks whether the game is over due to loss or draw
 * winner: Tracks which user has won
 * isServicePlayFirstButtonHidden: Tracks whether the button to allow the service to play first is hidden
 */
function getInitialState() {
    return {
        board: getInitializedBoard(),
        moves: [],
        gameError: false,
        gameErrorType: '',
        gameOver: false,
        winner: NO_PLAYER_VALUE,
        isServicePlayFirstButtonHidden: false,
    };
}

export {
    getInitializedBoard,
    getInitialState,
};