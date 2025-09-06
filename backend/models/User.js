const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'both'],
    required: [true, 'User role is required'],
    default: 'buyer'
  },
  avatar: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verification: {
    digiLocker: {
      isVerified: {
        type: Boolean,
        default: false
      },
      documentId: String,
      documentType: {
        type: String,
        enum: ['aadhaar', 'pan', 'driving_license', 'passport']
      },
      verifiedAt: Date,
      documentData: {
        name: String,
        dob: String,
        address: String,
        documentNumber: String
      }
    },
    email: {
      isVerified: {
        type: Boolean,
        default: false
      },
      verifiedAt: Date,
      token: String
    },
    phone: {
      isVerified: {
        type: Boolean,
        default: false
      },
      verifiedAt: Date,
      otp: String,
      otpExpiry: Date
    }
  },
  trustScore: {
    type: Number,
    default: 75,
    min: 0,
    max: 100
  },
  ecoPoints: {
    type: Number,
    default: 100
  },
  co2Saved: {
    type: Number,
    default: 0
  },
  waterSaved: {
    type: Number,
    default: 0
  },
  itemsSold: {
    type: Number,
    default: 0
  },
  itemsBought: {
    type: Number,
    default: 0
  },
  badges: [{
    type: String,
    enum: ['newcomer', 'eco-warrior', 'trusted-seller', 'community-champion', 'verified-user', 'digilocker-verified']
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  sellerProfile: {
    businessName: String,
    businessType: {
      type: String,
      enum: ['individual', 'small_business', 'enterprise', 'ngo']
    },
    gstNumber: String,
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      accountHolderName: String
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    approvedAt: Date
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update trust score based on transactions
userSchema.methods.updateTrustScore = function() {
  const baseScore = 50;
  const salesBonus = Math.min(this.totalSales * 2, 30);
  const purchaseBonus = Math.min(this.totalPurchases * 1, 15);
  const verificationBonus = this.isVerified ? 5 : 0;
  
  this.trustScore = Math.min(baseScore + salesBonus + purchaseBonus + verificationBonus, 100);
};

module.exports = mongoose.model('User', userSchema);
