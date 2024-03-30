const express = require("express");
const router = express.Router();

const { createJob } = require("../controllers/createJob");
const { getJobById } = require("../controllers/showJob");
const { getAllJobs } = require("../controllers/showAllJobs");

router.route("/create-job").post(createJob);
router.route("/show-all-jobs").get(getAllJobs);
router.route("/show-job/:id").get(getJobById);

module.exports = router;
