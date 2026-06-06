// Removed the unused 'uuid' import
const bcrypt = require('bcrypt');
const User = require("../model/user");
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.redirect("/");
    } catch (error) {
        // Handle duplicate email error
        if (error.code == 11000) {
            return res.status(400).json({
                error: "A user with this email already exists!"
            });
        }
        
        // FIX: Add a generic error response so the server doesn't hang
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleUserLogin(req, res) {
    // FIX: Wrap the entire function in a try...catch block
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.render("login", {
                error: "Invalid username and password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.render("login", { error: "Invalid username and password" });
        }

        const token = setUser(user);
        res.cookie("uid", token);
        return res.redirect("/");
        
    } catch (error) {
        // FIX: Handle unexpected database crashes during login
        console.error("Login Error:", error);
        return res.status(500).render("login", { 
            error: "An unexpected error occurred. Please try again later." 
        });
    }
}

module.exports = { handleUserSignup, handleUserLogin };