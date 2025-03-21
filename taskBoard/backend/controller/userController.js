const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret_key = '55354trw4fvrg65grtv56'
const nodemailer = require('nodemailer');
const moment = require('moment');
const {FileUpload} = require('../Utility/ClodinaryService')
const {SendMail} = require('C:/Users/uttam/OneDrive/Desktop/ENV/Nodemailer');

exports.signup = async (req, res) => {
    try {
        console.log("req.body>>>>",req.body)
        console.log("req.files>>>>",req.files)
        const { email, password,name,role,address,color,phone } = req.body;
        if(!(email && password && name && role && address && color && phone )) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const user = await userModel.findOne({email}); // check if user already exists
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }
        const fileupload = await FileUpload(req.files)

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            email,
            password: hashPassword,
            name,
            role,
            address,
            color,
            phone,
            file:fileupload[0].url
        }); 
        await newUser.save();
        const MailInfo = await SendMail(email,`Account created`,`Account created successfully`)
    
        let verify = '';
        if(MailInfo.messageId){
            verify = 'Email sent successfully';
        }
        res.status(201).json({message: 'User created',email:verify});
    }
    catch (err) {
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email}); 
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        const color = user.color;
        const name = user.name;
        const profilephoto = user.file
        console.log("color",color);
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }
        const token = jwt.sign({_id: user._id},secret_key,{expiresIn: '1d'});

        res.status(200).json({message:"Login Succesful",token,color,name,profilephoto});
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.updatePassword = async (req, res) => {  
    try {
        console.log('....user_email',req.user.email);
        const email = req.user.email;

        const { newPassword , currentPassword} = req.body;
        const user = await userModel.findOne({email});
        if (!user) { return res.status(400).json({message: 'User not found'});
    }
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(400).json({message: 'Invalid password'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        const data = await userModel.updateOne({email}, {password: hashPassword }); 
        console.log('data',data);

        res.status(200).json({ message: 'Password updated'});
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.forgatePassword = async (req, res) => {
    try {
        const { email , newPassword,otp} = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({  message: 'User not found' });
        }
        const DBotp = user.otp;
        if(DBotp!=otp){
            return res.status(404).json({message:"Invalid OTP"})
        }
        if(moment()>user.otpTime){
            return res.status(400).json({message:"OTP expire"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        await userModel.updateOne({email}, {password: hashPassword});
        // Send token to user's email
        

        const token = jwt.sign({ _id: user._id}, secret_key, {expiresIn: '1d'});
        res.status(200).json({message: 'Password updated'});
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.getOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        // Send OTP to user's email
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpTime = moment().add(5, 'minutes');

        const data = await userModel.updateOne({email}, {otp, otpTime});
        console.log(data);
      
        const MailInfo = await SendMail(email,`OTP for password reset`,`Your OTP is ${otp}`)
        console.log('MailInfo', MailInfo);
        
        if (!MailInfo.messageId) {
            return res.status(500).json({message: 'Failed to send OTP'});
        }
        res.status(200).json({message: 'OTP sent'});
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}