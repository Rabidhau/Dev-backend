const express = require("express");
const router = express.Router();

const { logIn } = require("../controllers/logIn");
const { signUp } = require("../controllers/signUp");

router.route("/sign-up").post(signUp);
router.route("/login").post(logIn);

module.exports = router;
