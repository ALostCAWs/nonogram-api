"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.HelloRouter = router;
/* GET users listing. */
// API endpoint
// Colon indicates a param
router.get('/', (req, res, next) => {
    res.send(`Hello World!`);
});
/*
var express = require('express');
var router = express.Router();

/* GET users listing. *
// API endpoint
// Colon indicates a param
router.get('/:greeting', function (req, res, next) {
  // Use HTTP query string (the ?s)
  let name = req.query['name'];

  // Use param (the text after /hello/)
  let greeting = req.params['greeting'];
  res.send(`${greeting} ${name} !`);
});

module.exports = router;
*/ 
