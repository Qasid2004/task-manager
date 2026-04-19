const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify Token (Needed for Profile Update)
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.userId = decoded.id;
        next();
    });
};

// --- REGISTER ---
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", userId: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- LOGIN (FIXED: Now returns user object) ---
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "secretkey",
            { expiresIn: "1d" }
        );

        // Send BOTH token and user info so frontend doesn't show "Loading"
        res.json({
            message: "Login successful",
            token,
            user: {
                 _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- UPDATE PROFILE (NEW: This fixes the Save Changes button) ---
router.put("/profile", verifyToken, async (req, res) => {
    try {
        const { name, email } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            req.userId, 
            { name, email }, 
            { new: true } // Returns the updated document
        ).select("-password");

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;