const express = require("express");
const { googleLogin } = require("../controller/googleLogin");

const router = express.Router();

router.post("/", googleLogin);

module.exports = router;
