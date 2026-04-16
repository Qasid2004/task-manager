const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const Task = require('./models/Task');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Validation rules (reused acro`ss POST and PUT)
const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required').trim(),
    body('description').notEmpty().withMessage('Description is required'),
    body('status').optional().isIn(['Pending', 'In Progress', 'Completed'])
        .withMessage('Status must be Pending, In Progress, or Completed'),
    body('dueDate').notEmpty().withMessage('Due date is required')
        .isISO8601().withMessage('Due date must be a valid date'),
];

// Middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// POST /tasks — Create a new task
app.post('/tasks', taskValidationRules, validate, async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /tasks — Fetch all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /tasks/:id — Fetch a single task
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// PUT /tasks/:id — Update a task
app.put('/tasks/:id', taskValidationRules, validate, async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// DELETE /tasks/:id — Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully!');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server started on http://localhost:${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => console.log('Database Connection Error:', err));

app.get('/', (req, res) => {
    res.send('Task Management API is running...');
});