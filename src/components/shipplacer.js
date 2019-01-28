import * as utils from '../utils';

export function isValidPlacement(grid, gridSize, x, y, isVertical, shipLength) {
    const targetIndices = getTargettedIndices(x, y, isVertical, shipLength, gridSize);
	for (let index in targetIndices) {
        if (grid[targetIndices[index]]) {
			return false;
		}
	}
	return true;
}

export function placeShip(grid, gridSize, x, y, isVertical, shipLength, shipID) {
    const targetIndices = getTargettedIndices(x, y, isVertical, shipLength, gridSize);
    for (let index in targetIndices) {
        grid[targetIndices[index]] = "S" + shipID;
	}

	return grid;
}

function getTargettedIndices(x, y, isVertical, shipLength, gridSize) {
    const indices = []
    for (let i = 0; i < shipLength; i++) {
        indices.push(utils.GetCellIndexFromCoordinates(x, y, gridSize));
        isVertical ? x += 1 : y += 1;
    }
    return indices;
}
