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
    // Check if email already exists
    const checkEmailQuery = "SELECT COUNT(*) AS count FROM Users WHERE email = ?";
    const emailExists = await conn.query(checkEmailQuery, [email]);

    if (emailExists[0].count > 0) {
      return res.status(400).send("Email already exists");
    }

    // Validate password using regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send("Password does not meet complexity requirements");
    }

    // Generate userId using uuidv4
    const userId = uuidv4();

    // Hash the password
    const hashedPassword = md5Hash(password);

    const sql = "INSERT INTO Users (userId, email, fullName, password, role) VALUES (?, ?, ?, ?, ?)";
    const values = [userId, email, fullName, hashedPassword, selectedOption];

    await conn.query(sql, values);
    console.log("Signup successful");
    return res.status(200).send("Signup successful");
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).send("Error signing up");
  }
};

module.exports = { signUp, md5Hash };
