const conn = require("../db/connection");
const { md5Hash } = require("./signUp");
const nodemailer = require("nodemailer");

const emailSender = "rabidhau01@gmail.com"; // Replace with your email address
const emailPassword = "eydn qkqt yobg xkoi"; // Replace with your email password

// Function to generate a random 6-digit code
const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generate a random number between 100000 and 999999
};

// Function to send email with the code
const sendCodeByEmail = async (email, code) => {
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
    subject: "Login Code",
    text: `Your login code is: ${code}`,
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

  const sql = "SELECT userId, email, username, role FROM Users WHERE email=? AND password=?";
  const values = [email, hashedPassword];

  conn.query(sql, values, async (err, result) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).send("Error logging in");
    } else if (result.length === 0) {
      res.status(401).send("Invalid credentials");
    } else {
      // Generate and send code
      const generatedCode = generateRandomCode();

      // Send code to user's email
      await sendCodeByEmail(email, generatedCode);

      const userData = result[0]; // Get the user data from the query result
      res.status(200).json({ ...userData, code: generatedCode }); // Return user data along with the generated code
    }
  });
};

module.exports = { logIn, generateRandomCode };
