const express = require("express");
const { login } = require("../controller/login");
const { encode, decode } = require("../middlewares/middleware");

const router = express.Router();

router.post("/", encode, login);

module.exports = router;
