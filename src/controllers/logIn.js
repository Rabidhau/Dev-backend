const conn = require("../db/connection");
const { md5Hash } = require("./signUp");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const secretKey = crypto.randomBytes(16).toString("hex"); // Generate a random secret key
const emailSender = "rabidhau01@gmail.com"; // Replace with your email address
const emailPassword = "eydn qkqt yobg xkoi"; // Replace with your email password

// Function to send email with token
const sendTokenByEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Replace with your email service provider (e.g., Gmail)
    auth: {
      user: emailSender,
      pass: emailPassword,
    },
  });

  const mailOptions = {
    from: emailSender,
    to: email,
    subject: "Login Token",
    text: `Your login token is: ${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = md5Hash(password);

  const sql = "SELECT * FROM Users WHERE email=? AND password=?";
  const values = [email, hashedPassword];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).send("Error logging in");
    } else if (result.length === 0) {
      res.status(401).send("Invalid credentials");
    } else {
      // Generate token using secret key
      const user = result[0]; // Assuming only one user is returned
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });

      // Send token to user's email
      sendTokenByEmail(email, token);

      // Respond with a message indicating that the token has been sent to the user's email
      res
        .status(200)
        .send("Token sent to your email. Please check your inbox.");
    }
  });
};

module.exports = { logIn, secretKey };
