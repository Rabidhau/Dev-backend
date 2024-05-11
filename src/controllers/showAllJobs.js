const conn = require("../db/connection");

const getAllJobs = async (req, res) => {
  try {
    // Extracting search query from request query parameters
    const { query } = req.query;

    let selectQuery = "SELECT * FROM joblisting";

    // If there's a search query, add it to the SQL query
    if (query) {
      selectQuery += ` WHERE jobTitle LIKE '%${query}%' OR companyName LIKE '%${query}%'`;
    }

    conn.query(selectQuery, (err, result) => {
      if (err) {
        console.error("Error fetching job from db:", err);
        res.status(400).send("Error fetching job from database");
      } else {
        if (result.length === 0) {
          res.status(404).send("Job not found");
        } else {
          const jobs = result;
          res.status(200).send(jobs);
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Error occurred while processing the request");
  }
};

module.exports = { getAllJobs };