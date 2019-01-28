import React from 'react';

export function Cell(props) {
    const hasShip = props.hasShip;
    const hasBeenShot = props.hasBeenShot;

    let displayText = '';
    let cellClass = 'cell';
    if (hasShip && hasBeenShot) {
        displayText = 'O';
        cellClass += ' hit';
    } else if (!hasShip && hasBeenShot) {
        displayText = 'O';
    }

    return (
        <button className={cellClass} onClick={props.onClick}>
            {displayText}
		</button>
	);
}
