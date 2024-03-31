const conn = require("../db/connection");

const getJobById = async (req, res) => {
  const jobId = req.params.id; // pass jobId as a parameter in the URL

  try {
    const selectQuery = "SELECT * FROM joblisting WHERE id = ?";
    conn.query(selectQuery, [jobId], (err, result) => {
      if (err) {
        console.error("Error fetching job from db:", err);
        res.status(400).send("Error fetching job from database");
      } else {
        if (result.length === 0) {
          res.status(404).send("Job not found");
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

module.exports = { getJobById };
