'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid'; //  Used to generate unique key for elements of gameboard array
var fetch = require('fetch-retry');

import { LOADING_TEXT, RETRY_CONDITIONS } from './constants/constants.js';
import { getApiEndpointWithQueryParams } from './provider/apiEndpointProvider.js';

import './styles/gameboard.css';

function getInitializedBoard(width, height) {
    var rows = new Array(height);
    for (var i = 0; i < rows.length; i++) {
        rows[i] = new Array(width).fill(0);
    }
    return rows;
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            board: getInitializedBoard(4, 4),
            moves: [],
        };
    }

    componentDidMount() {
        this.setState({ isLoaded: true });
    }

    /**
     * Updates the state to contain the column index of the latest user move. 
     */
    updateUserMoves(columnIndex) {
        var { moves } = this.state;
        moves.push(columnIndex);
        this.setState({ moves: moves });
    }

    /**
     * Get the lowest item in the column that doesn't have a marker in it, and place a marker there.
     */
    addMarkerToLowestPositionInColumn(columnIndex) {
        var { board } = this.state;

        for (var i = board[columnIndex].length; i >= 0; i--) {
            if (board[columnIndex][i] === 0) {
                board[columnIndex][i] = 1;
                this.updateUserMoves(columnIndex)
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
                    this.setState({ moves: result });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        const { isLoaded, board, moves } = this.state;

        if (!isLoaded) {
            return <div>{ LOADING_TEXT }</div>;
        } else {
            return(
                <div className="flex-container">
                    { board.map((column, index) => (
                        <div className='column'
                            key={ index }
                            onClick={ () => {this.addMarkerToLowestPositionInColumn(index); this.getNextOpponentMove(moves)} }>
                                { column.map(element => (
                                    <div className={ element === 1 ? 'row red-filled-circle': 'row' }
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