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