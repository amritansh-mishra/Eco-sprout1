const { validationResult } = require('express-validator');
const User = require('../models/User');
const crypto = require('crypto');

// DigiLocker API simulation (replace with actual DigiLocker SDK)
const digiLockerService = {
  // Simulate DigiLocker OAuth flow
  generateAuthUrl: (userId) => {
    const state = crypto.randomBytes(16).toString('hex');
    // In production, use actual DigiLocker OAuth URL
    return {
      authUrl: `https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${process.env.DIGILOCKER_CLIENT_ID}&redirect_uri=${process.env.DIGILOCKER_REDIRECT_URI}&state=${state}&scope=aadhaar`,
      state
    };
  },

  // Simulate document verification
  verifyDocument: async (code, documentType) => {
    // In production, exchange code for access token and fetch document
    // This is a simulation
    return {
      success: true,
      documentData: {
        name: 'John Doe',
        dob: '1990-01-01',
        address: '123 Main St, City, State',
        documentNumber: 'XXXX-XXXX-1234',
        documentType: documentType
      }
    };
  }
};

// @desc    Initiate DigiLocker verification
// @route   POST /api/verification/digilocker/initiate
// @access  Private
const initiateDigiLockerVerification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { documentType } = req.body;
    const userId = req.user.id;

    // Generate DigiLocker auth URL
    const { authUrl, state } = digiLockerService.generateAuthUrl(userId);

    // Store state in user document for verification
    await User.findByIdAndUpdate(userId, {
      'verification.digiLocker.state': state,
      'verification.digiLocker.documentType': documentType
    });

    res.status(200).json({
      success: true,
      data: {
        authUrl,
        message: 'Please complete verification on DigiLocker'
      }
    });
  } catch (error) {
    console.error('DigiLocker initiation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during DigiLocker initiation'
    });
  }
};

// @desc    Complete DigiLocker verification
// @route   POST /api/verification/digilocker/complete
// @access  Private
const completeDigiLockerVerification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { code, state } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify state parameter
    if (user.verification.digiLocker.state !== state) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification state'
      });
    }

    // Verify document with DigiLocker
    const verificationResult = await digiLockerService.verifyDocument(
      code, 
      user.verification.digiLocker.documentType
    );

    if (!verificationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Document verification failed'
      });
    }

    // Update user verification status
    const updateData = {
      'verification.digiLocker.isVerified': true,
      'verification.digiLocker.verifiedAt': new Date(),
      'verification.digiLocker.documentData': verificationResult.documentData,
      'verification.digiLocker.documentId': crypto.randomUUID(),
      isVerified: true
    };

    // Add DigiLocker verified badge
    if (!user.badges.includes('digilocker-verified')) {
      updateData.$push = { badges: 'digilocker-verified' };
    }

    // Increase trust score for verified users
    updateData.trustScore = Math.min(user.trustScore + 15, 100);

    await User.findByIdAndUpdate(userId, updateData);

    res.status(200).json({
      success: true,
      data: {
        message: 'DigiLocker verification completed successfully',
        trustScore: updateData.trustScore,
        verifiedDocument: verificationResult.documentData.documentType
      }
    });
  } catch (error) {
    console.error('DigiLocker completion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during DigiLocker verification'
    });
  }
};

// @desc    Get verification status
// @route   GET /api/verification/status
// @access  Private
const getVerificationStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('verification isVerified trustScore badges');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        isVerified: user.isVerified,
        trustScore: user.trustScore,
        badges: user.badges,
        verification: {
          digiLocker: {
            isVerified: user.verification.digiLocker.isVerified,
            documentType: user.verification.digiLocker.documentType,
            verifiedAt: user.verification.digiLocker.verifiedAt
          },
          email: {
            isVerified: user.verification.email.isVerified,
            verifiedAt: user.verification.email.verifiedAt
          },
          phone: {
            isVerified: user.verification.phone.isVerified,
            verifiedAt: user.verification.phone.verifiedAt
          }
        }
      }
    });
  } catch (error) {
    console.error('Get verification status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching verification status'
    });
  }
};

// @desc    Update seller profile
// @route   PUT /api/verification/seller-profile
// @access  Private (Seller only)
const updateSellerProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const userId = req.user.id;
    const { businessName, businessType, gstNumber, bankDetails } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has seller role
    if (user.role !== 'seller' && user.role !== 'both') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Seller role required.'
      });
    }

    // Update seller profile
    const updateData = {
      'sellerProfile.businessName': businessName,
      'sellerProfile.businessType': businessType,
      'sellerProfile.gstNumber': gstNumber,
      'sellerProfile.bankDetails': bankDetails
    };

    await User.findByIdAndUpdate(userId, updateData);

    res.status(200).json({
      success: true,
      data: {
        message: 'Seller profile updated successfully'
      }
    });
  } catch (error) {
    console.error('Update seller profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating seller profile'
    });
  }
};

module.exports = {
  initiateDigiLockerVerification,
  completeDigiLockerVerification,
  getVerificationStatus,
  updateSellerProfile
};
