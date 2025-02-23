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
    type: String,
    required: true
  },
  remark: {
    type: String,
    required: true
  },
  assingBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
},{versionKey: false});

module.exports = mongoose.model('task', taskSchema);