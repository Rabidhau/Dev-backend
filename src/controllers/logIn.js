const conn = require("../db/connection");

const logIn = async (req, res) => {
  const { email, password,role } = req.body;

  const sql = "SELECT * FROM Users WHERE email=? AND password=? AND role=?";
  const values = [email, password,role];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).send("Error logging in");
    } else if (result.length === 0) {
      res.status(401).send("Invalid credentials");
    } else {
      console.log("Login successful");
      res.status(200).send("Login successful");
      
    }
  });
};

module.exports = { logIn };
