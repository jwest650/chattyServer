const express = require("express");
const { chats, getFriends } = require("../controller/chats");
const router = express.Router();

router.post("/", chats).get("/:host", getFriends);
module.exports = router;
