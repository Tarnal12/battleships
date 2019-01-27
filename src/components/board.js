import React from 'react';
import { Cell } from './cell';

export class Board extends React.Component {
	constructor(props) {
		super(props);
		const gridSize = 10;
		const shipSizes = [5, 4, 4];
		let ships = this.seedShips(gridSize, shipSizes);
		this.state = {
			gridSize: gridSize,
			turnCount: 1,
			gameEnded: false,
			ships: ships,
			shots: Array(gridSize * gridSize).fill(false),
			survivorCount: shipSizes.length,
		};
	}

	seedShips(gridSize, shipSizes) {
		// Func to get the cell index from an x,y coordinate
		var GetIndex = function(x, y) {
			return x + y * gridSize;
		};

		// Func to get a random number between between 0 (inclusive) and less than max (exclusive)
		var RandNum = function(max) {
			return Math.floor(Math.random() * Math.floor(max));
		};

		var ships = Array(gridSize * gridSize).fill(null);

		for (let i = 0; i < shipSizes.length; i++) {
			let newShips = ships.slice();
			let isValidPlacement = true;
			const shipSize = shipSizes[i];

			const isVertical = RandNum(2) === 1;
			let startX = RandNum(
				isVertical ? gridSize - shipSize + 1 : gridSize
			);
			let startY = RandNum(
				!isVertical ? gridSize - shipSize + 1 : gridSize
			);

			for (let offset = 0; offset < shipSize; offset++) {
				var index = isVertical
					? GetIndex(startX + offset, startY, gridSize)
					: GetIndex(startX, startY + offset, gridSize);

				if (!newShips[index]) {
					newShips[index] = 'S' + i;
				} else {
					isValidPlacement = false;
					break;
				}
			}

			if (isValidPlacement) {
				ships = newShips;
			} else {
				i--;
			}
		}

		return ships;
	}

	handleCellClick(i) {
		const ships = this.state.ships.slice();
		const shots = this.state.shots.slice();
		const gridSize = this.state.gridSize;
		let turnCount = this.state.turnCount;
		let survivorCount = this.state.survivorCount;
		let gameEnded = this.state.gameEnded;
		if (i < 0 || i >= gridSize * gridSize || shots[i] || gameEnded) {
			return;
		} else {
			shots[i] = true;
			if (ships[i]) {
				var shipDestroyed = true;
				var allShipsDestroyed = true;
				for (var index in ships) {
					if (ships[index] === ships[i] && !shots[index]) {
						shipDestroyed = false;
						allShipsDestroyed = false;
					} else if (ships[index] && !shots[index]) {
                        allShipsDestroyed = false;
					}
				}

				if (shipDestroyed) {
					alert('Ship Destroyed!');
				}
				if (allShipsDestroyed) {
                    alert('All ships destroyed! You win.');
                    gameEnded = true;
				}
			} else {
				turnCount += 1;
			}
		}

		this.setState({
			ships: ships,
			shots: shots,
			turnCount: turnCount,
			survivorCount: survivorCount,
			gameEnded: gameEnded,
		});
	}

	renderCell(i) {
		var hasShip = this.state.ships[i];
		var wasShot = this.state.shots[i];

        var displayText = '';
        var cellClass = "cell";
		if (hasShip && wasShot) {
            displayText = 'H';
            cellClass += " hit";
		} else if (hasShip && !wasShot) {
            displayText = this.state.ships[i]; // TODO - make it blank, this is just useful debugging.
		} else if (!hasShip && wasShot) {
            displayText = 'M';
        }

		return (
			<Cell
                key={'Cell' + i}
                className={cellClass}
                value={displayText}
                onClick={() => this.handleCellClick(i)}
			/>
		);
	}

	render() {
		const status = <div>Battleships - Turn {this.state.turnCount}</div>;

		let table = [];
		const gridSize = this.state.gridSize;
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
		table = <div>{table}</div>;

		return (
			<div>
				{status}
				{table}
			</div>
		);
	}
}
