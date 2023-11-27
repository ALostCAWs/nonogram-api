"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports ---- */
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
/* Routers */
const puzzles_1 = require("./routes/puzzles");
/* ---- End */
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
/* Middlewares */
// Intercept requests before they get to the code (sometimes called filters)
// Can make changes to the request or response
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// URL decodes Payloads it receives
// URL encoding makes it safe to use special chars in URL
// Will need to URL Encode stuff when calling it, won't need to decode within the APIs because this handles it
app.use(express_1.default.urlencoded({ extended: false }));
/* Routers */
app.use('/puzzles', puzzles_1.PuzzlesRouter);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is running');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
