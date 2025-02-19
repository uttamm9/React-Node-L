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
 userId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'users',
  require:true
 },
 batch:{
  type:String,
  required:false
 }
 
},{versionKey:false,timestamps:true})

const studentData = mongoose.model('students', students)

module.exports = studentData