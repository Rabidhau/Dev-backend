const conn = require("../db/connection");

const candidateJob = async (req, res) => {
  try {
    const { candidateId, jobInfo } = req.body;
    console.log("Received candidateId:", candidateId);
    console.log("Received jobInfo:", jobInfo);

    // Retrieve the current job information for the candidate
    const currentData = await conn.query(
      "SELECT job_info FROM candidate_jobs WHERE candidateId = ?",
      [candidateId]
    );

    let updatedJobInfo = [];

    if (currentData.length > 0) {
      // Parse the existing job information if it exists
      updatedJobInfo = JSON.parse(currentData[0].job_info);
    }

    // Add the new job information
    updatedJobInfo.push(jobInfo);

    // Upsert the job information
    await conn.query(
      "INSERT INTO candidate_jobs (candidateId, job_info) VALUES (?, ?) ON DUPLICATE KEY UPDATE job_info = ?",
      [candidateId, JSON.stringify(updatedJobInfo), JSON.stringify(updatedJobInfo)]
    );

    res.status(200).send("Job information updated successfully.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { candidateJob };
