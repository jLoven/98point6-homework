'use strict';

// Game player values on board for 1 user and 1 service oppnonent
const NO_PLAYER_VALUE = 0;
const USER_PLAYER_VALUE = 1;
const SERVICE_PLAYER_VALUE = 2;

// Text shown on the UI
const LOADING_TEXT = 'Loading...';
const GAME_OVER_TEXT = 'Game Over!';
const INVALID_MOVE_TEXT = 'That column is full- try a different one!';
const GAME_DRAW_TEXT = 'It\'s a draw.'
const WINNER_TEXT = {
    [USER_PLAYER_VALUE]: 'You won!',
    [SERVICE_PLAYER_VALUE]: 'I won!',
};
const PLAY_AGAIN_TEXT = 'Play Again';
const SERVICE_PLAYS_FIRST_TEXT = 'Let CPU go first!';

// Location of 9dt API
const API_ENDPOINT = 'https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?';

/**
 * Settings for the 'fetch-retry' Ajax call.
 * retries: number of retries (currently set to 0)
 * retryDelay: milliseconds between requests
 * retryOn: List of HTTP status codes to trigger a retry.
 */
const RETRY_CONDITIONS = {
    retries: 0,
    retryDelay: 250,
    retryOn: [500],
};

// Refer to gameboard.scss for style names
const RED_CIRCLE_STYLE = 'red-filled-circle';
const BLUE_CIRCLE_STYLE = 'blue-filled-circle';

// Number of sequential tokens to win the game
const REQUIRED_SEQUENTIAL_TOKENS_TO_WIN = 4;

// Height and width of game board (API only supports 4 for height and width)
const BOARD_HEIGHT = 4;
const BOARD_WIDTH = 4;

/**
 * Game error types
 * GAME_ERROR_COLUMN_FULL means the column has no more spaces for the user to place a token
 * GAME_ERROR_DRAW means the board is full and neither the user nor the service has won
 */
const GAME_ERROR_COLUMN_FULL = 'columnFullError';
const GAME_ERROR_DRAW = 'gameDrawError';

export {
    NO_PLAYER_VALUE,
    USER_PLAYER_VALUE,
    SERVICE_PLAYER_VALUE,
    LOADING_TEXT,
    GAME_OVER_TEXT,
    INVALID_MOVE_TEXT,
    GAME_DRAW_TEXT,
    WINNER_TEXT,
    PLAY_AGAIN_TEXT,
    SERVICE_PLAYS_FIRST_TEXT,
    API_ENDPOINT,
    RETRY_CONDITIONS,
    RED_CIRCLE_STYLE,
    BLUE_CIRCLE_STYLE,
    REQUIRED_SEQUENTIAL_TOKENS_TO_WIN,
    BOARD_HEIGHT,
    BOARD_WIDTH,
    GAME_ERROR_COLUMN_FULL,
    GAME_ERROR_DRAW,
};