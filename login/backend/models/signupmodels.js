const mongoose = require('mongoose');

const signupTemplate = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: 'basic',
    enum: ["basic", "project-manager", "admin"]
  }
  // },
  // accessToken: {
  //   type: String
  // }
});

module.exports = mongoose.model("users", signupTemplate);
