const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserController')
const auth = require('../middleware/auth')

router.post('/signup',userController.signUp)

router.post('/login',userController.login)

router.post('/add',auth,userController.studentCreate)

router.get('/findAll',auth,userController.findAll)

router.get('/getOne/:id',auth,userController.getOne)

router.delete('/delete/:id',auth,userController.delete)

router.patch('/update',auth,userController.update)

router.post('/sendmail',auth,userController.sendMail)

router.post('/TTS',userController.TTS)


module.exports = router;