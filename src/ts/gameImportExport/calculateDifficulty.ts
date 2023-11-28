/* Imports ---- */
import { getPuzzleByColumn, getShortestDimension } from "../puzzleInfo/getPuzzleInfo";
/* ---- End */

// Nonogram difficulty is based on a number of factors; size, empty / full lines, & single solution lines
// Size is used to determine the base difficulty of a puzzle
// Empty / full lines are highlighted to the player, making puzzles with any number of them easier
// These are technically single solution lines, but have such an impact on the difficulty that they need to be considered separately
// Single solution lines are lines that can be solved in only one feasible way
// i.e., a line on a 10x10 puzzle with the hints 7 & 2

// Currently, only ease is considered when determining the difficulty of a puzzle
// 15|000000000000000000101000000000010000010000000101010101000000100111001000000100010001000000011010110000000010010010000000001101100000000000000000000000000010000000000000000000000000000010101010101000000000000000000000000000000
export const calculateDifficulty = (puzzleSolution: boolean[][]): number => {
  let difficulty = getShortestDimension(puzzleSolution);
  const puzzleSolutionByColumn = getPuzzleByColumn(puzzleSolution);

  const emptyRowCount = getEmptyLineCount(puzzleSolution);
  const emptyColCount = getEmptyLineCount(puzzleSolutionByColumn);
  const emptyCount = emptyRowCount + emptyColCount;

  const fullRowCount = getFullLineCount(puzzleSolution);
  const fullColCount = getFullLineCount(puzzleSolutionByColumn);
  const fullCount = fullRowCount + fullColCount;

  const singleSolutionRowCount = getSingleSolutionLineCount(puzzleSolution);
  const singleSolutionColCount = getSingleSolutionLineCount(puzzleSolutionByColumn);
  const singleSolutionCount = singleSolutionRowCount + singleSolutionColCount;

  difficulty = difficulty - (emptyCount + fullCount + (singleSolutionCount / 2));
  if (difficulty < 0) {
    difficulty = 0;
  }
  if (difficulty > 10) {
    difficulty = 10;
  }
  return difficulty;
}

const getEmptyLineCount = (puzzleSolution: boolean[][]): number => {
  let count = 0;
  for (let i = 0; i < puzzleSolution.length; i++) {
    const line = puzzleSolution[i];
    if (line.indexOf(true) === -1) {
      count++;
    }
  }
  return count;
}

const getFullLineCount = (puzzleSolution: boolean[][]): number => {
  let count = 0;
  for (let i = 0; i < puzzleSolution.length; i++) {
    const line = puzzleSolution[i];
    if (line.indexOf(false) === -1) {
      count++;
    }
  }
  return count;
}

const getSingleSolutionLineCount = (puzzleSolution: boolean[][]): number => {
  let count = 0;

  const isSingleSolutionLine = (line: boolean[]): boolean => {
    // Skip if line is empty or full
    // These are technically single - solution, but are considered to make a puzzle easier than what is being checked for here
    if (line.indexOf(true) === -1 || line.indexOf(false) === -1) {
      return false;
    }

    // Falses cannot be at position 0 or -1
    if (line[0] === false || line[line.length - 1] === false) {
      return false;
    }

    // Falses cannot be adjacent
    for (let i = 0; i < line.length; i++) {
      // Skip final tile lookahead ( nothing to lookahead at )
      if (i === line.length - 1) {
        break;
      }

      // Check if item ahead is also false ( adjacent false means that the line has multiple feasible solutions )
      if (line[i] === false && line[i + 1] === false) {
        return false;
      }
    }
    return true;
  }

  for (let i = 0; i < puzzleSolution.length; i++) {
    const line = puzzleSolution[i];
    if (isSingleSolutionLine(line)) {
      count++;
    }
  }
  return count;
}