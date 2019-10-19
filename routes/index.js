const path = require("path");
const router = require("express").Router();
const books = require("./books");

router.use("/api/books", books);

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;



// test
// const express = require("express");
// const app = express();
// const books = require("./books");

// const test = app.use("/api/books", books);

// module.exports = test;

