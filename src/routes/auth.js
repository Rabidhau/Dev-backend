const express = require("express");
const router = express.Router();
const { logIn } = require("../controllers/logIn");
const { signUp } = require("../controllers/signUp");
const { verifyToken } = require("../controllers/sendtoken"); // Import the verifyToken function

router.route("/sign-up").post(signUp);
router.route("/login").post(logIn);
router.route("/authentication").post(verifyToken); // Add the new route

module.exports = router;