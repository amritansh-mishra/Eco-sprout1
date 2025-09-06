import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import {
  MapPin,
  Star,
  Shield,
  Leaf,
  Heart,
  Share2,
  Flag,
  Calendar,
  Eye,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  User,
  ArrowLeft,
  Camera
} from 'lucide-react';

const Listing = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Mock listing data
  const listing = {
    id: 1,
    title: 'Vintage Wooden Bookshelf',
    price: 89,
    location: 'Brooklyn, NY',
    images: [
      'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Beautiful vintage wooden bookshelf in excellent condition. Perfect for any home or office. Has been well-maintained and comes from a smoke-free home. Minor wear consistent with age but structurally sound.',
    seller: {
      id: 'seller1',
      name: 'Sarah Mitchell',
      trustScore: 92,
      isVerified: true,
      memberSince: '2022',
      totalSales: 47,
      responseTime: '2 hours',
      avatar: null
    },
    ecoScore: 8.5,
    co2Saved: 12.3,
    waterSaved: 450,
    condition: 'Good',
    category: 'Furniture',
    posted: '3 days ago',
    views: 127,
    favorites: 23,
    features: [
      '5 shelves',
      'Solid oak wood',
      '180cm height',
      'Adjustable shelves'
    ],
    reviews: [
      {
        id: 1,
        buyer: 'Mike Johnson',
        rating: 5,
        comment: 'Great seller! Item exactly as described and shipped quickly.',
        date: '2 weeks ago'
      },
      {
        id: 2,
        buyer: 'Lisa Chen',
        rating: 5,
        comment: 'Beautiful piece! Sarah was very responsive and helpful.',
        date: '1 month ago'
      }
    ],
    anomalies: [
      'Similar items found in your area',
      'Price may be above market average'
    ],
    duplicates: true
  };

  // Mock similar items
  const similarItems = [
    {
      id: 2,
      title: 'Antique Oak Desk',
      price: 156,
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Emma Davis',
      trustScore: 88
    },
    {
      id: 3,
      title: 'Wooden Storage Cabinet',
      price: 67,
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Alex Wong',
      trustScore: 91
    }
  ];

  const getTrustColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-trust-500';
    return 'bg-orange-500';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ₹{
          i < rating ? 'text-trust-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to listings</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image gallery */}
            <div className="card p-6">
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={listing.images[selectedImage]}
                    alt={listing.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4 flex items-center space-x-1 bg-primary-600 text-white px-3 py-1 rounded-full">
                    <Leaf className="h-4 w-4" />
                    <span className="font-medium">Eco Score: {listing.ecoScore}</span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`p-2 rounded-full transition-colors ₹{
                        isFavorited
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ₹{isFavorited ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 bg-white/80 rounded-full text-gray-600 hover:text-primary-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-2 overflow-x-auto">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ₹{
                        selectedImage === index
                          ? 'border-primary-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`₹{listing.title} ₹{index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Title and basic info */}
            <div className="card p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Flag className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {listing.posted}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{listing.views} views</span>
                    </div>
                  </div>
                </div>

                <div className="text-3xl font-bold text-primary-600">
                  ₹{listing.price}
                </div>

                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    {listing.condition}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {listing.category}
                  </span>
                </div>

                {/* Environmental impact */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-primary-50 to-green-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Leaf className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="font-semibold text-primary-600">{listing.co2Saved}kg</div>
                    <div className="text-xs text-gray-600">CO₂ Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">💧</span>
                      </div>
                    </div>
                    <div className="font-semibold text-blue-600">{listing.waterSaved}L</div>
                    <div className="text-xs text-gray-600">Water Saved</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{listing.description}</p>

              {listing.features.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Features:</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {listing.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Safety warnings and anomaly detection */}
            {listing.anomalies.length > 0 && (
              <div className="card p-6 border-orange-200 bg-orange-50 animate-fade-in-up">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 animate-pulse" />
                  <div>
                    <h3 className="font-medium text-orange-900 mb-2">Market Intelligence</h3>
                    <p className="text-sm text-orange-800 mb-3">
                      Our AI has detected some market insights for this listing:
                    </p>
                    <ul className="space-y-2 text-sm text-orange-800">
                      {listing.anomalies.map((anomaly, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{anomaly}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 p-2 bg-orange-100 rounded-lg">
                      <p className="text-xs text-orange-700">
                        💡 <strong>Tip:</strong> These insights help you make informed decisions. Always verify item condition and seller reputation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Duplicate detection warning */}
            {listing.duplicates && (
              <div className="card p-6 border-blue-200 bg-blue-50 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900 mb-2">Similar Listings Detected</h3>
                    <p className="text-sm text-blue-800 mb-3">
                      We found similar items in your area. Compare prices and conditions to ensure you're getting the best deal.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-blue-700">
                      <span className="font-medium">Similar items found:</span>
                      <span className="bg-blue-200 px-2 py-1 rounded-full text-xs font-medium">3 listings</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Seller Reviews</h2>
              <div className="space-y-4">
                {listing.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {review.buyer.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{review.buyer}</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller info */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{listing.seller.name}</span>
                      {listing.seller.isVerified && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`trust-badge ₹{getTrustColor(listing.seller.trustScore)} text-white text-xs`}>
                        <Shield className="h-3 w-3 mr-1" />
                        Trust: {listing.seller.trustScore}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Member since:</span>
                    <div className="font-medium text-gray-900">{listing.seller.memberSince}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Total sales:</span>
                    <div className="font-medium text-gray-900">{listing.seller.totalSales}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Response time:</span>
                    <div className="font-medium text-gray-900">{listing.seller.responseTime}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-trust-500 fill-current" />
                      <span className="font-medium text-gray-900">4.9</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  {user ? (
                    <>
                      <button
                        onClick={() => setShowContact(true)}
                        className="w-full btn-primary flex items-center justify-center"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Seller
                      </button>
                      <Link
                        to={`/checkout/₹{listing.id}`}
                        className="w-full btn-secondary flex items-center justify-center"
                      >
                        Buy Now
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="w-full btn-primary flex items-center justify-center"
                    >
                      Login to Contact
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Similar items */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Similar Items</h3>
              <div className="space-y-3">
                {similarItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/listing/₹{item.id}`}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {item.title}
                      </div>
                      <div className="text-primary-600 font-bold text-sm">
                        ₹{item.price}
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <span>{item.seller}</span>
                        <div className={`w-2 h-2 rounded-full ₹{getTrustColor(item.trustScore)}`}></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 animate-bounce-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Seller</h3>
            <p className="text-gray-600 mb-4">
              Send a message to {listing.seller.name} about this item.
            </p>
            <textarea
              rows={4}
              className="input-field resize-none"
              placeholder="Hi! I'm interested in your item..."
            ></textarea>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => setShowContact(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowContact(false)}
                className="flex-1 btn-primary"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;