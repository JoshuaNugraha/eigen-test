const express = require("express");
const router = express.Router();
const books = require("../controller/books");

router.get("/allBooks", books.getAllBooks);

module.exports = router;
