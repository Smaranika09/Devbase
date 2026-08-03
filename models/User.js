const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    default: "avatar1.png"
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String, 
    required: true
  },

  profilePhoto: {
    type: String,
    default: "avatar1.png"
  },

  targetRole: {
    type: String,
    default: ""
  },

  college: {
    type: String,
    default: ""
  },

  graduationYear: {
    type: Number
  },

  bio: {
    type: String,
    default: ""
  },

  github: {
    type: String,
    default: ""
  },

  linkedin: {
    type: String,
    default: ""
  }, 

  portfolio: {
    type: String,
    default: "" 
  },

  skills: {
    type: [String],
    default: [] 
  },

  isProfileComplete: {
    type: Boolean,
    default: false 
  }
}, 
{
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);