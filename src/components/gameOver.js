'use strict';

import React, { Component } from 'react';

import { GAME_OVER_TEXT, WINNER_TEXT, PLAY_AGAIN_TEXT } from '../constants/constants.js';

class GameOver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: this.props.winner,
        }
    }

    render() {
        const { winner } = this.state;
        return(
            <div>
                <div>{ GAME_OVER_TEXT } { WINNER_TEXT[winner] }</div>
                <button className='' onClick={() => (this.props.reset())} >{ PLAY_AGAIN_TEXT }</button>
            </div>
        );
    }
}

export default GameOver;