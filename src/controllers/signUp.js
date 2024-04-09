const conn = require("../db/connection");
const { v4: uuidv4 } = require("uuid");

const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  const userId = uuidv4();

  const sql =
    "INSERT INTO Users (userId, email, username, password) VALUES (?, ?, ?, ?)";
  const values = [userId, email, fullName, password];

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
//exporting
module.exports = { signUp };
