const User = require("../models/User.js");
const AppError = require("../utils/error.js");

// Register a new user
const register = async (req, res, next) => {
  try {
    const { email, name, role, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    // Create new user with plain password
    const user = new User({
      email,
      name,
      role,
      password, // Store password directly
      phone
    });

    await user.save();

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password }); // Debug log

    // Check if user exists
    const user = await User.findOne({ email });
    console.log('Found user:', user); // Debug log

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Direct password comparison
    if (password !== user.password) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

// Get user profile
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, whatsapp, githubLink, skills } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, bio, whatsapp, githubLink, skills },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
