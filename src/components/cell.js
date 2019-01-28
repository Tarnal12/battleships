import React from 'react';

export function Cell(props) {
    var hasShip = props.hasShip;
    var wasShot = props.wasShot;

    var displayText = '';
    var cellClass = 'cell';
    if (hasShip && wasShot) {
        displayText = 'O';
        cellClass += ' hit';
    } else if (!hasShip && wasShot) {
        displayText = 'O';
    }

    return (
        <button className={cellClass} onClick={props.onClick}>
            {displayText}
		</button>
	);
}
