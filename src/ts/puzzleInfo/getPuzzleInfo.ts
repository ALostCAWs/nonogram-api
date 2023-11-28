/* ---- Column Quality of Life */
export const convertPuzzleToBoolean = (inputPuzzle: string[][]): boolean[][] => {
  let boolPuzzle: boolean[][] = [];
  return boolPuzzle;
}

export const getColumn = (inputPuzzle: boolean[][], colIndex: number): boolean[] => {
  let column: boolean[] = [];
  for (let i = 0; i < inputPuzzle.length; i++) {
    column.push(inputPuzzle[i][colIndex]);
  }
  return column;
}

export const getPuzzleByColumn = (inputPuzzle: boolean[][]): boolean[][] => {
  let gameByColumn = [];
  for (let i = 0; i < inputPuzzle[0].length; i++) {
    let column = getColumn(inputPuzzle, i);
    gameByColumn.push(column);
  }
  return gameByColumn;
}

/* ---- Dimension */
export const getLongestDimension = (inputPuzzle: boolean[][]): number => {
  return inputPuzzle.length >= inputPuzzle[0].length ? inputPuzzle.length : inputPuzzle[0].length;
}

export const getShortestDimension = (inputPuzzle: boolean[][]): number => {
  return inputPuzzle.length <= inputPuzzle[0].length ? inputPuzzle.length : inputPuzzle[0].length;
}