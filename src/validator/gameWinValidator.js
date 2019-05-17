'use strict';

import { REQUIRED_SEQUENTIAL_TOKENS_TO_WIN } from '../constants/constants.js';

/**
 * Before checking whether there are any diagonal or downward wins,
 * first check if there are more than (REQUIRED_SEQUENTIAL_TOKENS_TO_WIN - 1) spots below the latest move.
 */
function doesMarkerHaveEnoughSpotsBelowToWin(rowIndex, columnLength) {
    return (rowIndex + REQUIRED_SEQUENTIAL_TOKENS_TO_WIN <= columnLength);
}

/**
 * Before checking whether there are any rightward wins,
 * first check if there are more than (REQUIRED_SEQUENTIAL_TOKENS_TO_WIN - 1) spots to the right of the latest move.
 */
function doesMarkerHaveEnoughSpotsToRightToWin(columnIndex, rowLength) {
    return (columnIndex + REQUIRED_SEQUENTIAL_TOKENS_TO_WIN <= rowLength);
}

/**
 * Before checking whether there are any leftward wins,
 * first check if there are more than (REQUIRED_SEQUENTIAL_TOKENS_TO_WIN - 1) spots to the left of the latest move.
 */
function doesMarkerHaveEnoughSpotsToLeftToWin(columnIndex, rowLength) {
    return (columnIndex - REQUIRED_SEQUENTIAL_TOKENS_TO_WIN + 1 >= 0);
}

/**
 * Check if the current token begins a sequence of winning tokens, given a board and current move and its location in terms of column and row.
 * columnIndexLoopVar and rowIndexLoopVar are used to define the direction of the sequence check.
 */
function doesCurrentMoveStartSequenceOfWinningTokens(board, currentMove, 
    columnIndex, rowIndex, columnIndexLoopVar, rowIndexLoopVar) {
    for (var i = 0; i < REQUIRED_SEQUENTIAL_TOKENS_TO_WIN; i++) {
        var currentToken = board[columnIndex + columnIndexLoopVar * i][rowIndex + rowIndexLoopVar * i];
        if (currentToken !== currentMove) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if the current value of the latest move is the same as the number of sequential values
 * below, right, left, diagonal downward-right, or diagonal downward-left (up to REQUIRED_SEQUENTIAL_TOKENS_TO_WIN).
 * Does not need to check if there is a winning combination above,
 * because later moves will check below them using this function.
 */
function doesCurrentMoveWinGame(board, columnIndex, rowIndex) {
    const currentMove = board[columnIndex][rowIndex];
    const enoughSpaceBelow = doesMarkerHaveEnoughSpotsBelowToWin(rowIndex, board[columnIndex].length);
    const enoughSpaceToRight = doesMarkerHaveEnoughSpotsToRightToWin(columnIndex, board.length);
    const enoughSpaceToLeft = doesMarkerHaveEnoughSpotsToLeftToWin(columnIndex, board.length);

    // DOWN: check board[columnIndex][rowIndex + i]
    if (enoughSpaceBelow && doesCurrentMoveStartSequenceOfWinningTokens(board, currentMove, columnIndex, rowIndex, 0, 1)) {
        return true;
    }

    if (enoughSpaceToRight) {
        // RIGHT: check board[columnIndex + i][rowIndex]
        if (doesCurrentMoveStartSequenceOfWinningTokens(board, currentMove, columnIndex, rowIndex, 1, 0)) {
            return true;
        }

        if (enoughSpaceBelow) {
            // DOWNWARD-RIGHT DIAGONAL: check board[columnIndex + i][rowIndex + i]
            if (doesCurrentMoveStartSequenceOfWinningTokens(board, currentMove, columnIndex, rowIndex, 1, 1)) {
                return true;
            }
        }
    }

    if (enoughSpaceToLeft) {
        // LEFT: check board[columnIndex - i][rowIndex]
        if (doesCurrentMoveStartSequenceOfWinningTokens(board, currentMove, columnIndex, rowIndex, -1, 0)) {
            return true;
        }

        if (enoughSpaceBelow) {
            // DOWNWARD-LEFT DIAGONAL: check board[columnIndex - i][rowIndex + i]
            if (doesCurrentMoveStartSequenceOfWinningTokens(board, currentMove, columnIndex, rowIndex, -1, 1)) {
                return true;
            }
        }
    }
    return false; // No win in any direction
}

export {
    doesCurrentMoveWinGame,
};