"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameByColumn = exports.getColumn = exports.convertPuzzleToBoolean = void 0;
/* ---- Column Quality of Life */
const convertPuzzleToBoolean = (inputPuzzle) => {
    let boolPuzzle = [];
    return boolPuzzle;
};
exports.convertPuzzleToBoolean = convertPuzzleToBoolean;
const getColumn = (inputPuzzle, colIndex) => {
    let column = [];
    for (let i = 0; i < inputPuzzle.length; i++) {
        column.push(inputPuzzle[i][colIndex]);
    }
    return column;
};
exports.getColumn = getColumn;
const getGameByColumn = (inputPuzzle) => {
    let gameByColumn = [];
    for (let i = 0; i < inputPuzzle[0].length; i++) {
        let column = (0, exports.getColumn)(inputPuzzle, i);
        gameByColumn.push(column);
    }
    return gameByColumn;
};
exports.getGameByColumn = getGameByColumn;
