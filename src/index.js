import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './components/board';

const gameEvents = {
	SHIP_DESTROYED: 'Ship Destroyed!',
	GAME_ENDED: 'All ships destroyed!',
};

class Battleships extends React.Component {
	constructor(props) {
		super(props);
		const gridSize = 10;
		const shipSizes = [5, 4, 4];
		let ships = this.seedShips(gridSize, shipSizes);
		this.state = {
			gridSize: gridSize,
			shipSizes: shipSizes,
			turnCount: 1,
			gameEnded: false,
			ships: ships,
			shots: Array(gridSize * gridSize).fill(false),
			lastEvent: null,
		};
	}

	handleNewGame() {
		const gridSize = this.state.gridSize;
		const shipSizes = this.state.shipSizes;
		let ships = this.seedShips(gridSize, shipSizes);
		this.setState({
			gridSize: gridSize,
			turnCount: 1,
			gameEnded: false,
			ships: ships,
			shots: Array(gridSize * gridSize).fill(false),
			lastEvent: null,
		});
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
		let lastEvent = null;
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
					lastEvent = gameEvents.SHIP_DESTROYED;
				}
				if (allShipsDestroyed) {
					lastEvent = gameEvents.GAME_ENDED;
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
			lastEvent: lastEvent,
		});
	}

	render() {
		const turnTracker = (
			<div>Battleships - Turn {this.state.turnCount}</div>
		);
		let turnReport = null;
		if (this.state.lastEvent) {
            turnReport = <div className="sitrep">{this.state.lastEvent}</div>;
		}
		return (
			<div className="game">
				{turnTracker}
				<div>
					<Board
						ships={this.state.ships}
						shots={this.state.shots}
						gridSize={this.state.gridSize}
						onClick={i => this.handleCellClick(i)}
					/>
				</div>
				<div>
					{turnReport}
					<button
						className="newgame"
						onClick={() => this.handleNewGame()}
					>
						New Game
					</button>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(<Battleships />, document.getElementById('root'));
