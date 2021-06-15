const express = require('express');
const router = express.Router();
const signupTemplateCopy = require('../models/signupmodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userController = require('../server/controllers/userControllers');
const tenderController = require('../server/controllers/tenderControllers');

//userController.allowIfLoggedin, userController.grantAccess('create', 'profile'),
router.post('/signup', userController.signup);

router.post('/user',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/users', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'),  userController.deleteUser);

router.post('/login', userController.login)

router.get('/user', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'profile'),  userController.getUser);

//add controls here too, and check in tests
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'),  userController.getUsers);

router.post('/signupTender', tenderController.signup);

router.get('/searchTenders',  userController.allowIfLoggedin, userController.grantAccess('readAny', 'tender'), tenderController.searchTenders);

router.get('/getTenders',  userController.allowIfLoggedin, userController.grantAccess('readAny', 'tender'), tenderController.getTenders);

module.exports = router;
