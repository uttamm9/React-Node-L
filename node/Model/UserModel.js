const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require('moment')

const user = new Schema({
 name:{
  type:String,
  required:true
 },
 email:{
  type:String,
  required:true
 },
 password:{
  type:String,
  required:true
 },
 otp:{
  type:Number,
  required:true,
 },
 OtpExpiryTime:{
  type:String
 }
},{versionKey:false,timestamps:true})

const studentData = mongoose.model('users', user)

module.exports = studentData