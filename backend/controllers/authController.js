const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already registered'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'Job Seeker'
    });

    const token = createToken(user);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Registration failed',
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const token = createToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Login failed',
      error: error.message
    });
  }
};

const getProfile = async (req, res) => {
  try {
    console.log('PROFILE USER ID:', req.user.id);

    const user = await User.findById(req.user.id)
      .select('-password');

    console.log('PROFILE USER:', user);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json(user);
  } catch (error) {
    console.error('PROFILE ERROR:', error);

    res.status(500).json({
      message: 'Failed to get profile'
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      location,
      phone,
      skills,
      education,
      experience,
      projects,
      resume
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    user.name = name || user.name;
    user.location = location || '';
    user.phone = phone || '';
    user.skills = skills || [];
    user.education = education || '';
    user.experience = experience || '';
    user.projects = projects || [];
    user.resume = resume || '';

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        phone: user.phone,
        skills: user.skills,
        education: user.education,
        experience: user.experience,
        projects: user.projects,
        resume: user.resume
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update profile'
    });
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'Resume PDF is required'
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    user.resume = `/uploads/resumes/${req.file.filename}`;

    await user.save();

    res.json({
      message: 'Resume uploaded successfully',
      resume: user.resume
    });
  } catch (error) {
    res.status(500).json({
      message: 'Resume upload failed',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  uploadResume
};