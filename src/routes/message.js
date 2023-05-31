const express = require("express");
const { getMessages } = require("../controller/chats");
const { update_seen } = require("../controller/message");
const router = express.Router();

router.get("/:room", getMessages);
router.put("/seen", update_seen);

module.exports = router;
