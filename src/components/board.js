import React from 'react';
import { Cell } from './cell';

export class Board extends React.Component {
	renderCell(i) {
		const cellContainsShip = this.props.ships[i];
		const cellHasBeenShot = this.props.shots[i];

		return (
			<Cell
				key={'Cell' + i}
				hasShip={cellContainsShip}
				hasBeenShot={cellHasBeenShot}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	renderRow(row, rowIndex) {
		return (
			<div className="board-row" key={'Row' + rowIndex}>
				{row}
			</div>
		);
	}

	renderTable(table) {
		return <div>{table}</div>;
	}

	render() {
		const table = [];
		const gridSize = this.props.gridSize;
		for (let y = 0; y < gridSize; y++) {
			const row = [];
			for (let x = 0; x < gridSize; x++) {
				const cellIndex = y * gridSize + x;
				row.push(this.renderCell(cellIndex));
			}
			table.push(this.renderRow(row, y));
		}

		return <div>{table}</div>;
	}
}
