'use strict';

import { REQUIRED_SEQUENTIAL_TOKENS_TO_WIN } from '../constants/constants.js';

/**
 * Check if the current token is inside a sequence of winning tokens, given a board and current move and its location in terms of column and row.
 * Total in any linear direction from the given token must be REQUIRED_SEQUENTIAL_TOKENS_TO_WIN - 1 in order to win.
 */
function isCurrentMoveInsideSequenceOfWinningTokens(board, columnIndex, rowIndex) {
    const currentMove = board[columnIndex][rowIndex];
    var totalLeft = 0;
    var totalRight = 0;
    var totalBelow = 0;
    var totalDiagonalUpRight = 0;
    var totalDiagonalDownLeft = 0;
    var totalDiagonalUpLeft = 0;
    var totalDiagonalDownRight = 0;

    for (var i = 1; i < REQUIRED_SEQUENTIAL_TOKENS_TO_WIN; i++) {
        var nextColumnExists = (board[columnIndex + i] !== undefined);
        var previousColumnExists = (board[columnIndex - i] !== undefined);
        // Count number of tokens to left and right:
        if (nextColumnExists && currentMove === board[columnIndex + i][rowIndex]) {
            totalRight++;
        }
        if (previousColumnExists && currentMove === board[columnIndex - i][rowIndex]) {
            totalLeft++;
        }
        if (totalRight + totalLeft + 1 >= REQUIRED_SEQUENTIAL_TOKENS_TO_WIN) {
            return true;
        }

        // Count number of tokens below:
        if (currentMove === board[columnIndex][rowIndex + i]) {
            totalBelow++;
            if (totalBelow + 1 === REQUIRED_SEQUENTIAL_TOKENS_TO_WIN) {
                return true;
            }
        }

        // Count number of tokens to diagonal up right and diagonal down left:
        if (nextColumnExists && currentMove === board[columnIndex + i][rowIndex - i]) {
            totalDiagonalUpRight++;
        }
        if (previousColumnExists && currentMove === board[columnIndex - i][rowIndex + i]) {
            totalDiagonalDownLeft++;
        }
        if (totalDiagonalUpRight + totalDiagonalDownLeft + 1 >= REQUIRED_SEQUENTIAL_TOKENS_TO_WIN) {
            return true;
        }

        // Count number of tokens to diagonal up left and diagonal down right:
        if (nextColumnExists && currentMove === board[columnIndex + i][rowIndex + i]) {
            totalDiagonalDownRight++;
        }
        if (previousColumnExists && currentMove === board[columnIndex - i][rowIndex - i]) {
            totalDiagonalUpLeft++;
        }
        if (totalDiagonalUpLeft + totalDiagonalDownRight + 1 >= REQUIRED_SEQUENTIAL_TOKENS_TO_WIN) {
            return true;
        }
    }
    return false; // No win in any direction
}

export {
    isCurrentMoveInsideSequenceOfWinningTokens,
};