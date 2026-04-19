const express = require('express');
const router = express.Router();
const Table = require('../models/Table');

// GET all tables for a user
router.get('/:userId', async (req, res) => {
    try {
        const tables = await Table.find({ userId: req.params.userId });
        res.status(200).json(tables);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST create a new table
router.post('/', async (req, res) => {
    try {
        const { userId, tableId, title } = req.body;
        const newTable = new Table({ userId, tableId, title });
        const saved = await newTable.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// UPDATE table title
router.put('/:tableId', async (req, res) => {
    try {
        const updated = await Table.findOneAndUpdate(
            { tableId: req.params.tableId },
            { title: req.body.title },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// DELETE a table
// DELETE a table and its tasks
router.delete('/:tableId', async (req, res) => {
    try {
        await Table.findOneAndDelete({ tableId: req.params.tableId });
        // Delete all tasks of this table too
        const Task = require('../models/Task');
        await Task.deleteMany({ tableId: req.params.tableId });
        res.status(200).json({ message: 'Table and its tasks deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;