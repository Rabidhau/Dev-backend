const conn = require("../db/connection");

const candidateJob = async (req, res) => {
  try {
    const { candidateId, jobInfo } = req.body; // jobInfo: { jobId: "", status: false }

    // Check if the candidate already exists
    let candidateJobs = await conn.query(
      "SELECT * FROM candidate_jobs WHERE candidateId = ?",
      [candidateId]
    );

    if (candidateJobs.length === 0) {
      // If candidate doesn't exist, insert new record with an array containing the first job
      await conn.query(
        "INSERT INTO candidate_jobs (candidateId, job_info) VALUES (?, ?)",
        [candidateId, JSON.stringify([jobInfo])]
      );
    } else {
      // If candidate exists, check if job already exists
      const existingJobIndex = candidateJobs[0].job_info.findIndex(
        (job) => job.jobId === jobInfo.jobId
      );
      if (existingJobIndex !== -1) {
        // If job already exists, update status
        candidateJobs[0].job_info[existingJobIndex] = jobInfo;
        await conn.query(
          "UPDATE candidate_jobs SET job_info = ? WHERE candidateId = ?",
          [JSON.stringify(candidateJobs[0].job_info), candidateId]
        );
      } else {
        // If job doesn't exist, add new job info
        candidateJobs[0].job_info.push(jobInfo);
        await conn.query(
          "UPDATE candidate_jobs SET job_info = ? WHERE candidateId = ?",
          [JSON.stringify(candidateJobs[0].job_info), candidateId]
        );
      }
    }

    res.status(200).send("Job information updated successfully.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { candidateJob };
