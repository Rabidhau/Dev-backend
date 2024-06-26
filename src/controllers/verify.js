const nodemailer = require("nodemailer");
const conn = require("../db/connection");
 // Assuming you have a connection.js file for database connection

// Email configuration
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
    subject: "Signup Token",
    text: `Your signup token is: ${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Propagate the error to handle it in the calling function
  }
};

// Function to generate and send token
const verify = async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).send("Email is required");
    }
  
    try {
      // Check if the email already exists in the database
      const selectQuery = "SELECT * FROM users WHERE email = ?";
      conn.query(selectQuery, [email], (err, rows) => {
  
        // Assuming the result is stored in rows
        if (rows && rows.length > 0) {
          return res.status(400).send("Email already exists");
        }
  
        // Generate a random 6-digit token
        const token = Math.floor(100000 + Math.random() * 900000);
  
        // Assuming sendTokenByEmail is defined somewhere
       sendTokenByEmail(email, token);
        console.log("Token sent successfully");
        res.status(200).send("Token sent successfully");
      });
    } catch (error) {
      console.error("Error sending token:", error);
      res.status(500).send("Error sending token");
    }
};


module.exports = { verify };