const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const students = new Schema({
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
  required:false
 },
 number:{
  type:Number,
  required:false
 },
 address:{
  type:String,
  required:false
 },
 
},{versionKey:false,timestamps:true})

const studentData = mongoose.model('students', students)

module.exports = studentData