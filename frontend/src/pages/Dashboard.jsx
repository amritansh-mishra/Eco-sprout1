import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Award,
  Shield,
  Leaf,
  TrendingUp,
  Package,
  DollarSign,
  Eye,
  Heart,
  CheckCircle,
  AlertCircle,
  Plus,
  BarChart3,
  Users,
  Droplets
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedEcoPoints, setAnimatedEcoPoints] = useState(0);
  const [animatedCo2, setAnimatedCo2] = useState(0);

  // Mock data for user's listings and purchases
  const userListings = [
    {
      id: 1,
      title: 'Vintage Leather Jacket',
      price: 125,
      status: 'active',
      views: 47,
      favorites: 8,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
      postedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'MacBook Pro 2019',
      price: 899,
      status: 'sold',
      views: 123,
      favorites: 15,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=300',
      postedDate: '2024-01-10'
    },
    {
      id: 3,
      title: 'Wooden Coffee Table',
      price: 89,
      status: 'pending',
      views: 32,
      favorites: 5,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300',
      postedDate: '2024-01-12'
    }
  ];

  const recentPurchases = [
    {
      id: 1,
      title: 'Vintage Bookshelf',
      price: 89,
      seller: 'Sarah Mitchell',
      date: '2024-01-14',
      status: 'delivered',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      title: 'Designer Coat',
      price: 125,
      seller: 'Emma Davis',
      date: '2024-01-10',
      status: 'in-transit',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const badges = [
    { id: 'eco-warrior', name: 'Eco Warrior', description: 'Saved 50kg+ CO₂', icon: '🌱', unlocked: true },
    { id: 'trusted-seller', name: 'Trusted Seller', description: '20+ successful sales', icon: '⭐', unlocked: true },
    { id: 'community-champion', name: 'Community Champion', description: 'Helped 50+ buyers', icon: '🏆', unlocked: true },
    { id: 'sustainability-hero', name: 'Sustainability Hero', description: 'Saved 100kg+ CO₂', icon: '🦸', unlocked: false },
    { id: 'power-seller', name: 'Power Seller', description: '50+ items sold', icon: '💪', unlocked: false },
    { id: 'early-adopter', name: 'Early Adopter', description: 'Joined in first 1000 users', icon: '🚀', unlocked: true }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Animate counters
    const animateCounter = (setter, target, duration = 1500) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateCounter(setAnimatedEcoPoints, user.ecoPoints || 1250);
    animateCounter(setAnimatedCo2, user.co2Saved || 45.2);
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const getTrustColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-trust-500';
    return 'bg-orange-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-trust-100 text-trust-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in-transit': return 'bg-trust-100 text-trust-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'listings', name: 'My Listings', icon: Package },
    { id: 'purchases', name: 'Purchases', icon: Heart },
    { id: 'badges', name: 'Badges', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Track your sustainable impact and manage your marketplace activity
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/create" className="btn-primary flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                List New Item
              </Link>
            </div>
          </div>
        </div>

        {/* Trust & Verification Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Trust Score</h3>
              <div className={`w-3 h-3 rounded-full ${getTrustColor(user.trustScore)} animate-pulse`}></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${getTrustColor(user.trustScore)} text-white animate-pulse-glow`}>
                <Shield className="h-5 w-5" />
                <span className="text-xl font-bold">{user.trustScore}</span>
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${getTrustColor(user.trustScore)}`}
                    style={{ width: `${user.trustScore}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">Excellent standing</p>
              </div>
            </div>
          </div>

          <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Verification Status</h3>
              {user.isVerified ? (
                <CheckCircle className="h-5 w-5 text-green-500 animate-heartbeat" />
              ) : (
                <AlertCircle className="h-5 w-5 text-orange-500 animate-pulse" />
              )}
            </div>
            <div className="flex items-center space-x-3">
              {user.isVerified ? (
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center animate-float">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-900">Verified</p>
                    <p className="text-xs text-green-700">Identity confirmed</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-orange-900">Unverified</p>
                    <p className="text-xs text-orange-700">Complete verification</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Eco Points</h3>
              <Leaf className="h-5 w-5 text-primary-600 animate-float" />
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-bold text-primary-600">
                {animatedEcoPoints.toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1 animate-pulse" />
                <span>+150 this week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ₹{
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Environmental Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">CO₂ Saved</h3>
                    <div className="p-2 bg-primary-600 rounded-lg">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {animatedCo2}kg
                  </div>
                  <p className="text-xs text-gray-600">Equivalent to 2 tree seedlings</p>
                </div>

                <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Water Saved</h3>
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <Droplets className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {user.waterSaved || 1200}L
                  </div>
                  <p className="text-xs text-gray-600">5 days of drinking water</p>
                </div>

                <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Items Sold</h3>
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {user.itemsSold || 12}
                  </div>
                  <p className="text-xs text-gray-600">Items given new life</p>
                </div>

                <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Community Impact</h3>
                    <div className="p-2 bg-green-600 rounded-lg">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {Math.floor((user.itemsSold || 12) * 2.3)}
                  </div>
                  <p className="text-xs text-gray-600">People helped</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Sold MacBook Pro 2019</p>
                        <p className="text-xs text-gray-600">2 days ago • ₹899</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Plus className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Listed Vintage Leather Jacket</p>
                        <p className="text-xs text-gray-600">5 days ago • ₹125</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Earned Eco Warrior badge</p>
                        <p className="text-xs text-gray-600">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Profile Views</span>
                        <span className="font-medium">247</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Response Rate</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Customer Satisfaction</span>
                        <span className="font-medium">4.9/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-trust-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Listings Tab */}
          {activeTab === 'listings' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">My Listings</h2>
                <Link to="/create" className="btn-primary flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Listing
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map((listing) => (
                  <div key={listing.id} className="card overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 truncate">{listing.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                          {listing.status}
                        </span>
                      </div>
                      <div className="text-xl font-bold text-primary-600 mb-3">
                        ₹{listing.price}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{listing.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{listing.favorites} favorites</span>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Link
                          to={`/listing/₹{listing.id}`}
                          className="flex-1 text-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          View
                        </Link>
                        <button className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Purchases Tab */}
          {activeTab === 'purchases' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">My Purchases</h2>

              <div className="space-y-4">
                {recentPurchases.map((purchase) => (
                  <div key={purchase.id} className="card p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={purchase.image}
                        alt={purchase.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{purchase.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Sold by {purchase.seller}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-primary-600 font-bold">₹{purchase.price}</span>
                          <span className="text-gray-500">{purchase.date}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                            {purchase.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="btn-secondary">
                          Contact Seller
                        </button>
                        {purchase.status === 'delivered' && (
                          <button className="btn-primary">
                            Rate & Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badges Tab */}
          {activeTab === 'badges' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Achievements & Badges</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`card p-6 transition-all duration-200 ₹{
                      badge.unlocked
                        ? 'hover:scale-105 cursor-pointer'
                        : 'opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">
                        {badge.unlocked ? badge.icon : '🔒'}
                      </div>
                      <h3 className={`font-semibold mb-2 ₹{
                        badge.unlocked ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {badge.name}
                      </h3>
                      <p className={`text-sm ₹{
                        badge.unlocked ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {badge.description}
                      </p>
                      {badge.unlocked && (
                        <div className="mt-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Unlocked
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="card p-6 bg-gradient-to-r from-primary-50 to-trust-50">
                <h3 className="font-semibold text-gray-900 mb-4">Badge Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Sustainability Hero (100kg CO₂)</span>
                      <span className="font-medium">{user.co2Saved || 45.2}kg / 100kg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `₹{Math.min(((user.co2Saved || 45.2) / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Power Seller (50 items)</span>
                      <span className="font-medium">{user.itemsSold || 12} / 50 items</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-trust-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `₹{Math.min(((user.itemsSold || 12) / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;