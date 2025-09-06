import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Heart, ShoppingBag, Star, TrendingUp, Package, Shield, X, Plus, Minus } from 'lucide-react';
import DigiLockerVerification from '../components/DigiLockerVerification';

// Hardcoded favorites with full item details
const hardcodedFavorites = [
  {
    _id: '1',
    title: 'Bamboo Water Bottle',
    description: 'Eco-friendly bamboo water bottle with stainless steel interior',
    price: 899,
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400'],
    ecoScore: 92,
    addedToFavorites: '2024-08-28'
  },
  {
    _id: '3',
    title: 'Solar Power Bank',
    description: 'Portable solar power bank for sustainable charging on the go',
    price: 2499,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400'],
    ecoScore: 95,
    addedToFavorites: '2024-09-02'
  },
  {
    _id: '5',
    title: 'Wooden Phone Stand',
    description: 'Handcrafted wooden phone stand from sustainable wood',
    price: 799,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400'],
    ecoScore: 88,
    addedToFavorites: '2024-09-01'
  },
  {
    _id: 'f1',
    title: 'Cork Yoga Mat',
    description: 'Natural cork yoga mat with rubber base for perfect grip',
    price: 1899,
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'],
    ecoScore: 88,
    addedToFavorites: '2024-08-22'
  }
];

