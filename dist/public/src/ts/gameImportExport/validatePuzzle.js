"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPuzzleRectangular = exports.checkPuzzleHasOneSolution = exports.checkPuzzleNotBlank = void 0;
// Very basic check, only ensures at least one tile is to be filled in
// Doesn't account for ensuring a puzzle doesn't have multiple feasible solutions based on the hints that will be generated in order to solve it
function checkPuzzleNotBlank(inputPuzzle) {
    for (let i = 0; i < inputPuzzle.length; i++) {
        if (inputPuzzle[i].find((v) => v)) {
            return true;
        }
    }
    return false;
}
exports.checkPuzzleNotBlank = checkPuzzleNotBlank;
// TODO:
// Check for multiple feasible solutions based on the hints that will be generated for the puzzle
function checkPuzzleHasOneSolution(inputPuzzle) {
    return true;
}
exports.checkPuzzleHasOneSolution = checkPuzzleHasOneSolution;
function checkPuzzleRectangular(inputPuzzle) {
    // Ensure all row lengths are equal to the length of the first row
    // Only have to check against the first row due to the import method slicing row by row based on the given width
    // Only have to check rows as unequal columns result in unequal rows & vice-versa
    let rowLengthToEnforce = inputPuzzle[0].length;
    for (let i = 1; i < inputPuzzle.length; i++) {
        if (rowLengthToEnforce !== inputPuzzle[i].length) {
            return false;
        }
    }
    return true;
}
exports.checkPuzzleRectangular = checkPuzzleRectangular;
