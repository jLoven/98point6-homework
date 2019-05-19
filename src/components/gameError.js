'use strict';

import React, { Component } from 'react';

import { INVALID_MOVE_TEXT } from '../constants/constants.js';

class GameError extends Component {
	render() {
		return(
			<div>{ INVALID_MOVE_TEXT }</div>
        );
	}
}

export default GameError;