const BuyerDashboard = () => {
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [itemsBought, setItemsBought] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [showTrustScoreModal, setShowTrustScoreModal] = useState(false);
  const [showEcoPointsModal, setShowEcoPointsModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showItemsBoughtModal, setShowItemsBoughtModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Hardcoded recommended items data
      const hardcodedItems = [
        {
          _id: '1',
          title: 'Bamboo Water Bottle',
          description: 'Eco-friendly bamboo water bottle with stainless steel interior',
          price: 899,
          images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400'],
          ecoScore: 92
        },
        {
          _id: '2',
          title: 'Organic Cotton T-Shirt',
          description: 'Sustainable organic cotton t-shirt made from recycled materials',
          price: 1299,
          images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
          ecoScore: 88
        },
        {
          _id: '3',
          title: 'Solar Power Bank',
          description: 'Portable solar power bank for sustainable charging on the go',
          price: 2499,
          images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400'],
          ecoScore: 95
        },
        {
          _id: '4',
          title: 'Reusable Food Wraps',
          description: 'Beeswax food wraps to replace plastic wrap',
          price: 599,
          images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
          ecoScore: 90
        },
        {
          _id: '5',
          title: 'Wooden Phone Stand',
          description: 'Handcrafted wooden phone stand from sustainable wood',
          price: 799,
          images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400'],
          ecoScore: 85
        },
        {
          _id: '6',
          title: 'Eco-Friendly Notebook',
          description: 'Recycled paper notebook with plantable seed cover',
          price: 399,
          images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'],
          ecoScore: 87
        }
      ];

      
      // Hardcoded items bought with full details
      const hardcodedItemsBought = [
        {
          _id: 'b1',
          title: 'Bamboo Toothbrush Set',
          description: '4-pack of biodegradable bamboo toothbrushes',
          price: 299,
          images: ['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400'],
          purchaseDate: '2024-08-15',
          ecoScore: 89,
          status: 'Delivered',
          orderNumber: 'ECO001'
        },
        {
          _id: 'b2',
          title: 'Hemp Shopping Bag',
          description: 'Durable hemp shopping bag with long handles',
          price: 499,
          images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
          purchaseDate: '2024-08-20',
          ecoScore: 91,
          status: 'Delivered',
          orderNumber: 'ECO002'
        },
        {
          _id: 'b3',
          title: 'Glass Water Bottle',
          description: 'Borosilicate glass water bottle with silicone sleeve',
          price: 699,
          images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400'],
          purchaseDate: '2024-09-01',
          ecoScore: 93,
          status: 'Delivered',
          orderNumber: 'ECO003'
        },
        {
          _id: 'b4',
          title: 'Organic Cotton Towel Set',
          description: 'Set of 3 organic cotton towels in natural colors',
          price: 1299,
          images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400'],
          purchaseDate: '2024-09-03',
          ecoScore: 87,
          status: 'In Transit',
          orderNumber: 'ECO004'
        },
        {
          _id: 'b5',
          title: 'Stainless Steel Lunch Box',
          description: 'Multi-compartment stainless steel lunch container',
          price: 899,
          images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'],
          purchaseDate: '2024-09-04',
          ecoScore: 90,
          status: 'Processing',
          orderNumber: 'ECO005'
        }
      ];

      setItems(hardcodedItems);
      setFavorites(hardcodedFavorites);
      setItemsBought(hardcodedItemsBought);
      
      // Mock verification status
      setVerificationStatus({
        isVerified: false,
        verification: {
          digiLocker: {
            isVerified: false
          }
        }
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationComplete = () => {
    setVerificationStatus(prev => ({
      ...prev,
      verification: {
        ...prev.verification,
        digiLocker: {
          isVerified: true,
          verifiedAt: new Date().toISOString()
        }
      },
      isVerified: true
    }));
    setShowVerification(false);
  };

  const addToFavorites = (item) => {
    try {
      // Get existing favorites from localStorage
      const existingFavorites = JSON.parse(localStorage.getItem('ecoSprout_favorites') || '[]');
      
      // Check if item is already in favorites
      const isAlreadyFavorite = existingFavorites.some(fav => fav.id === item.id);
      
      if (!isAlreadyFavorite) {
        // Add item to favorites
        const updatedFavorites = [...existingFavorites, item];
        localStorage.setItem('ecoSprout_favorites', JSON.stringify(updatedFavorites));
        
        // Update local state
        setFavorites(prev => [...prev, item.id]);
        
        // Show success message
        alert('Item added to favorites!');
      } else {
        alert('Item is already in your favorites!');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add item to favorites');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Discover sustainable products and track your eco-impact</p>
        </div>

        {/* Verification Alert */}
        {verificationStatus && !verificationStatus.isVerified && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-yellow-600 mr-3" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800">Verify Your Account</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Complete DigiLocker verification to increase your trust score and unlock premium features.
                </p>
              </div>
              <button
                onClick={() => setShowVerification(true)}
                className="ml-4 px-4 py-2 text-sm font-medium text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-md hover:bg-yellow-200"
              >
                Verify Now
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div 
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setShowTrustScoreModal(true)}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Trust Score</p>
                <p className="text-2xl font-bold text-gray-900">{user?.trustScore || 85}</p>
                <p className="text-xs text-green-600">Click to view history</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setShowEcoPointsModal(true)}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Eco Points</p>
                <p className="text-2xl font-bold text-gray-900">{user?.ecoPoints || 245}</p>
                <p className="text-xs text-blue-600">Click to view history</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setShowItemsBoughtModal(true)}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Items Bought</p>
                <p className="text-2xl font-bold text-gray-900">{itemsBought.length}</p>
                <p className="text-xs text-purple-600">Click to view orders</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setShowFavoritesModal(true)}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
                <p className="text-xs text-red-600">Click to view favorites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Items */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recommended for You</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {item.images && item.images[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                      <button
                        onClick={() => addToFavorites(item)}
                        className="ml-2 p-1 rounded-full hover:bg-gray-100"
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            favorites.includes(item._id) 
                              ? 'text-red-600 fill-current' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{item.ecoScore || 85}</span>
                      </div>
                    </div>
                    <button className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                      <ShoppingBag className="h-4 w-4 inline mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DigiLocker Verification Modal */}
      {showVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Account Verification</h2>
              <button
                onClick={() => setShowVerification(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <DigiLockerVerification onVerificationComplete={handleVerificationComplete} />
          </div>
        </div>
      )}

      {/* Trust Score Modal */}
      {showTrustScoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Trust Score History</h2>
              <button
                onClick={() => setShowTrustScoreModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-green-600">85</p>
                <p className="text-sm text-gray-600">Current Trust Score</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">DigiLocker Verification</p>
                      <p className="text-xs text-gray-600">Sep 6, 2024</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">+15</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Successful Purchase</p>
                      <p className="text-xs text-gray-600">Sep 1, 2024</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">+5</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Profile Completed</p>
                      <p className="text-xs text-gray-600">Aug 25, 2024</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">+10</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <Minus className="h-4 w-4 text-red-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Late Payment</p>
                      <p className="text-xs text-gray-600">Aug 15, 2024</p>
                    </div>
                  </div>
                  <span className="text-red-600 font-medium">-5</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Account Created</p>
                      <p className="text-xs text-gray-600">Aug 10, 2024</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">+60</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Eco Points Modal */}
      {showEcoPointsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Eco Points History</h2>
              <button
                onClick={() => setShowEcoPointsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-blue-600">245</p>
                <p className="text-sm text-gray-600">Current Eco Points</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Bought Glass Water Bottle</p>
                      <p className="text-xs text-gray-600">Sep 1, 2024</p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-medium">+25</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Bought Hemp Shopping Bag</p>
                      <p className="text-xs text-gray-600">Aug 20, 2024</p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-medium">+20</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Bought Bamboo Toothbrush Set</p>
                      <p className="text-xs text-gray-600">Aug 15, 2024</p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-medium">+15</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <Minus className="h-4 w-4 text-red-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Returned Non-Eco Item</p>
                      <p className="text-xs text-gray-600">Aug 12, 2024</p>
                    </div>
                  </div>
                  <span className="text-red-600 font-medium">-10</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Account Setup Bonus</p>
                      <p className="text-xs text-gray-600">Aug 10, 2024</p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-medium">+195</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Modal */}
      {showFavoritesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">My Favorites ({favorites.length})</h2>
              <button
                onClick={() => setShowFavoritesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hardcodedFavorites.map((item) => (
                <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex">
                    <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                      {item.images && item.images[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">{item.ecoScore}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Added: {new Date(item.addedToFavorites).toLocaleDateString()}</p>
                        </div>
                        <button
                          onClick={() => {
                            const updatedFavorites = favorites.filter(fav => fav._id !== item._id);
                            setFavorites(updatedFavorites);
                          }}
                          className="ml-2 p-1 rounded-full hover:bg-gray-100"
                        >
                          <Heart className="h-4 w-4 text-red-600 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Items Bought Modal */}
      {showItemsBoughtModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">My Orders ({itemsBought.length})</h2>
              <button
                onClick={() => setShowItemsBoughtModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {itemsBought.map((item) => (
                <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex">
                    <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                      {item.images && item.images[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">{item.ecoScore}</span>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-xs text-gray-500">Order: {item.orderNumber}</p>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              item.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Purchased: {new Date(item.purchaseDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
