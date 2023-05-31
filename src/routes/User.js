const express = require("express");
const {
     create_user,
     get_user,
     get_users,
     remove_user,
} = require("../controller/User");
const router = express.Router();

router
     .post("/", create_user)
     .get("/:name", get_user)
     .get("/", get_users)
     .delete("/:name", remove_user);

module.exports = router;
