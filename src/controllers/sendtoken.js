const { generateRandomCode } = require("./logIn");


const verifyToken = (req, res) => {
    const { token } = req.body;

    try {
        // Call the function to verify the code
        generateRandomCode(token);
        
        // If the code is verified successfully, you can redirect or send a success response
        res.status(200).send("Code verified successfully.");
      } catch (error) {
        // If there's an error during code verification, you can handle it here
        console.error('Error verifying code:', error);
        res.status(401).send("Invalid code");
      }
};

module.exports = { verifyToken };