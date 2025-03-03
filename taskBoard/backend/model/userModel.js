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
  },
  file:{
    type:String
  },
  otp: {
    type: String
  },
  otpTime: {
    type: Date
  }
},{versionKey: false,timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User;