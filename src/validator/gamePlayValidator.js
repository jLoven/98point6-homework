'use strict';

/**
 * Check whether column has at least one open space at the top when user tries to place a token there.
 */
function isUserMoveValid(columnIndex, board) {
    const topSpace = board[columnIndex][0];
    return topSpace === 0 ? true : false;
}

/**
 * Check whether the board is full, and if it is full, the game is a draw and should be over.
 */
function isDraw(board) {
    for (let column of board) {
        if (column[0] === 0) {
            return false;
        }
    };
    return true;
}

export {
    isUserMoveValid,
    isDraw,
}