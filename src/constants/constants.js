'use strict';

// Text shown on the UI
const LOADING_TEXT = 'Loading...';

// Location of 9dt API
const API_ENDPOINT = 'https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?';

/*
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

// Number of sequential tokens to win the game.
const REQUIRED_SEQUENTIAL_TOKENS_TO_WIN = 4;

export {
	LOADING_TEXT,
	API_ENDPOINT,
	RETRY_CONDITIONS,
	RED_CIRCLE_STYLE,
	BLUE_CIRCLE_STYLE,
	REQUIRED_SEQUENTIAL_TOKENS_TO_WIN,
};