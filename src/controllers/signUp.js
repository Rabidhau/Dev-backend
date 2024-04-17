const conn = require("../db/connection");
const { v4: uuidv4 } = require("uuid");

const signUp = async (req, res) => {
  const { fullName, email, password, selectedOption } = req.body;

  // Generate userId using uuidv4
  const userId = uuidv4();

  // Log the length of userId
  console.log("Generated userId length:", userId.length);

  const sql =
    "INSERT INTO Users (userId, email, username, password, role) VALUES (?, ?, ?, ?, ?)";
  const values = [userId, email, fullName, password, selectedOption];

  // Log the SQL query string
  console.log("SQL query:", sql);

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error signing up:", err);
      res.status(500).send("Error signing up");
    } else {
      console.log("Signup successful");
      res.status(200).send("Signup successful");
    }
  });
};

module.exports = { signUp };
