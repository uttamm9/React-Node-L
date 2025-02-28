const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const monent = require('moment')
require('dotenv').config();
const router = require('./Router/UserRoute')
const fileupload = require('express-fileupload')
const port = process.env.PORT || 3050;

const mongoUri = process.env.MONGO_URL;

mongoose.connect(mongoUri)
.then(()=>{
  console.log('Connected to mongo')
}).catch((error)=>{
  console.log('Error in connection', error)
})


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(fileupload())

app.use('/std',router)



// app.get('/findAll', async(req, res) => {
//   // console.log(req)
//   const myStudentData = await studentData.find()
//   res.status(200).json(myStudentData)
//   console.log(myStudentData)
// })

// app.get('/getOne/:id',async(req,res)=>{
//   console.log(req.params)

//   const {id} = req.params
//   // const myStudentData = await studentData.findById(id)
//   const myStudentData = await studentData.findOne({_id:id})
//   if(!myStudentData){
//     return res.status(404).json({error:'Record not found'})
//   }
//   res.status(200).json(myStudentData)
//   console.log(myStudentData)
// })

// app.delete('/deleteOne/:id',async(req,res)=>{
//   const {id} =req.params
//   const result = await studentData.findByIdAndDelete(id)
//   if(!result){
//     return res.status(404).json({error:'Record not found'})
//   }
//   res.status(200).json(result)
// })

// app.patch('/update',async(req,res)=>{
//   console.log('first',req.body)
//   const {_id} = req.body;
//   const updateData = req.body;
//   const result = await studentData.findByIdAndUpdate(_id,updateData)
//   if(!result){
//     return res.status(404).json({error:'Record not found'})
//   }
//   res.status(200).json(result)
// })
// app.patch('/upadat/:id',async(req,res)=>{
//   const {id}= req.params
//   console.log('id>>>>>>>>>>>>>>>',id)
//   const updateData = req.body
//   console.log('updateData>>>>>>>>>>>>>>>',updateData)
//   await studentData.findByIdAndUpdate(id,updateData)
//   res.status(200).json({message:'Record updated successfully'})
// })

// app.post('/opration',async(req,res)=>{
//   console.log('req.body',req.body)
//   const {dob} = req.body
//   const today = monent()
//   const age = today.diff(dob,"years")
//   console.log(age)
//   res.status(200).json({age:age})
//   return;
//   // let result = 0;
//   // if(oprater=='*') {result = a*b;}
//   // if(oprater=='+') {result = a+b;}
//   // if(oprater=='-') {result = a-b;}
//   // if(oprater=='/') {result = a/b;}
//   // res.status(200).json({result:result})
//   return;
// })

app.listen(port,()=>{
  console.log('Server is running on port', port)
})