const express = require('express');
const router = express.Router();
const signupTemplateCopy = require('../models/signupmodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userController = require('../server/controllers/userControllers');

router.post('/signup', userController.allowIfLoggedin, userController.grantAccess('create', 'profile'), userController.signup);

router.post("/login", userController.login);

router.post('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);



router.get('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.getUsers);




module.exports = router;
