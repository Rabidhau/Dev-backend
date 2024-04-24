const conn = require("../db/connection");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

// Function to hash a password using MD5
const md5Hash = (password) => {
  const hash = crypto.createHash("md5");
  hash.update(password);
  return hash.digest("hex");
};

const signUp = async (req, res) => {
  const { fullName, email, password, selectedOption } = req.body;

  const hashedPassword = md5Hash(password);

  // Generate userId using uuidv4
  const userId = uuidv4();

  const sql =
    "INSERT INTO Users (userId, email, username, password, role) VALUES (?, ?, ?, ?, ?)";
  const values = [userId, email, fullName, hashedPassword, selectedOption];

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

module.exports = { signUp, md5Hash };
