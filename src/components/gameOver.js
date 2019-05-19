'use strict';

import React, { Component } from 'react';

import { GAME_OVER_TEXT } from '../constants/constants.js';

class GameOver extends Component {
	render() {
		return(
			<div>{ GAME_OVER_TEXT }</div>
        );
	}
}

export default GameOver;