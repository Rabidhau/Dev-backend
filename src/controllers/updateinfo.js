const conn = require("../db/connection");

const updateInfo = async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  try {
    const updateQuery = "UPDATE recruiter_info SET ? WHERE id = ?";
    conn.query(updateQuery, [updatedData, userId], (err, result) => {
      if (err) {
        console.error("Error updating info in db:", err);
        res.status(400).send("Error updating info in database");
      } else {
        if (result.affectedRows === 0) {
          res.status(404).send("No data found for update");
        } else {
          res.status(200).send("Recruiter information updated successfully");
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Error occurred while processing the request");
  }
};

module.exports = { updateInfo };