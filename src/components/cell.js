import React from 'react';
import { CellState } from './cellstate';

export function Cell(props) {
    var display = props.value;
    if (display === CellState.CLEAR) {
        display = '';
    }
    else if (display === CellState.HIT) {
        display = 'H';
    }
    else if (display === CellState.MISS) {
        display = 'M';
    }
    //else if (display[0] === 'S') {
    //    display = '';
    //}

    return (
        <button className="cell" onClick={props.onClick}>
            { display }
        </button>
    );
}