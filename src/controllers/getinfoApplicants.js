const conn = require("../db/connection");

const getApplicants = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const selectQuery = "SELECT * FROM applied_job WHERE jobID = ?";
    conn.query(selectQuery, [jobId], (err, result) => {
      if (err) {
        console.error("Error fetching info from db:", err);
        res.status(400).send("Error fetching info from database");
      } else {
        if (result.length === 0) {
          res.status(404).send("No data found");
        } else {
          const job = result[0];
          res.status(200).send(job);
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Error occurred while processing the request");
  }
};

module.exports = { getApplicants };
