const User = require('../../models/signupmodels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const mongoose = require ('mongoose');
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateEmail = require("../../validation/validateEmail");
const validatePasswordInput = require("../../validation/validatePassword");
const { roles } = require('../roles')

exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const role = req.body.userRole;
   const permission = roles.can(role)[action](resource);
   if (permission.granted == false) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
    }
    else {
    if (role == "admin"){
      if(req.body.role == "super-admin" || req.body.role == "admin"){
        return res.status(401).json({
         error: "Action forbidden: Not allowed to change this user."
        });
      }
    }
  }
   next()
  } catch (error) {
   next(error)
  }
 }
}

exports.allowIfLoggedin = async (req, res, next) => {
 try {

  const user = req.body.authentication;

  if (user==false)
   return res.status(401).json({
    error: "You need to be logged in to access this route"
  });
   next();
  } catch (error) {
   next(error);
  }
}

async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
 try {
   // Validation code here
   const { errors, isValid } = validateRegisterInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }

  const hashedPassword = await hashPassword(req.body.password);
  const user = await User.findOne({ email });
  if (user) return next(new Error('Email already exists.'));

  const signedupUser = new User({
   name: req.body.name,
   email: req.body.email,
   password: hashedPassword,
   password2: hashedPassword,
   role: req.body.role || "staff-member",
   createdById: req.body.createdBy
  });

  await signedupUser.save()
  res.json({
   data: signedupUser
  })
}
catch(error) {
   next(error)
 }
}

exports.login = async(req, res, next) => {
  try {
    //validation code here
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) return next(new Error('Email does not exist.'));

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return next(new Error('Password is not correct.'));

    const payload = {
          id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
          tableData: {}
    };

    const token = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 31556926 // 1 year in seconds
          }
        );

    res.status(200).json({
      success: true,
      token: "Bearer " + token
    });
  }
  catch(error) {
      next(error);
  }
}

exports.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    data: users
  });
}

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) return next(new Error('User does not exist.'));
    res.status(200).json({
      data: user
    });
  }
  catch (error) {
    next(error)
  }
}

exports.updateUser = async (req, res, next) => {
 try {
   const userId = req.params.userId;
   const userBody = req.body;
   if (userBody.email)
   {
     const { errors, isValid } = validateEmail(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }

   if (userBody.password)
   {
     const { errors, isValid } = validatePasswordInput(userBody);
     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
   }
   userBody.password = await hashPassword(userBody.password);
   userBody.password2 = await hashPassword(userBody.password);
   await User.findByIdAndUpdate(userId, userBody);
   const user = await User.findById(userId);

   res.status(200).json({
    data: user,
    message: 'User has been updated'
   });
  }
  catch (error) {
   next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
 try {
  const id = req.params.userId;

  await User.findByIdAndDelete(id);

  res.status(200).json({
   data: null,
   message: 'User has been deleted'
  });
 }
 catch (error) {
  next(error)
 }
}
