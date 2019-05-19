'use strict';

import React, { Component } from 'react';

import { INVALID_MOVE_TEXT, GAME_DRAW_TEXT, GAME_ERROR_COLUMN_FULL, GAME_ERROR_DRAW } from '../constants/constants.js';
import '../styles/gameboard.scss';

class GameError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorType: this.props.errorType,
            gameOver: this.props.gameOver,
            hasWinner: this.props.hasWinner,
        }
    }

    render() {
        const { errorType, gameOver, winner, hasWinner } = this.state;
        var errorTextToDisplay = '';
        if (!gameOver && errorType === GAME_ERROR_COLUMN_FULL) {
            errorTextToDisplay = INVALID_MOVE_TEXT;
        } else if (!hasWinner && errorType === GAME_ERROR_DRAW) {
            errorTextToDisplay = GAME_DRAW_TEXT;
        }
        return(
            <div className='game-alert-text button-wrapper'>{ errorTextToDisplay }</div>
        );
    }
}

export default GameError;