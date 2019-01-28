export const GetCellIndexFromCoordinates = function (x, y, gridSize) {
    return x + (y * gridSize);
};

export const RandNum = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
};