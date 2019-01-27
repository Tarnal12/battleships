import React from 'react';
import { Cell } from './cell';

export class Board extends React.Component {
	renderCell(i) {
		var hasShip = this.props.ships[i];
		var wasShot = this.props.shots[i];

		var displayText = '';
		var cellClass = 'cell';
        if (hasShip && wasShot) {
            displayText = 'O';
            cellClass += ' hit';
        } else if (!hasShip && wasShot) {
			displayText = 'O';
        }

		return (
			<Cell
				key={'Cell' + i}
				className={cellClass}
				value={displayText}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		let table = [];
		const gridSize = this.props.gridSize;
		for (let y = 0; y < gridSize; y++) {
			let row = [];
			for (let x = 0; x < gridSize; x++) {
				let cellIndex = y * gridSize + x;
				row.push(this.renderCell(cellIndex));
			}
			table.push(
				<div className="board-row" key={'Row' + y}>
					{row}
				</div>
			);
		}

		return <div>{table}</div>;
	}
}
