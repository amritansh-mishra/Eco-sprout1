const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middlewares/auth');
const { requireRole } = require('../middlewares/roleAuth');
const {
  initiateDigiLockerVerification,
  completeDigiLockerVerification,
  getVerificationStatus,
  updateSellerProfile
} = require('../controllers/verificationController');

const router = express.Router();

// @route   POST /api/verification/digilocker/initiate
// @desc    Initiate DigiLocker verification
// @access  Private
router.post('/digilocker/initiate', 
  protect,
  [
    body('documentType')
      .isIn(['aadhaar', 'pan', 'driving_license', 'passport'])
      .withMessage('Invalid document type')
  ],
  initiateDigiLockerVerification
);

// @route   POST /api/verification/digilocker/complete
// @desc    Complete DigiLocker verification
// @access  Private
router.post('/digilocker/complete',
  protect,
  [
    body('code').notEmpty().withMessage('Authorization code is required'),
    body('state').notEmpty().withMessage('State parameter is required')
  ],
  completeDigiLockerVerification
);

// @route   GET /api/verification/status
// @desc    Get verification status
// @access  Private
router.get('/status', protect, getVerificationStatus);

// @route   PUT /api/verification/seller-profile
// @desc    Update seller profile
// @access  Private (Seller only)
router.put('/seller-profile',
  protect,
  requireRole('seller', 'both'),
  [
    body('businessName').notEmpty().withMessage('Business name is required'),
    body('businessType')
      .isIn(['individual', 'small_business', 'enterprise', 'ngo'])
      .withMessage('Invalid business type'),
    body('bankDetails.accountNumber').notEmpty().withMessage('Account number is required'),
    body('bankDetails.ifscCode').notEmpty().withMessage('IFSC code is required'),
    body('bankDetails.accountHolderName').notEmpty().withMessage('Account holder name is required')
  ],
  updateSellerProfile
);

module.exports = router;
