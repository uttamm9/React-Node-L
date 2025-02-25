const taskModel = require('../model/taskModel');
const userModel = require('../model/userModel');

exports.createTask = async (req, res) => {
    try {
        const color = req.user.color;
        console.log("color",color);
        const { taskName, dueDate, status, assignTo, remark } = req.body;
        console.log("<><>>>>>>>>>>req.body",req.body);

        if(!(taskName && dueDate && status && assignTo && remark)) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const assingtoData = await userModel.findOne({email: assignTo});
        if(!assingtoData) {
            return res.status(400).json({message: 'Assign to email not found'});
        } 
        const assingBy = req.user._id;
        const task = new taskModel({
            taskName,
            dueDate,
            status,
            assignTo:assingtoData,
            remark,
            assingBy: assingBy
        });
        console.log("<><>>>>task",task);
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