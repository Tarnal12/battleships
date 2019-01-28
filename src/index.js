import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './components/board';
import { shipSizes, gridSize, gameEvents } from './constants'

class Battleships extends React.Component {
    state = {
        gridSize: gridSize,
        shipSizes: shipSizes,
        turnCount: 1,
        gameEnded: false,
        ships: this.seedShips(gridSize, shipSizes),
        shots: Array(gridSize * gridSize).fill(false),
        lastEvent: null,
    }

	handleNewGame() {
		const gridSize = this.state.gridSize;
		const shipSizes = this.state.shipSizes;
		let ships = this.seedShips(gridSize, shipSizes);
		this.setState({
			gridSize,
			turnCount: 1,
			gameEnded: false,
			ships,
			shots: Array(gridSize * gridSize).fill(false),
			lastEvent: null,
		});
	}

	seedShips(gridSize, shipSizes) {
		const GetCellIndexFromCoordinates = function(x, y) {
			return x + y * gridSize;
		};

		const RandNum = function(max) {
			return Math.floor(Math.random() * Math.floor(max));
		};

		let ships = Array(gridSize * gridSize).fill(null);

		for (let i = 0; i < shipSizes.length; i++) {
			const newShips = ships.slice();
			let isValidPlacement = true;
			const shipSize = shipSizes[i];

			const isVertical = RandNum(2) === 1;
			const startX = RandNum(
				isVertical ? gridSize - shipSize + 1 : gridSize
			);
            const startY = RandNum(
				!isVertical ? gridSize - shipSize + 1 : gridSize
			);

			for (let offset = 0; offset < shipSize; offset++) {
                const index = isVertical
                    ? GetCellIndexFromCoordinates(startX + offset, startY, gridSize)
                    : GetCellIndexFromCoordinates(startX, startY + offset, gridSize);

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
		let ships = this.state.ships.slice();
        let shots = this.state.shots.slice();
		const gridSize = this.state.gridSize;
		let lastEvent = null;
		let turnCount = this.state.turnCount;
		let gameEnded = this.state.gameEnded;
		if (i < 0 || i >= gridSize * gridSize || shots[i] || gameEnded) {
			return;
		} else {
			shots[i] = true;
			if (ships[i]) {
				let shipDestroyed = true;
                let allShipsDestroyed = true;
				for (const index in ships) {
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
			ships,
			shots,
			turnCount,
			gameEnded,
			lastEvent,
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
