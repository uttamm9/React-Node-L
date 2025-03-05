const taskModel = require('../model/taskModel');
const userModel = require('../model/userModel');
const trashModel = require('../model/trashModel');
const nodemailer = require('nodemailer');
exports.createTask = async (req, res) => {
    try {
        const color = req.user.color;
        console.log("color",color);
        const { taskName, dueDate, assignTo, remark } = req.body;
        console.log("<><>>>>>>>>>>req.body",req.body);

        if(!(taskName && dueDate && assignTo && remark)) {
            return res.status(400).json({
            message: 'All fields are required'
            });
        }
        const assingtoData = await userModel.findOne({email: assignTo});
        if(!assingtoData) {
            return res.status(400).json({message: 'Assign to email not found'});
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const tasksAssignedToday = await taskModel.countDocuments({
            assignTo: assingtoData._id,
            createdAt: { $gte: today, $lt: tomorrow }
        });

        if (tasksAssignedToday >= 5) {
            return res.status(400).json({message: 'User already has 5 tasks assigned for today'});
        }
        console.log("count>>>",tasksAssignedToday)
        
        const assingBy = req.user._id;
        const task = new taskModel({
            taskName,
            dueDate,
            assignTo: assingtoData,
            remark,
            assingBy: assingBy
        });
        console.log("<><>>>>task",task);

        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            auth:{
                user:'uttamftspl@gmail.com',
                pass:'wlxj plim jsij fvzv'
            }
        })

        const MailInfo = await transporter.sendMail({
            from:'uttamftspl@gmail.com',
            to:assignTo,
            subject:`Task ${taskName}`,
            text:remark
        })
        console.log("mail info>>>",MailInfo);
        if(!MailInfo.messageId){
            return res.status(400).json({message: 'Email not sent'});
        }

        
        await task.save();
        res.status(201).json({message: 'Task created'});
    }
    catch (err) {
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.getuser = async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.getTask = async (req, res) => {
    try {
        const task = await taskModel.find({assingBy: req.user.email}).populate('assignTo');
        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.myTask = async (req, res) => {
    try {
        console.log(`<<<<<<<<<<<<<<`,req.user.email);
        // return;
        const task = await taskModel.find({assignTo: req.user._id}).populate('assingBy');
        console.log(">>>>>>>>>>>tasks",task);
        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.myAssignedTask = async (req, res) => {
    try {
        const task = await taskModel.find({assingBy: req.user._id}).populate('assignTo');
        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.updateTask = async (req, res) => {
    try {
        console.log("req.body",req.body);
        const { _id } = req.params;
        const { taskName, dueDate, remark } = req.body;
        if(!(_id && taskName && dueDate && remark)) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const task = await taskModel.findOne({_id});
        console.log("task ",task);
        if(!task) {
            return res.status(400).json({message: 'Task not found'});
        }
        const updatedTask = {
            taskName,
            dueDate,
            remark
        }
        await taskModel.findByIdAndUpdate({_id}, updatedTask);
       
        res.status(200).json({message: 'Task updated'});
    }
    catch (err) {
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { _id } = req.params;
        if(!_id) {
            return res.status(400).json({message: 'Task id is required'});
        }
        const task = await taskModel.findOneAndDelete({_id});
        if(!task) {
            return res.status(400).json({message: 'Task not found'});
        }
        res.status(200).json({message: 'Task deleted'});
    }
    catch (err) {
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.completeTask = async(req,res)=>{
    try {
        const {_id} = req.body;
        if(!_id){
            return res.status(404).json({message:"Task id requird"})
        }
        const pendingTask = await taskModel.findById({_id})
        if(!pendingTask){
            return res.status(404).json({message:"Task not found"})
        }

        const completeTask = new taskModel({
            taskName: pendingTask.taskName,
            dueDate: pendingTask.dueDate,
            status: "Complete",
            assignTo: pendingTask.assignTo,
            remark: pendingTask.remark,
            assingBy: pendingTask.assingBy,
            isActive: pendingTask.isActive
        })
        console.log("completed Task >>",completeTask)
        await completeTask.save()

        res.status(200).json({message:"Task Completed"})

    } catch (error) {
       return res.status(500).json({message: 'Internal server error'});
    }
}

exports.archiveTask = async (req, res) => {
    try {
        const { _id } = req.body;
        console.log('body>>>',req.body);
        if(!_id) {
            return res.status(400).json({message: 'Task id is required'});
        }
        const task = await taskModel.findOne({_id});
        if(!task) {
            return res.status(400).json({message: 'Task not found'});
        }
        const trash = new trashModel({
            taskName: task.taskName,
            dueDate: task.dueDate,
            status: task.status,
            assignTo: task.assignTo,
            remark: task.remark,
            assingBy: task.assingBy,
            isActive: false
        });
        console.log("Archive task",trash);
        await trash.save();
        await taskModel.findOneAndDelete({_id});
        res.status(200).json({message: 'Task Archive'});
    }
    catch (err) {
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.getCompletedTask = async(req,res)=>{
    const _id = req.user._id;
    const completeTask = await trashModel.find({assignTo:_id}).populate('assingBy')
    res.status(200).json(completeTask)
}