'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid'; //  Used to generate unique key for elements of gameboard array
var fetch = require('fetch-retry');

import GameError from './components/gameError.js';
import GameOver from './components/gameOver.js';
import { 
    LOADING_TEXT,
    SERVICE_PLAYS_FIRST_TEXT, 
    RETRY_CONDITIONS,
    RED_CIRCLE_STYLE,
    BLUE_CIRCLE_STYLE,
    REQUIRED_SEQUENTIAL_TOKENS_TO_WIN,
    GAME_ERROR_COLUMN_FULL,
    GAME_ERROR_DRAW,
    NO_PLAYER_VALUE,
    USER_PLAYER_VALUE,
    SERVICE_PLAYER_VALUE, } from './constants/constants.js';
import { getApiEndpointWithQueryParams } from './provider/apiEndpointProvider.js';
import { getInitializedBoard, getInitialState } from './provider/initialStateProvider.js';
import { isCurrentMoveInsideSequenceOfWinningTokens } from './validator/gameWinValidator.js';
import { isUserMoveValid, isDraw } from './validator/gamePlayValidator.js';

import './styles/gameboard.scss';

function getElementColorStyle(element) {
    var style;
    switch(element) {
        case USER_PLAYER_VALUE:
            style = RED_CIRCLE_STYLE;
            break;
        case SERVICE_PLAYER_VALUE:
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
            gameError: false,
            gameErrorType: '',
            gameOver: false,
            winner: NO_PLAYER_VALUE,
            isServicePlayFirstButtonHidden: false,
        };
        this.reset = this.reset.bind(this);
    }

    reset() {
        const initialState = getInitialState();
        this.setState({
            board: initialState['board'],
            moves: initialState['moves'],
            gameError: initialState['gameError'],
            gameErrorType: initialState['gameErrorType'],
            gameOver: initialState['gameOver'],
            winner: initialState['winner'],
            isServicePlayFirstButtonHidden: initialState['isServicePlayFirstButtonHidden'],
        });
    }

    componentDidMount() {
        this.setState({ isLoaded: true });
    }

    /**
     * Get the lowest item in the column that doesn't have a token in it, and place a token there.
     * If the move was not the opponent service, get the next opponent move from the API.
     */
    addMarkerAndGetOpponentMove(columnIndex, isOpponent) {
        const { board, gameOver, gameErrorType } = this.state;
        var { moves } = this.state;
        if (!gameOver) {
            var doesCurrentMoveWinGame;
            for (var i = board[columnIndex].length; i >= 0; i--) {
                if (board[columnIndex][i] === NO_PLAYER_VALUE) {
                    isOpponent ? board[columnIndex][i] = SERVICE_PLAYER_VALUE : board[columnIndex][i] = USER_PLAYER_VALUE;
                    moves.push(columnIndex);
                    this.setState({ 
                        board: board, 
                        moves: moves,
                        isServicePlayFirstButtonHidden: true,
                    }, () => {
                        const isBoardDraw = isDraw(board);
                        this.setState({
                            gameError: isBoardDraw ? true : false,
                            gameErrorType: isBoardDraw ? GAME_ERROR_DRAW : gameErrorType,
                            gameOver: isBoardDraw ? isBoardDraw : gameOver,
                        });
                        const isWinningMove = isCurrentMoveInsideSequenceOfWinningTokens(board, columnIndex, i);
                        if (isWinningMove) {
                            this.setState({ 
                                gameOver: true,
                                winner: board[columnIndex][i],
                            });
                        } else if (!isOpponent) {
                            this.getNextMoveFromApi();
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
    getNextMoveFromApi() {
        const { moves } = this.state;
        const endpoint = getApiEndpointWithQueryParams(moves);
        fetch(endpoint, RETRY_CONDITIONS)
            .then(res => res.json())
            .then(
                (result) => {
                    const opponentMove = result[result.length - 1];
                    this.addMarkerAndGetOpponentMove(opponentMove, true);
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
    updateBoardWithMove(userMove) {
        const { board, gameErrorType } = this.state;
        const valid = isUserMoveValid(userMove, board);
        this.setState({ 
            gameError: !valid ? true : false, 
            gameErrorType: !valid ? GAME_ERROR_COLUMN_FULL : gameErrorType,
        }, () => {
            const { gameError } = this.state;
            if (!gameError) {
                this.addMarkerAndGetOpponentMove(userMove, false);
            }
        });
    }

    render() {
        const { isLoaded, board, gameError, gameOver, gameErrorType, winner, isServicePlayFirstButtonHidden } = this.state;

        if (!isLoaded) {
            return <div>{ LOADING_TEXT }</div>;
        } else {
            return(
                <div>
                    <div className="flex-container">
                        { board.map((column, columnIndex) => (
                            <div className='column' key={ columnIndex }
                                onClick={ () => { this.updateBoardWithMove(columnIndex) } }>
                                    { column.map((element, rowIndex) => (
                                        <div className={ `row ${getElementColorStyle(element)}` }
                                            key={ shortid.generate() }></div>
                                    )) }
                            </div>
                        )) }
                    </div>
                    <button 
                        className={ isServicePlayFirstButtonHidden ? 'hidden-button' : '' }
                        onClick={() => { 
                            this.getNextMoveFromApi();
                            this.setState({ isServicePlayFirstButtonHidden: true });
                        }}
                    >{ SERVICE_PLAYS_FIRST_TEXT }</button>
                    { gameError ? <GameError errorType={ gameErrorType } gameOver={ gameOver } /> : null }
                    { gameOver ? <GameOver winner={ winner } reset={ this.reset } /> : null }
                </div>
            );
        }
    }
}

const root = document.getElementById('root');

ReactDOM.render(<DropTokenGameboard />, root);