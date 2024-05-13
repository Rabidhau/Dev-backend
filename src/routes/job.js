const express = require("express");
const router = express.Router();

const { createJob } = require("../controllers/createJob");
const { getJobById } = require("../controllers/showJob");
const { getAllJobs } = require("../controllers/showAllJobs");
const { info } = require("../controllers/getjobs");
const { applyJob } = require("../controllers/applyJob");

router.route("/create-job").post(createJob);
router.route("/show-all-jobs").get(getAllJobs);
router.route("/show-job/:id").get(getJobById);
router.route("/created-jobs/:company_name").get(info);
router.route("/apply-job").post(applyJob);

module.exports = router;
