const asyncHandler = require("express-async-handler");

// Dummy functions for now (Replace with database logic)
const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: "User registered" });
});

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "User logged in" });
});

const getUserProfile = asyncHandler(async (req, res) => {
    res.json({ message: "User profile" });
});

module.exports = { registerUser, loginUser, getUserProfile };
