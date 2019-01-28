import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './components/board';
import * as constants from './constants';
import * as shipPlacer from './components/shipplacer';

class Battleships extends React.Component {
	state = {
		turnCount: 1,
		gameEnded: false,
		ships: this.seedShips(constants.gridSize, constants.shipSizes),
		shots: Array(constants.gridSize * constants.gridSize).fill(false),
		lastEvent: null,
	};

	handleNewGame() {
		this.setState({
			turnCount: 1,
			gameEnded: false,
			ships: this.seedShips(constants.gridSize, constants.shipSizes),
			shots: Array(constants.gridSize * constants.gridSize).fill(false),
			lastEvent: null,
		});
	}

	seedShips(gridSize, shipSizes) {
		let ships = Array(gridSize * gridSize).fill(null);

		for (let i = 0; i < shipSizes.length; i++) {
            const shipSize = shipSizes[i];
            ships = shipPlacer.placeShipAtRandom(ships, gridSize, shipSize, i + 1);
		}

		return ships;
	}

	handleCellClick(i) {
		let shots = this.state.shots.slice();
		let lastEvent = null;
		let turnCount = this.state.turnCount;
		let gameEnded = this.state.gameEnded;
		if (
			i < 0 ||
			i >= constants.gridSize * constants.gridSize ||
			shots[i] ||
			gameEnded
		) {
			return;
		} else {
			shots[i] = true;
			if (this.state.ships[i]) {
				let shipDestroyed = true;
				let allShipsDestroyed = true;
				for (const index in this.state.ships) {
					if (
						this.state.ships[index] === this.state.ships[i] &&
						!shots[index]
					) {
						shipDestroyed = false;
						allShipsDestroyed = false;
					} else if (this.state.ships[index] && !shots[index]) {
						allShipsDestroyed = false;
					}
				}

				if (shipDestroyed) {
					lastEvent = constants.gameEvents.SHIP_DESTROYED;
				}
				if (allShipsDestroyed) {
					lastEvent = constants.gameEvents.GAME_ENDED;
					gameEnded = true;
				}
			} else {
				turnCount += 1;
			}
		}

		this.setState({
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
						gridSize={constants.gridSize}
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
