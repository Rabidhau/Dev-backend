const { v4: uuidv4 } = require("uuid");
const conn = require("../db/connection");

const createJob = async (req, res) => {
  const {
    companyName,
    jobTitle,
    location,
    emailAddress,
    requirement,
    jobDetails,
    submitBy,
    category,
  } = req.body;

  try {
    // Generate a unique ID for the job entry
    const jobId = uuidv4();

    const insertQuery =
      "INSERT INTO joblisting (id, companyName, jobTitle, location, emailAddress, requirement1, requirement2, requirement3, requirement4, jobDetails, submitBy, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      jobId,
      companyName,
      jobTitle,
      location,
      emailAddress,
      requirement[0],
      requirement[1],
      requirement[2],
      requirement[3],
      jobDetails,
      submitBy,
      category,
    ];

    conn.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting job in db:", err);
        res.status(400).send("Error inserting job in database");
      } else {
        res.status(200).send("Created job successfully");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Error occurred while processing the request");
  }
};

module.exports = { createJob };
