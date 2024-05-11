const express = require("express");
const router = express.Router();
const { logIn } = require("../controllers/logIn");
const { signUp } = require("../controllers/signUp");
const { verifyToken } = require("../controllers/sendtoken"); // Import the verifyToken function
const { verify } = require("../controllers/verify");
const { info } = require("../controllers/getinfo");
const { updateInfo } = require("../controllers/updateinfo");
const { apply } = require("../controllers/apply");
const { candy } = require("../controllers/getcandidate");

router.route("/sign-up").post(signUp);
router.route("/login").post(logIn);
router.route("/authentication").post(verifyToken); // Add the new route
router.route("/verify-token").post(verify); 
router.route("/user-profile/:userId").get(info); 
router.route("/updateinfo/:userId").post(updateInfo); 
router.route("/candidate/:userId").get(candy); 
router.route("/update_candidate/:userId").post(apply); 
module.exports = router;