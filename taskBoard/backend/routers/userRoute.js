const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/userAuth');
const taskController = require('../controller/taskController');

router.post('/signup',userController.signup);

router.post('/login',userController.login);

router.post('/createTask',auth,taskController.createTask);

router.get('/getuser',auth,taskController.getuser);

router.get('/getTask',auth,taskController.myTask);

router.get('/myAssingTask',auth,taskController.myAssignedTask);

router.patch('/updatePassword',auth,userController.updatePassword)

router.patch('/forgetPassword',userController.forgatePassword)

module.exports = router;