"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importGame = void 0;
const importGame = (puzzleCode) => {
    console.log(puzzleCode);
    // Obtain the boards' width from the puzzleCode & remove it & the separator char from the string
    const spaceIndex = puzzleCode.indexOf('|');
    const boardWidth = puzzleCode.slice(0, spaceIndex);
    console.log(boardWidth);
    puzzleCode = puzzleCode.slice(spaceIndex + 1);
    // Use the boards' width to separate the remainder of the hash into strings of that length
    const hashRows = puzzleCode.match(new RegExp(`.{1,${boardWidth}}`, 'g')) || [];
    // Build puzzleSolution as a 2D array
    // Each newly-separated string in hashRows represents a row on the board, height / columns are not needed to generate the puzzleSolution
    let puzzleSolution = [];
    for (let i = 0; i < hashRows.length; i++) {
        let innerPuzzleSolution = [];
        let hashVal = hashRows[i].split('');
        for (let i = 0; i < hashVal.length; i++) {
            let fillable = hashVal[i] === '1' ? true : false;
            innerPuzzleSolution.push(fillable);
        }
        puzzleSolution.push(innerPuzzleSolution);
    }
    return puzzleSolution;
};
exports.importGame = importGame;
