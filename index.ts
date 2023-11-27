/* Imports ---- */
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
/* Routers */
import { PuzzlesRouter } from './routes/puzzles';
/* ---- End */

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

/* Middlewares */
// Intercept requests before they get to the code (sometimes called filters)
// Can make changes to the request or response
app.use(express.json());
app.use(cors());
// URL decodes Payloads it receives
// URL encoding makes it safe to use special chars in URL
// Will need to URL Encode stuff when calling it, won't need to decode within the APIs because this handles it
app.use(express.urlencoded({ extended: false }));

/* Routers */
app.use('/puzzles', PuzzlesRouter);

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server is running');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});