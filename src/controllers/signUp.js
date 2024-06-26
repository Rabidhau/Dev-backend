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

  try {
    // Validate password using regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send("Password does not meet complexity requirements");
    }

    // Generate userId using uuidv4
    const userId = uuidv4();

    // Hash the password
    const hashedPassword = md5Hash(password);

    const sqlUser = "INSERT INTO Users (userId, email, username, password, role) VALUES (?, ?, ?, ?, ?)";
    const valuesUser = [userId, email, fullName, hashedPassword, selectedOption];

    // Execute query to insert user into Users table
    await conn.query(sqlUser, valuesUser);

    // If the role is recruiter, insert user info into recruiter_info table
    if (selectedOption === "Recruiter") {
      const sqlRecruiter = "INSERT INTO recruiter_info (id, name, email) VALUES (?, ?, ?)";
      const valuesRecruiter = [userId, fullName, email];
      await conn.query(sqlRecruiter, valuesRecruiter);
    }
    if (selectedOption === "Candidate") {
      const sqlCandidate = "INSERT INTO candidate_info (id, name, email) VALUES (?, ?, ?)";
      const valuesCandidate = [userId, fullName, email];
      await conn.query(sqlCandidate, valuesCandidate);
    }
    console.log("Signup successful");
    return res.status(200).send("Signup successful");
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).send("Error signing up");
  }
};

module.exports = { signUp, md5Hash };
