'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid'; //  Used to generate unique key for elements of gameboard array
var fetch = require('fetch-retry');

import { 
    LOADING_TEXT, 
    RETRY_CONDITIONS,
    RED_CIRCLE_STYLE,
    BLUE_CIRCLE_STYLE,
    REQUIRED_SEQUENTIAL_TOKENS_TO_WIN } from './constants/constants.js';
import { getApiEndpointWithQueryParams } from './provider/apiEndpointProvider.js';
import { getInitializedBoard } from './provider/initialStateProvider.js';
import { isCurrentMoveInsideSequenceOfWinningTokens } from './validator/gameWinValidator.js';

import './styles/gameboard.scss';

function getElementColorStyle(element) {
    var style;
    switch(element) {
        case 1:
            style = RED_CIRCLE_STYLE;
            break;
        case 2:
            style = BLUE_CIRCLE_STYLE;
            break;
        default:
            style = '';
    }
    return style;
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            board: getInitializedBoard(),
            moves: [],
        };
    }

    componentDidMount() {
        this.setState({ isLoaded: true });
    }

    /**
     * Updates the state to contain the column index of the latest user move. 
     */
    updateMoves(columnIndex) {
        var { moves } = this.state;
        moves.push(columnIndex);
        this.setState({ moves: moves });
    }

    /**
     * Get the lowest item in the column that doesn't have a marker in it, and place a marker there.
     */
    addMarkerToLowestPositionInColumn(columnIndex, isOpponent) {
        var { board } = this.state;

        for (var i = board[columnIndex].length; i >= 0; i--) {
            if (board[columnIndex][i] === 0) {
                isOpponent ? board[columnIndex][i] = 2 : board[columnIndex][i] = 1;
                this.updateMoves(columnIndex);

                console.log(isCurrentMoveInsideSequenceOfWinningTokens(board, columnIndex, i));
                break;
            }
        }
        this.setState({ board: board });
    }

    getNextOpponentMove() {
        const { moves } = this.state;
        const endpoint = getApiEndpointWithQueryParams(moves);

        fetch(endpoint, RETRY_CONDITIONS)
            .then(res => res.json())
            .then(
                (result) => {
                    const opponentMove = result[result.length - 1];
                    this.addMarkerToLowestPositionInColumn(opponentMove, true);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    updateBoardWithNextOpponentMove(userMove) {
        const { moves } = this.state;
        this.addMarkerToLowestPositionInColumn(userMove, false);
        this.getNextOpponentMove(moves)
    }

    render() {
        const { isLoaded, board } = this.state;

        if (!isLoaded) {
            return <div>{ LOADING_TEXT }</div>;
        } else {
            return(
                <div className="flex-container">
                    { board.map((column, columnIndex) => (
                        <div className='column' key={ columnIndex }
                            onClick={ () => this.updateBoardWithNextOpponentMove(columnIndex) }>
                                { column.map((element, rowIndex) => (
                                    <div className={ `row ${getElementColorStyle(element)}` }
                                        key={ shortid.generate() }></div>
                                )) }
                        </div>
                    )) }
                </div>
            );
        }
    }
}

const root = document.getElementById('root');

ReactDOM.render(<App />, root);