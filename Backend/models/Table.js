const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    tableId: { type: String, required: true },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Table', TableSchema);