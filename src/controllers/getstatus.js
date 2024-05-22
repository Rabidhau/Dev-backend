const conn = require("../db/connection");

const getStatus = async (req, res) => {
  const { candidateId, jobId } = req.query;

  try {
    console.log("Received candidateId:", candidateId);
    console.log("Received jobId:", jobId);

    // Retrieve the job_info JSON data for the specified candidateId
    const result = await conn.query(
      "SELECT job_info FROM candidate_jobs WHERE candidateId = ?",
      [candidateId]
    );

    if (result.length > 0) {
      const jobInfo = result[0]["job_info"];

      // Check if job_info is not NULL or empty
      if (jobInfo) {
        const parsedJobInfo = JSON.parse(jobInfo);

        // Find the specific job by jobId
        const job = parsedJobInfo.find((job) => job.jobId === jobId);

        if (job) {
          res.status(200).send({ status: job.status });
        } else {
          res.status(404).send("Job information not found.");
        }
      } else {
        res.status(404).send("Job information not found (job_info is NULL or empty).");
      }
    } else {
      res.status(404).send("Candidate information not found.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getStatus };
