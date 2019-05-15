'use strict';

import { API_ENDPOINT } from '../constants/constants.js';

/*
 * Returns a string containing the full 9dt API endpoint,
 * given an array of current moves.
 * API documentation: https://github.com/jLoven/98point6-homework/blob/master/9dt-mobile.pdf
 */
function getApiEndpointWithQueryParams(moves) {
    return API_ENDPOINT + 'moves=' + JSON.stringify(moves);
}

export {
    getApiEndpointWithQueryParams,
};