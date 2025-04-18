const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

function authMiddleware (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        return res.status(403).json({
            message: "No token provided, access denied."
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;
        console.log("User ID:", req.userId);

        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = {
    authMiddleware
};
