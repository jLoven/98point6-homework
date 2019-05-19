'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid'; //  Used to generate unique key for elements of gameboard array
var fetch = require('fetch-retry');

import GameError from './components/gameError.js';
import GameOver from './components/gameOver.js';
import { 
    LOADING_TEXT, 
    RETRY_CONDITIONS,
    RED_CIRCLE_STYLE,
    BLUE_CIRCLE_STYLE,
    REQUIRED_SEQUENTIAL_TOKENS_TO_WIN } from './constants/constants.js';
import { getApiEndpointWithQueryParams } from './provider/apiEndpointProvider.js';
import { getInitializedBoard } from './provider/initialStateProvider.js';
import { isCurrentMoveInsideSequenceOfWinningTokens } from './validator/gameWinValidator.js';
import { isUserMoveValid } from './validator/gamePlayValidator.js';

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

class DropTokenGameboard extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            board: getInitializedBoard(),
            moves: [],
            userBeginsGame: true,
            gameError: false,
            gameOver: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoaded: true });
    }

    /**
     * Get the lowest item in the column that doesn't have a token in it, and place a token there.
     * If the move was not the opponent service, get the next opponent move from the API.
     */
    addMarkerToLowestPositionInColumn(columnIndex, isOpponent) {
        const { board, gameOver } = this.state;
        var { moves } = this.state;
        if (!gameOver) {
            var doesCurrentMoveWinGame;
            for (var i = board[columnIndex].length; i >= 0; i--) {
                if (board[columnIndex][i] === 0) {
                    isOpponent ? board[columnIndex][i] = 2 : board[columnIndex][i] = 1;
                    moves.push(columnIndex);
                    this.setState({ 
                        board: board, 
                        moves: moves
                    }, () => {
                        const isWinningMove = isCurrentMoveInsideSequenceOfWinningTokens(board, columnIndex, i);
                        if (isWinningMove) {
                            this.setState({ gameOver: true });
                        } else if (!isOpponent) {
                            this.getNextOpponentMove();
                        }
                    });
                    break;
                }
            }
        
        }
    }

    /**
     * Given the array of current moves, call the API to retrieve the next opponent move from the service.
     */
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

    /**
     * Check if column is full before user tries to click to place a token there.
     * Place the game board component in an error state if it is not valid to place a token there.
     * If the move is valid, add a token there.
     */
    updateBoardWithNextOpponentMove(userMove) {
        const { board } = this.state;
        const valid = isUserMoveValid(userMove, board);
        this.setState({ gameError: !valid ? true : false }, () => {
            const { gameError } = this.state;
            if (!gameError) {
                this.addMarkerToLowestPositionInColumn(userMove, false);
            }
        });
    }

    render() {
        const { isLoaded, board } = this.state;
        var { gameError, gameOver } = this.state;

        if (!isLoaded) {
            return <div>{ LOADING_TEXT }</div>;
        } else {
            return(
                <div>
                    <div className="flex-container">
                        { board.map((column, columnIndex) => (
                            <div className='column' key={ columnIndex }
                                onClick={ () => { this.updateBoardWithNextOpponentMove(columnIndex) } }>
                                    { column.map((element, rowIndex) => (
                                        <div className={ `row ${getElementColorStyle(element)}` }
                                            key={ shortid.generate() }></div>
                                    )) }
                            </div>
                        )) }
                    </div>
                    { (gameError && !gameOver) ? <GameError /> : null }
                    { gameOver ? <GameOver /> : null }
                </div>
            );
        }
    }
}

const root = document.getElementById('root');

ReactDOM.render(<DropTokenGameboard />, root);