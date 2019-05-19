'use strict';

/**
 * Check whether column has at least one open space at the top when user tries to place a token there.
 */
function isUserMoveValid(columnIndex, board) {
    const topSpace = board[columnIndex][0];
    return topSpace === 0 ? true : false;
}

export {
    isUserMoveValid,
}