'use strict';

import React, { Component } from 'react';

import { INVALID_MOVE_TEXT, GAME_DRAW_TEXT, GAME_ERROR_COLUMN_FULL, GAME_ERROR_DRAW } from '../constants/constants.js';

class GameError extends Component {
	constructor(props) {
        super(props);
        this.state = {
            errorType: this.props.errorType,
            gameOver: this.props.gameOver,
        }
    }

	render() {
		const { errorType, gameOver } = this.state;
		var errorTextToDisplay = '';
		if (!gameOver && errorType === GAME_ERROR_COLUMN_FULL) {
			errorTextToDisplay = INVALID_MOVE_TEXT;
		} else if (errorType === GAME_ERROR_DRAW) {
			errorTextToDisplay = GAME_DRAW_TEXT;
		}
		return(
			<div>{ errorTextToDisplay }</div>
        );
	}
}

export default GameError;