const conn = require("../db/connection");

const getAllJobs = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM joblisting";
    conn.query(selectQuery, (err, result) => {
      if (err) {
        console.error("Error fetching job from db:", err);
        res.status(400).send("Error fetching job from database");
      } else {
        if (result.length === 0) {
          res.status(404).send("Job not found");
        } else {
          const job = result;
          res.status(200).send(job);
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Error occurred while processing the request");
  }
};

module.exports = { getAllJobs };
