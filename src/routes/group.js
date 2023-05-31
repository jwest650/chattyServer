const express = require("express");
const {
     createGroup,
     getGroup,
     addFriendToGroup,
     getGroupMessages,
} = require("../controller/group");

const router = express.Router();

router
     .post("/", createGroup)
     .get("/:name", getGroup)
     .post("/add", addFriendToGroup)
     .get("/messages/:roomId", getGroupMessages);

module.exports = router;
