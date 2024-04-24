const { secretKey } = require("./logIn");
const jwt = require('jsonwebtoken');

const verifyToken = (req, res) => {
    const { token } = req.body;

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, secretKey);

        // If the token is verified successfully, you can access the payload
        const userId = decoded.userId; // 'userId' is included in the token payload

        res.status(200).send(`Token verified successfully. User ID: ${userId}`);
    } catch (error) {
        // If token verification fails (e.g., invalid or expired token)
        console.error('Error verifying token:', error);
        res.status(401).send("Invalid token");
    }
};

module.exports = { verifyToken };