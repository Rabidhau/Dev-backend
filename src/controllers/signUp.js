const conn = require("../db/connection");
const { v4: uuidv4 } = require("uuid");

const signUp = async (req, res) => {
  const { fullName, email, password, selectedOption } = req.body;

  // Check if email already exists
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM Users WHERE email = ?";
  conn.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.error("Error checking email:", err);
      res.status(500).send("Error signing up");
      return;
    }

    const emailCount = result[0].count;
    if (emailCount > 0) {
      res.status(400).send("Email already exists");
      return;
    }

    // Validate password using regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      console.log("Password does not meet complexity requirements");
      res.status(400).send("Password does not meet complexity requirements");
      return;
    }

    // Generate userId using uuidv4
    const userId = uuidv4();


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
  });
};

module.exports = { signUp };
