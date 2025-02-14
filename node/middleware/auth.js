const jwt = require('jsonwebtoken')
const secretkey = 'dv5v45g455eer34ff5tt545ge34'
const studentData = require('../Model/UserModel')

module.exports = async(req,res,next) =>{

  const token = req?.headers?.authorization;
  console.log("....>>>>.Token >>>>",token)
  if(!token){
    return res.status(401).json({massage:"Unauthoriza"});
  }
  const splitToken = token.split(" ")[1]
  console.log(">>>>>>SplitToken>>>",splitToken)
  
  const decode = jwt.verify(splitToken,secretkey)
  console.log(">>>>Decode>>>",decode)
  if(!decode){
    return res.status(401).json({massage:'invalid token'});
  }
  const user = await studentData.findById(decode._id)
  console.log(">>>>>>decode>>>>",user)
  if(!user){
    return res.status(401).json({massage:'user not found'})

  }
  next() 
}