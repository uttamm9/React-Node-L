const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  address: {
    type: String
  },
  color: {
    type: String
  },
  phone: {
    type: String
  }
},{versionKey: false});

const User = mongoose.model('User', userSchema);

module.exports = User;