const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'disputed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'upi', 'card', 'wallet'],
    required: true
  },
  meetingDetails: {
    location: String,
    scheduledTime: Date,
    notes: String
  },
  ecoImpact: {
    co2Saved: Number,
    waterSaved: Number
  },
  rating: {
    buyerRating: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String,
      date: Date
    },
    sellerRating: {
      score: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String,
      date: Date
    }
  }
}, {
  timestamps: true
});

// Update user stats after transaction completion
transactionSchema.post('save', async function() {
  if (this.status === 'completed') {
    const User = mongoose.model('User');
    
    // Update seller stats
    await User.findByIdAndUpdate(this.seller, {
      $inc: { totalSales: 1 }
    });
    
    // Update buyer stats
    await User.findByIdAndUpdate(this.buyer, {
      $inc: { totalPurchases: 1 }
    });
    
    // Update eco impact for both users
    if (this.ecoImpact) {
      await User.findByIdAndUpdate(this.seller, {
        $inc: {
          'ecoImpact.co2Saved': this.ecoImpact.co2Saved || 0,
          'ecoImpact.waterSaved': this.ecoImpact.waterSaved || 0,
          'ecoImpact.itemsRescued': 1
        }
      });
      
      await User.findByIdAndUpdate(this.buyer, {
        $inc: {
          'ecoImpact.co2Saved': this.ecoImpact.co2Saved || 0,
          'ecoImpact.waterSaved': this.ecoImpact.waterSaved || 0,
          'ecoImpact.itemsRescued': 1
        }
      });
    }
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
