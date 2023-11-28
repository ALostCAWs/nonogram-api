// Very basic check, only ensures at least one tile is to be filled in
// Doesn't account for ensuring a puzzle doesn't have multiple feasible solutions based on the hints that will be generated in order to solve it
export function checkPuzzleNotBlank(inputPuzzle: boolean[][]): boolean {
  for (let i = 0; i < inputPuzzle.length; i++) {
    if (inputPuzzle[i].find((v) => v)) {
      return true;
    }
  }
  return false;
}

// TODO:
// Check for multiple feasible solutions based on the hints that will be generated for the puzzle
export function checkPuzzleHasOneSolution(inputPuzzle: boolean[][]): boolean {
  return true;
}

export function checkPuzzleRectangular(inputPuzzle: boolean[][]): boolean {
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