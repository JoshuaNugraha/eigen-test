const express = require("express");
const router = express.Router();
const borrow = require("../controller/borrow");

router.post("/borrowBook", borrow.doBorrow);
router.post("/returnBook", borrow.returnBook);

module.exports = router;
