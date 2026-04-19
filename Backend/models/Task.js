const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  tableId: {
    type: String,
    required: true
  },
  tableTitle: String,
  title: String,
  description: String,
  status: {
    type: String,
    default: "Pending"
  },
  dueDate: String
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);