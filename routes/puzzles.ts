/* Imports ---- */
import { Router } from "express";
const router = Router();
/* Functions */
import { importGame } from "../src/ts/gameImportExport/importPuzzle";
import { checkPuzzleNotBlank, checkPuzzleHasOneSolution, checkPuzzleRectangular } from "../src/ts/gameImportExport/validatePuzzle";
import { calculateDifficulty } from "../src/ts/gameImportExport/calculateDifficulty";
/* ---- End */

/* GET puzzles listing. */
// API endpoints
// Returns a single random puzzle
// Adds a new puzzle
// Delete a puzzle
// Updates a puzzle
// Gets a specific puzzle

let puzzles = new Map();
let starterPuzzle1_code = '5|1111101100010100110001000';
let starterPuzzle1_difficulty = calculateDifficulty(importGame(starterPuzzle1_code));
let starterPuzzle1 = {
  puzzleId: '1',
  puzzleCode: starterPuzzle1_code,
  puzzleName: 'First Puzzle',
  author: 'First Puzzle',
  difficultyRating: starterPuzzle1_difficulty
};
puzzles.set(starterPuzzle1.puzzleId, starterPuzzle1);

let starterPuzzle2_code = '15|000000000000000000101000000000010000010000000101010101000000100111001000000100010001000000011010110000000010010010000000001101100000000000000000000000000010000000000000000000000000000010101010101000000000000000000000000000000';
let starterPuzzle2_difficulty = calculateDifficulty(importGame(starterPuzzle2_code));
let starterPuzzle2 = {
  puzzleId: '2',
  puzzleCode: starterPuzzle2_code,
  puzzleName: 'Butterfly',
  author: 'BugGuy',
  difficultyRating: starterPuzzle2_difficulty
};
puzzles.set(starterPuzzle2.puzzleId, starterPuzzle2);

router.get('/', (req, res, next) => {
  if (!puzzles.size) {
    res.status(404).send('no puzzles found');
  }
  res.send(puzzles);
});

// Colon indicates a param
router.get('/:puzzleId', (req, res, next) => {
  let puzzleId = req.params['puzzleId'];

  if (!puzzles.has(puzzleId)) {
    res.status(404).send('puzzle not found');
  }
  res.send(puzzles.get(puzzleId));
});

router.post('/create', (req, res, next) => {
  // Get user-input puzzle info from request body
  const puzzleCode: string = req.body.puzzleCode;
  const puzzleName: string = req.body.puzzleName;
  const author: string = req.body.author;
  const puzzleSolution: boolean[][] = importGame(puzzleCode);

  if (!checkPuzzleNotBlank(puzzleSolution)) {
    res.status(400).send('puzzle blank');
  }
  if (!checkPuzzleHasOneSolution(puzzleSolution)) {
    res.status(400).send('puzzle has multiple solutions');
  }
  if (!checkPuzzleRectangular(puzzleSolution)) {
    res.status(400).send('irregular puzzle');
  }

  // Generate the auto-generated puzzle info not found in the request body
  // const id = // generate puzzleId ( string )
  const puzzleId = '3';
  const difficultyRating = calculateDifficulty(puzzleSolution);

  // Save puzzle
  let puzzle = {
    puzzleId: puzzleId,
    puzzleCode: puzzleCode,
    puzzleName: puzzleName,
    author: author,
    difficultyRating: difficultyRating
  };
  //puzzles.set(id, puzzle);
  puzzles.set(puzzleId, puzzle);

  res.status(200).send('puzzle created');
});

router.post('/update', (req, res, next) => {
  // Get user-inputted puzzle info from request body
  const puzzleId: string = req.body.puzzleId;
  const puzzleCode: string = req.body.puzzleCode;
  const puzzleName: string = req.body.puzzleName;
  const author: string = req.body.author;
  const puzzleSolution: boolean[][] = importGame(puzzleCode);

  if (!puzzles.has(puzzleId)) {
    res.status(404).send('puzzle not found');
  }
  if (!checkPuzzleNotBlank(puzzleSolution)) {
    res.status(400).send('puzzle blank');
  }
  if (!checkPuzzleHasOneSolution(puzzleSolution)) {
    res.status(400).send('puzzle has multiple solutions');
  }
  if (!checkPuzzleRectangular(puzzleSolution)) {
    res.status(400).send('irregular puzzle');
  }

  // Generate the auto-generated puzzle info not found in the request body
  const difficultyRating = calculateDifficulty(puzzleSolution);

  // Update puzzle
  let puzzle = {
    puzzleId: puzzleId,
    puzzleCode: puzzleCode,
    puzzleName: puzzleName,
    author: author,
    difficultyRating: difficultyRating
  };
  puzzles.set(puzzleId, puzzle);

  res.status(200).send('puzzle updated');
});

router.get('/delete/:puzzleId', (req, res, next) => {
  let puzzleId = req.params['puzzleId'];

  if (!puzzles.has(puzzleId)) {
    res.status(404).send('puzzle not found');
  }
  // Remove puzzle
  puzzles.delete(puzzleId);
  res.send('puzzle deleted');
});

export { router as PuzzlesRouter };