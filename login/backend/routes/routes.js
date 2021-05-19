const express = require('express');
const router = express.Router();
const signupTemplateCopy = require('../models/signupmodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userController = require('../server/controllers/userControllers');
//userController.allowIfLoggedin, userController.grantAccess('create', 'profile'),
router.post('/signup',  userController.signup);

router.post('/user',  userController.updateUser);

router.delete('/users',  userController.deleteUser);

router.post('/login', userController.login)

router.get('/user/:userId',  userController.getUser);

router.get('/users', userController.getUsers);



module.exports = router;
