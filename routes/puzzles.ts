/* Imports ---- */
import { Router } from "express";
const router = Router();
/* Functions */
import { importGame } from "../public/src/ts/gameImportExport/importGame";
import { checkPuzzleNotBlank, checkPuzzleHasOneSolution, checkPuzzleRectangular } from "../public/src/ts/gameImportExport/validatePuzzle";
/* ---- End */

/* GET puzzles listing. */
// API endpoints
// Returns a single random puzzle
// Adds a new puzzle
// Delete a puzzle
// Updates a puzzle
// Gets a specific puzzle

let puzzles = new Map();
let starterPuzzle = {
  puzzleCode: '5|1111101100010100110001000',
  name: 'Hatsune Miku',
  author: 'Hatsune Miku',
  difficultyRating: 6.89
};
puzzles.set('1', starterPuzzle);
puzzles.set('2', starterPuzzle);

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
  const puzzleCode: string = req.body.puzzleCode;
  const name: string = req.body.name;
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
  // Save puzzle
  // auto-gen Id, difficulty, author
  // input name of puzzle
  let puzzle = {
    puzzleCode: puzzleCode,
    name: name,
    author: author,
    difficultyRating: 2.45
  };
  puzzles.set('3', puzzle);
  res.status(200).send('puzzle created');
});

router.post('/:puzzleId', (req, res, next) => {
  // how to get enough info
  // need Id to find
  // need name of puzzle & puzzleCode
  // auto-gen difficulty & author

  const puzzleId: string = req.params['puzzleId'];
  const puzzleCode: string = req.body.puzzleCode;
  const name: string = req.body.name;
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
  // Update puzzle
  let puzzle = {
    puzzleCode: puzzleCode,
    name: name,
    author: author,
    difficultyRating: 5.32
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
  res.send(puzzles);
});

export { router as PuzzlesRouter };