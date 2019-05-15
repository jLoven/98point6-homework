'use strict';

import { API_ENDPOINT } from '../constants/constants.js';

/*
 * Returns a string containing the full 9dt API endpoint,
 * given an array of current moves.
 * API documentation:
 */
function getApiEndpointWithQueryParams(moves) {
    return API_ENDPOINT + 'moves=' + moves;
}

export {
    getApiEndpointWithQueryParams,
};