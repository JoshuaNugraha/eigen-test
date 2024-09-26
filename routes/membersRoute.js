const express = require("express");
const router = express.Router();
const members = require("../controller/members");

router.get("/allMembers", members.getAllMembers);

module.exports = router;
