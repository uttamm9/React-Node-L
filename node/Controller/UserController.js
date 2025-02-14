const studentData = require('../Model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = 'dv5v45g455eer34ff5tt545ge34'

exports.signUp = async(req,res)=>{
  const {name,email,password} = req.body;
  console.log(req.body)
  if(!(name&&email&&password)){
    return res.status(400).json({msg:"All fields are required"})
  }
  const userEmail = await studentData.findOne({email});
  if(userEmail){
    return res.status(400).json({msg:"Email already used"})
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password,salt)

  const data = {name,email,password:hashPass}

  const result = new studentData(data)
  
  await result.save()
  res.status(201).json({msg:"Signup successfully",result})
}

exports.login = async(req,res)=>{
    const {email,password} = req.body;
    const userEmail = await studentData.findOne({email})
    if(!userEmail){
      return res.status(404).json({msg:"login first"})
    }
    const isMatch = bcrypt.compareSync(password,userEmail.password)
    if(!isMatch){
      return res.status(404).json({msg:"invalid password"})
    }
    const token = jwt.sign({_id:userEmail._id},secretkey,{expiresIn:'1h'})
   res.status(200).json({msg:"Login successfully",token:token})
}


exports.studentCreate = async(req,res)=>{
  console.log("......>>>>req.body",req.body)
  const {name,email,number} = req.body;
  if(!(name&&email&&number)){
    return res.status(404).json({msg:"all feild requird"})
  }
  const userEmail = await studentData.findOne({ email });
  if (userEmail) {
    return res.status(400).json({ msg: "Email already used" });
  }
  const userdata = new studentData(req.body)
  await userdata.save()
  return res.status(201).json(userdata)
} 

exports.findAll = async(req,res)=>{
    const myStudentData = await studentData.find()
    res.status(200).json(myStudentData)
    console.log(myStudentData)
}

exports.getOne = async(req,res)=>{
  console.log(req.params)

    const {id} = req.params
    // const myStudentData = await studentData.findById(id)
    const myStudentData = await studentData.findOne({_id:id})
    if(!myStudentData){
      return res.status(404).json({error:'Record not found'})
    }
    res.status(200).json(myStudentData)
    console.log(myStudentData)
}

exports.update = async(req,res)=>{
  console.log(req.body)
  // return;
  const {_id} = req.body;
  console.log({_id})
  // return;
  const updateData = req.body;
  const result = await studentData.findByIdAndUpdate(_id, updateData, { new: true })
  if(!(result)){
    return res.status(404).json({msg:"record not found"})
  }
  res.status(200).json({msg:"data updated",result})
}

exports.delete = async(req,res)=>{
  const {id} = req.params;
  console.log('.....ID...>',id)
  const newData = await studentData.findByIdAndDelete(id)
  if(!(newData)){
    res.status(404).json({msg:"recod not found"})
  }
  res.status(200).json({msg:"Data deleted",newData})
}