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
    default: "staff-member",
    enum: ["staff-member", "supervisor", "admin", "super-admin"]
  },
  createdById: {
    type: String
  },
  createdByName: {
    type: String
  }
});

module.exports = mongoose.model("users", signupTemplate);
