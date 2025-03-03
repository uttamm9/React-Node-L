const mongoose = require('mongoose');

const trashSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
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
       ref: 'User',
       required: true
    },
    isActive:{
      type: Boolean,
      default: true
    }
},{versionKey:false,timestamps:true});
module.exports = mongoose.model('Trash', trashSchema);