const User = require('../models/User');

// Role-based access control middleware
const requireRole = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Authentication required.'
        });
      }

      const user = await User.findById(req.user.id).select('role');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if user has any of the required roles
      const hasRole = roles.some(role => {
        if (role === 'seller' && (user.role === 'seller' || user.role === 'both')) return true;
        if (role === 'buyer' && (user.role === 'buyer' || user.role === 'both')) return true;
        return user.role === role;
      });

      if (!hasRole) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${roles.join(' or ')}`
        });
      }

      req.userRole = user.role;
      next();
    } catch (error) {
      console.error('Role authorization error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during role authorization'
      });
    }
  };
};

// Middleware to check if seller profile is approved
const requireApprovedSeller = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('sellerProfile');
    
    if (!user.sellerProfile || !user.sellerProfile.isApproved) {
      return res.status(403).json({
        success: false,
        message: 'Seller profile not approved. Please complete verification process.'
      });
    }

    next();
  } catch (error) {
    console.error('Seller approval check error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during seller approval check'
    });
  }
};

// Middleware to check if user is verified
const requireVerification = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('isVerified verification');
    
    if (!user.isVerified || !user.verification.digiLocker.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Account verification required. Please complete DigiLocker verification.'
      });
    }

    next();
  } catch (error) {
    console.error('Verification check error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during verification check'
    });
  }
};

module.exports = {
  requireRole,
  requireApprovedSeller,
  requireVerification
};
