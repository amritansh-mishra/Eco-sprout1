const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an item title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['electronics', 'furniture', 'clothing', 'books', 'sports', 'home', 'other']
  },
  condition: {
    type: String,
    required: [true, 'Please specify item condition'],
    enum: ['excellent', 'good', 'fair', 'poor']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide an address']
    },
    city: {
      type: String,
      required: [true, 'Please provide a city']
    },
    state: {
      type: String,
      required: [true, 'Please provide a state']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  ecoScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  ecoImpact: {
    co2Saved: {
      type: Number,
      default: 0
    },
    waterSaved: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved', 'inactive'],
    default: 'available'
  },
  views: {
    type: Number,
    default: 0
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tags: [String],
  isPromoted: {
    type: Boolean,
    default: false
  },
  promotedUntil: Date
}, {
  timestamps: true
});

// Calculate eco score based on category and condition
itemSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('category') || this.isModified('condition')) {
    this.calculateEcoScore();
  }
  next();
});

itemSchema.methods.calculateEcoScore = function() {
  const categoryScores = {
    electronics: 8.5,
    furniture: 7.0,
    clothing: 6.5,
    books: 5.0,
    sports: 6.0,
    home: 7.5,
    other: 5.5
  };

  const conditionMultipliers = {
    excellent: 1.0,
    good: 0.9,
    fair: 0.7,
    poor: 0.5
  };

  const baseScore = categoryScores[this.category] || 5.0;
  const multiplier = conditionMultipliers[this.condition] || 0.5;
  
  this.ecoScore = Math.round((baseScore * multiplier) * 10) / 10;
  
  // Calculate estimated environmental impact
  this.ecoImpact.co2Saved = Math.round(this.ecoScore * 5.2 * 10) / 10;
  this.ecoImpact.waterSaved = Math.round(this.ecoScore * 12.8 * 10) / 10;
};

// Index for search functionality
itemSchema.index({ title: 'text', description: 'text', tags: 'text' });
itemSchema.index({ category: 1, status: 1 });
itemSchema.index({ 'location.city': 1, status: 1 });
itemSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Item', itemSchema);
