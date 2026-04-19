const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const tableRoutes = require("./routes/tableRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/tables', tableRoutes);

app.get('/', (req, res) => {
    res.send('Task Management API is running...');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully!');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server started on http://localhost:${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => console.log('Database Connection Error:', err));