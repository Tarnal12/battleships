import * as utils from '../utils';

export function placeShipAtRandom(existingShips, gridSize, shipLength, shipId) {
	while (true) {
		const isVertical = utils.RandNum(2) === 1;
		const startX = isVertical
			? utils.RandNum(gridSize)
			: utils.RandNum(gridSize - shipLength + 1);
		const startY = isVertical
			? utils.RandNum(gridSize - shipLength + 1)
			: utils.RandNum(gridSize);

		const targetIndices = getTargettedIndices(
			startX,
			startY,
			isVertical,
			shipLength,
			gridSize
		);
		if (isValidPlacement(existingShips, targetIndices)) {
			return placeShip(existingShips, targetIndices, shipId);
		}
	}
}

function isValidPlacement(grid, targetIndices) {
	for (let index in targetIndices) {
		if (grid[targetIndices[index]]) {
			return false;
		}
	}
	return true;
}

function placeShip(grid, targetIndices, shipID) {
	for (let index in targetIndices) {
		grid[targetIndices[index]] = 'S' + shipID;
	}

	return grid;
}

function getTargettedIndices(x, y, isVertical, shipLength, gridSize) {
	const indices = [];
	for (let i = 0; i < shipLength; i++) {
		indices.push(utils.GetCellIndexFromCoordinates(x, y, gridSize));
		isVertical ? (y += 1) : (x += 1);
	}
	return indices;
}
