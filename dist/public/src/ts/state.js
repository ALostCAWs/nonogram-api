"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hintState = exports.fillState = void 0;
/* ---- Enums for state */
exports.fillState = {
    empty: '',
    filled: 'filled',
    error: 'error',
    marked: 'marked',
    complete: 'marked complete'
};
exports.hintState = {
    incomplete: '',
    fullLineIncomplete: 'fullLineIncomplete',
    zero: 'zeroHint',
    complete: 'completeHint'
};
