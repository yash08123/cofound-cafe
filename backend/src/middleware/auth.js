const User = require("../models/User.js");

const authenticate = async (req, res, next) => {
  try {
    const userId = req.headers['user-id'];
    console.log('Auth middleware - received headers:', req.headers);
    console.log('Auth middleware - user ID:', userId);
    
    if (!userId) {
      console.log('Auth middleware - no user ID provided');
      return res.status(401).json({ 
        status: 'error',
        message: "Authentication required" 
      });
    }

    const user = await User.findById(userId);
    console.log('Auth middleware - found user:', user);

    if (!user) {
      console.log('Auth middleware - user not found in database');
      return res.status(401).json({ 
        status: 'error',
        message: "User not found" 
      });
    }

    req.userId = userId;
    req.role = user.role;
    console.log('Auth middleware - authentication successful');
    next();
  } catch (err) {
    console.error('Auth middleware - error:', err);
    return res.status(401).json({ 
      status: 'error',
      message: "Authentication failed" 
    });
  }
};

module.exports = { authenticate };
