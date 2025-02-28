const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret_key = '55354trw4fvrg65grtv56'
const nodemailer = require('nodemailer');
exports.signup = async (req, res) => {
    try {
        const { email, password,name,role,address,color,phone } = req.body;
        if(!(email && password && name && role && address && color && phone)) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const user = await userModel.findOne({email}); // check if user already exists
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            email,
            password: hashPassword,
            name,
            role,
            address,
            color,
            phone
        }); 
        await newUser.save();
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            auth:{
                user:'uttamftspl@gmail.com',
                pass:'wlxj plim jsij fvzv'
            }
        });
        const MailInfo = await transporter.sendMail({
            from:'uttamftspl@gmail.com',
            to:email,
            subject:'Account created',
            text:'Account created successfully'
        });
        console.log('MailInfo',MailInfo);
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
        console.log("color",color);
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }
        const token = jwt.sign({_id: user._id},secret_key,{expiresIn: '1d'});

        res.status(200).json({msg:"Login Succesful",token,color});
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
        const { email , newPassword} = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({  message: 'User not found' });
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