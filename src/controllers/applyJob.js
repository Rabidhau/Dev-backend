const conn = require("../db/connection");

const applyJob = async (req, res) => {
  const { applicantId, jobId } = req.body;

  try {
    // Check if the applicantId already exists for the jobId
    const selectQuery = "SELECT candidateId FROM applied_job WHERE jobId = ?";
    conn.query(selectQuery, [jobId], (selectErr, selectResult) => {
      if (selectErr) {
        console.error("Error selecting job from db:", selectErr);
        res.status(400).send("Error selecting job from database");
        return;
      }

      if (selectResult.length > 0) {
        const existingApplicantIds = JSON.parse(selectResult[0].candidateId);
        if (existingApplicantIds.includes(applicantId)) {
          // If the applicantId already exists for the jobId, throw an error
          res.status(400).send("Applicant already applied for this job");
          return;
        }

        // Add the new applicantId to the existing array
        existingApplicantIds.push(applicantId);
        const updatedApplicantIds = JSON.stringify(existingApplicantIds);

        // Update the record with the new applicantIds
        const updateQuery =
          "UPDATE applied_job SET candidateId = ? WHERE jobId = ?";
        const updateValues = [updatedApplicantIds, jobId];

        conn.query(updateQuery, updateValues, (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error updating job in db:", updateErr);
            res.status(400).send("Error updating job in database");
          } else {
            res.status(200).send("Applied job successfully");
          }
        });
      } else {
        // If no record exists, create a new one with the applicantId
        const newApplicantIds = JSON.stringify([applicantId]);
        const insertQuery =
          "INSERT INTO applied_job (jobId, candidateId) VALUES (?, ?)";
        const insertValues = [jobId, newApplicantIds];

        conn.query(insertQuery, insertValues, (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error inserting job in db:", insertErr);
            res.status(400).send("Error inserting job in database");
          } else {
            res.status(200).send("Applied job successfully");
          }
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send(error.message);
  }
};

module.exports = { applyJob };
