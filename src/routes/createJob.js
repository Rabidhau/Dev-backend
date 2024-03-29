const express = require("express");
const router = express.Router();

const { getJob } = require("../controllers/createJob");

router.route("/create-job").post(getJob);

module.exports = router;
