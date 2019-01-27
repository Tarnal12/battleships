import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './components/board';

class Battleships extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
                    <button className="newgame" onClick={() => this.handleNewGame()}>
                        New Game
                    </button>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(<Battleships />, document.getElementById('root'));
