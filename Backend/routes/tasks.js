const express = require('express');
const router = express.Router();
const UserData = require('../models/UserData');

// SAVE or UPDATE user data
router.post('/sync', async (req, res) => {
  try {
    const { userId, tables } = req.body;

    let existing = await UserData.findOne({ userId });

    if (existing) {
      existing.tables = tables;
      await existing.save();
    } else {
      await UserData.create({ userId, tables });
    }

    res.json({ message: "Saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET user data
router.get('/:userId', async (req, res) => {
  try {
    const data = await UserData.findOne({ userId: req.params.userId });

    if (data) {
      res.json(data);
    } else {
      res.json({ tables: [] });
    }

  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

module.exports = router;