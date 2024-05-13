const conn = require("../db/connection");

const info = async (req, res) => {
  const companyName = req.params.company_name;
  try {
    const selectQuery = "SELECT * FROM joblisting WHERE emailAddress = ?";
    conn.query(selectQuery, [companyName], (err, result) => {
      if (err) {
        console.error("Error fetching info from db:", err);
        res.status(400).send("Error fetching info from database");
      } else {
        if (result.length === 0) {
          res.status(404).send("No data found");
        } else {
          res.status(200).send(result);
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Error occurred while processing the request");
  }
};

module.exports = { info };
