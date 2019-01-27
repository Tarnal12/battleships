import React from 'react';
import { Cell } from './cell';
import { CellState } from './cellstate';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        const gridSize = 10
        const shipSizes = [5, 4, 4];
        let cells = this.seedShips(gridSize, shipSizes);
        this.state = {
            gridSize: gridSize,
            turnCount: 1,
            gameEnded: false,
            cells: cells,
            survivorCount: shipSizes.length, 
        };
    }

    seedShips(gridSize, shipSizes) {
        // Func to get the cell index from an x,y coordinate
        var GetIndex = function(x, y) {
            return x + (y * gridSize);
        }

        // Func to get a random number between between 0 (inclusive) and less than max (exclusive)
        var RandNum = function (max) {
            max = Math.floor(max);
            return Math.floor(Math.random() * (max));
        }

        var cells = Array(gridSize * gridSize).fill(CellState.CLEAR)

        for (let i = 0; i < shipSizes.length; i++) {
            let newCells = cells.slice();
            let isValidPlacement = true;
            const shipSize = shipSizes[i];

            const isVertical = RandNum(2) === 1;
            let startX = RandNum( isVertical ? gridSize - shipSize + 1 : gridSize);
            let startY = RandNum(!isVertical ? gridSize - shipSize + 1 : gridSize);

            for (let offset = 0; offset < shipSize; offset++) {
                var index = isVertical ?
                    GetIndex(startX + offset, startY, gridSize) :
                    GetIndex(startX, startY + offset, gridSize);

                if (newCells[index] === CellState.CLEAR) {
                    newCells[index] = "S" + i;
                }
                else {
                    isValidPlacement = false;
                    break;
                }
            }

            if (isValidPlacement) {
                cells = newCells;
            }
            else {
                i--;
            }
        }

        return cells;
    }

    handleCellClick(i) {
        const cells = this.state.cells.slice();
        const gridSize = this.state.gridSize;
        let turnCount = this.state.turnCount;
        let survivorCount = this.state.survivorCount;
        let gameEnded = this.state.gameEnded;
        if (i < 0 || i > gridSize * gridSize || cells[i] === CellState.HIT || cells[i] === CellState.MISS || gameEnded) {
            // Out of bounds (somehow,) gane is over, or re-targetting a previously targetted cell -> nothing to do
            return;
        }
        else if (cells[i] === CellState.CLEAR) {
            cells[i] = CellState.MISS;
            turnCount += 1;
        }
        else {
            let hitShip = cells[i]
            cells[i] = CellState.HIT

            if (!cells.includes(hitShip)) {
                alert('Ship Down!');
                survivorCount -= 1;
                if (survivorCount === 0) {
                    alert('You win!');
                    gameEnded = true;
                }
            }
        }

        this.setState({
            cells: cells,
            turnCount: turnCount,
            survivorCount: survivorCount, 
            gameEnded: gameEnded, 
        });
    }

    renderCell(i) {
        return (
            <Cell
                key={'Cell' + i}
                value={this.state.cells[i]}
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
                let cellIndex = (y * gridSize) + x;
                row.push(this.renderCell(cellIndex));
            }
            table.push(<div className="board-row" key={'Row' + y}>{row}</div>)
        }
        table = <div>{table}</div>

        return (
            <div>
                {status}
                {table}
            </div>
        );
    }
}