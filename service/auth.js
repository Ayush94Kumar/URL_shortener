const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET; 

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

function getUser(token) {
    if (!token) return null;
    
    try {
        // Try to verify the token
        return jwt.verify(token, secret);
    } catch (error) {
        // If the token is malformed, expired, or tampered with, 
        // catch the error and return null (treating them as logged out)
        return null; 
    }
}

module.exports = {
    setUser,
    getUser,
};