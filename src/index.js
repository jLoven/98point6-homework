'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid'; //  Used to generate unique key for elements of gameboard array

import { LOADING_TEXT } from './constants/constants.js';

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
            active: false,
        };
    }

    componentDidMount() {
        this.setState({
            isLoaded: true,
        });
    }

    toggleClass() {
        const { active } = this.state;
        this.setState({ 
            active: !active,
        });
    };

    render() {
        const { isLoaded, board, active } = this.state;

        if (!isLoaded) {
            return <div>{ LOADING_TEXT }</div>;
        } else {
            return(
                <div className="flex-container">
                    { board.map(column => (
                        <div className={ 
                            active ? 'column red-filled-circle': 'column' }  
                            key={ shortid.generate() }
                            onClick={ () => this.toggleClass() }>
                                { column.map(element => (
                                    <div className="row" key={ shortid.generate() }>{ element }</div>
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