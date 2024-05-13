const conn = require("../db/connection");

const applyJob = async (req, res) => {
  const { applicantId, jobId } = req.body;

  try {
    // Check if the applicantId already exists for the jobId
    const selectQuery =
      "SELECT applicant_ids FROM applied_job WHERE job_id = ?";
    conn.query(selectQuery, [jobId], (selectErr, selectResult) => {
      if (selectErr) {
        console.error("Error selecting job from db:", selectErr);
        res.status(400).send("Error selecting job from database");
        return;
      }

      if (selectResult.length > 0) {
        const existingApplicantIds = selectResult[0].applicant_ids;
        if (
          existingApplicantIds &&
          existingApplicantIds.split(",").includes(applicantId.toString())
        ) {
          // If the applicantId already exists for the jobId, throw an error
          throw new Error("Applicant already applied for this job");
        }
      }

      // If the applicantId doesn't exist for the jobId, proceed with inserting or updating
      const updateQuery =
        "INSERT INTO applied_job (job_id, applicant_ids) VALUES (?, ?) ON DUPLICATE KEY UPDATE applicant_ids = ?";
      const values = [jobId, applicantId, applicantId];

      conn.query(updateQuery, values, (err, result) => {
        if (err) {
          console.error("Error inserting/updating job in db:", err);
          res.status(400).send("Error inserting/updating job in database");
        } else {
          res.status(200).send("Applied job successfully");
        }
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send(error.message);
  }
};

module.exports = { applyJob };
