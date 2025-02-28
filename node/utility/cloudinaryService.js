const cloudinary = require('cloudinary')


require("dotenv").config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:  process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.Fileupload = async (file) =>{
  const fileArray = Object.values(file)
  //Object.values() ek built-in JavaScript function hai jo ek object ke values ka array return karta hai.
  console.log('>>>>>>fileArray>>>', fileArray)

  const results = [];

  for(const  file of fileArray){
    console.log('>>>>>file>>>>',file);
   
    try {
      const result_data = await new Promise((resolve,reject)=>{
        // Promise error handling ke kam aata h with 3 peramitter (resolve,result,pandding)
        cloudinary.uploader.upload_stream((result,error)=>{
          if(error){
            reject(error);
          }
          resolve(result);
        }).end(file.data) 
        //end(file.data)=> Yeh method stream ko end karne ke liye use hota hai aur file.data ko as input stream me bhejta hai.
      })
      results.push(result_data)

    } catch (error) {
      console.log('Error uploading file:',error)
    }
    
  }
  return results;
};



