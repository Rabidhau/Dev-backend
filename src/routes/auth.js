const express = require("express");
const router = express.Router();

const { logIn } = require("../controllers/logIn");
const { signUp } = require("../controllers/signUp");

router.route("/signup").post(signUp);
router.route("/signin").post(logIn);

module.exports = router;
