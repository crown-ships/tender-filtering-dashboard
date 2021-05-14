const express = require('express');
const router = express.Router();
const signupTemplateCopy = require('../models/signupmodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userController = require('../server/controllers/userControllers');

router.post('/signup', userController.signup);

router.post("/login", userController.login);

router.post('/user/:userId',  userController.updateUser);

router.delete('/user/:userId',  userController.deleteUser);



router.get('/user/:userId', userController.getUser);

router.get('/users', userController.getUsers);




module.exports = router;
