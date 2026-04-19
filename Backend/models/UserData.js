const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  status: String,
  dueDate: String
});

const tableSchema = new mongoose.Schema({
  id: Number,
  title: String,
  isArchived: Boolean,
  tasks: [taskSchema]
});

const userDataSchema = new mongoose.Schema({
  userId: String,
  tables: [tableSchema]
});

module.exports = mongoose.model("UserData", userDataSchema);