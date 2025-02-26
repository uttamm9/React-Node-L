const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  assignTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  remark: {
    type: String,
    required: true
  },
  assingBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive:{
    type: Boolean,
    default: true
  }
},{versionKey: false});

module.exports = mongoose.model('task', taskSchema);