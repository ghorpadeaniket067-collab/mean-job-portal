const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
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
    role: {
      type: String,
      enum: ['Job Seeker', 'Recruiter'],
      default: 'Job Seeker'
    },
    location: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    skills: {
      type: [String],
      default: []
    },
    education: {
      type: String,
      default: ''
    },
    experience: {
      type: String,
      default: ''
    },
    projects: {
      type: [String],
      default: []
    },
    resume: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);