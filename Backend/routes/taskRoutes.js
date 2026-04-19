const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE TASK
router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        const saved = await task.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET TASKS FOR USER
router.get("/:userId", async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.params.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE TASK
router.put("/:id", async (req, res) => {
    try {
        const updated = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;