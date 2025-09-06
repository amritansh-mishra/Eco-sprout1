import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  Search, 
  Grid, 
  List, 
  Package, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  Star, 
  Eye, 
  Plus, 
  X, 
  Calendar, 
  Award,
  ShoppingBag,
  Bell,
  Settings,
  DollarSign,
  BarChart3,
  Users
} from 'lucide-react';
import DigiLockerVerification from './DigiLockerVerification';
import LocationMap from './LocationMap';

// Hardcoded data for demo purposes
const hardcodedItems = [
  {
    _id: '1',
    title: 'Bamboo Water Bottle',
    description: 'Eco-friendly bamboo water bottle with stainless steel interior',
    price: 899,
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400'],
    ecoScore: 92,
    seller: 'EcoGoods Store',
    category: 'Kitchen & Dining'
  },
  {
    _id: '2',
    title: 'Organic Cotton T-Shirt',
    description: 'Soft organic cotton t-shirt made from sustainable materials',
    price: 1299,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
    ecoScore: 89,
    seller: 'Green Fashion Co',
    category: 'Clothing'
  },
  {
    _id: '3',
    title: 'Solar Power Bank',
    description: 'Portable solar power bank for sustainable charging on the go',
    price: 2499,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400'],
    ecoScore: 95,
    seller: 'Solar Tech Ltd',
    category: 'Electronics'
  }
];


const hardcodedSoldItems = [
  {
    _id: 's1',
    title: 'Eco-Friendly Notebook',
    description: 'Recycled paper notebook with plantable seed cover',
    price: 399,
    soldPrice: 399,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'],
    soldDate: '2024-09-01',
    buyer: 'John Doe',
    quantity: 2,
    commission: 39.9
  },
  {
    _id: 's2',
    title: 'Bamboo Cutlery Set',
    description: 'Portable bamboo cutlery set with carrying case',
    price: 599,
    soldPrice: 599,
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'],
    soldDate: '2024-08-28',
    buyer: 'Jane Smith',
    quantity: 1,
    commission: 59.9
  }
];

// Hardcoded score history data
const ecoScoreHistory = [
  { date: '2024-01-15', score: 85, activity: 'Purchased bamboo products' },
  { date: '2024-02-20', score: 88, activity: 'Bought solar charger' },
  { date: '2024-03-10', score: 90, activity: 'Organic clothing purchase' },
  { date: '2024-04-05', score: 92, activity: 'Zero-waste lifestyle adoption' },
];

const trustScoreHistory = [
  { date: '2024-01-10', score: 4.2, activity: 'First successful transaction' },
  { date: '2024-02-15', score: 4.5, activity: 'Positive buyer feedback' },
  { date: '2024-03-20', score: 4.7, activity: 'Account verification completed' },
  { date: '2024-04-01', score: 4.8, activity: 'Consistent quality transactions' },
];

// Hardcoded seller analytics data
const earningsHistory = [
  { date: '2024-01-15', amount: 299, item: 'Bamboo Water Bottle', commission: 29.9 },
  { date: '2024-02-20', amount: 499, item: 'Organic Cotton T-Shirt', commission: 49.9 },
  { date: '2024-03-10', amount: 599, item: 'Solar Phone Charger', commission: 59.9 },
  { date: '2024-04-05', amount: 799, item: 'Eco-Friendly Backpack', commission: 79.9 },
];

const soldItemsDetails = [
  { date: '2024-01-15', item: 'Bamboo Water Bottle', buyer: 'John Doe', price: 299, status: 'Delivered' },
  { date: '2024-02-20', item: 'Organic Cotton T-Shirt', buyer: 'Jane Smith', price: 499, status: 'Delivered' },
  { date: '2024-03-10', item: 'Solar Phone Charger', buyer: 'Mike Johnson', price: 599, status: 'Shipped' },
  { date: '2024-04-05', item: 'Eco-Friendly Backpack', buyer: 'Sarah Wilson', price: 799, status: 'Processing' },
];

const commissionBreakdown = [
  { month: 'January 2024', sales: 2, commission: 79.8, rate: '10%' },
  { month: 'February 2024', sales: 3, commission: 149.7, rate: '10%' },
  { month: 'March 2024', sales: 4, commission: 199.6, rate: '10%' },
  { month: 'April 2024', sales: 1, commission: 79.9, rate: '10%' },
];

const customersList = [
  { name: 'Ujjwal Singh', orders: 3, totalSpent: 897, lastOrder: '2024-04-01', rating: 4.8 },
  { name: 'Kanish Singh', orders: 2, totalSpent: 798, lastOrder: '2024-03-28', rating: 4.9 },
  { name: 'Amritansh Mishra', orders: 1, totalSpent: 599, lastOrder: '2024-03-10', rating: 4.7 },
  { name: 'Arunima Phogat', orders: 1, totalSpent: 799, lastOrder: '2024-04-05', rating: 5.0 },
];

// Hardcoded seller's listed items (currently active listings)
const sellerListedItems = [
  {
    _id: 'listed1',
    title: 'Recycled Plastic Lunch Box',
    description: 'Durable lunch box made from 100% recycled plastic materials',
    price: 399,
    category: 'Kitchen',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
    ecoScore: 88,
    listedDate: '2024-04-10',
    status: 'Active',
    views: 45,
    likes: 12
  },
  {
    _id: 'listed2',
    title: 'Hemp Fiber Yoga Mat',
    description: 'Natural yoga mat made from sustainable hemp fibers',
    price: 1299,
    category: 'Fitness',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'],
    ecoScore: 95,
    listedDate: '2024-04-08',
    status: 'Active',
    views: 78,
    likes: 23
  },
  {
    _id: 'listed3',
    title: 'Organic Cotton Tote Bag',
    description: 'Stylish tote bag made from certified organic cotton',
    price: 599,
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
    ecoScore: 90,
    listedDate: '2024-04-05',
    status: 'Active',
    views: 32,
    likes: 8
  },
  {
    _id: 'listed4',
    title: 'Bamboo Phone Stand',
    description: 'Elegant phone stand crafted from sustainable bamboo',
    price: 299,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400'],
    ecoScore: 85,
    listedDate: '2024-04-03',
    status: 'Pending Review',
    views: 18,
    likes: 5
  },
  {
    _id: 'listed5',
    title: 'Upcycled Denim Jacket',
    description: 'Trendy jacket made from upcycled denim materials',
    price: 1599,
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'],
    ecoScore: 92,
    listedDate: '2024-04-01',
    status: 'Active',
    views: 67,
    likes: 19
  }
];

const UnifiedDashboard = () => {
  const { user } = useUser();
  const { favorites, addToCart, toggleFavorite, isInFavorites, getCartItemCount } = useCart();
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState('buyer');
  const [items, setItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showScoreHistory, setShowScoreHistory] = useState(false);
  const [scoreHistoryType, setScoreHistoryType] = useState('');
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [analyticsType, setAnalyticsType] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load items and sold items data
        setItems(hardcodedItems);
        setSoldItems(hardcodedSoldItems);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (user?.role) {
      if (user.role === 'seller') {
        setCurrentMode('seller');
      } else if (user.role === 'both') {
        setCurrentMode('buyer'); // Default to buyer for both
      } else {
        setCurrentMode('buyer');
      }
    }
  }, [user?.role]);

  const handleToggleFavorites = (item) => {
    const wasAdded = toggleFavorite(item);
    if (wasAdded) {
      alert('Item added to favorites!');
    } else {
      alert('Item removed from favorites!');
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    alert('Item added to cart!');
  };

  const handleShowScoreHistory = (type) => {
    setScoreHistoryType(type);
    setShowScoreHistory(true);
  };

  const handleShowAnalytics = (type) => {
    setAnalyticsType(type);
    setShowAnalyticsModal(true);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(items.map(item => item.category))];

  const totalEarnings = soldItems.reduce((sum, item) => sum + (item.soldPrice * item.quantity), 0);
  const totalCommission = soldItems.reduce((sum, item) => sum + item.commission, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Mode Switcher */}
      <div className="bg-white shadow-sm border-b">
        {/* Score History Modal */}
        {showScoreHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {scoreHistoryType === 'eco' ? 'Eco Score History' : 'Trust Score History'}
                </h3>
                <button
                  onClick={() => setShowScoreHistory(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {(scoreHistoryType === 'eco' ? ecoScoreHistory : trustScoreHistory).map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{entry.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">
                          {scoreHistoryType === 'eco' ? entry.score : `${entry.score}/5`}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">{entry.activity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Verification Modal */}
        {showVerification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Account Verification</h3>
                <button
                  onClick={() => setShowVerification(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                Verify your account to build trust with other users and unlock premium features.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowVerification(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowVerification(false);
                    // Handle verification process
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Start Verification
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Modal */}
        {showAnalyticsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {analyticsType === 'earnings' && 'Earnings History'}
                  {analyticsType === 'items' && 'Sold Items Details'}
                  {analyticsType === 'commission' && 'Commission Breakdown'}
                  {analyticsType === 'customers' && 'Customer List'}
                </h3>
                <button
                  onClick={() => setShowAnalyticsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {analyticsType === 'earnings' && earningsHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{entry.date}</span>
                      </div>
                      <div className="text-sm font-medium">{entry.item}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-green-600">₹{entry.amount}</span>
                      <span className="text-sm text-gray-500">Commission: ₹{entry.commission}</span>
                    </div>
                  </div>
                ))}

                {analyticsType === 'items' && soldItemsDetails.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{entry.date}</span>
                      </div>
                      <div className="text-sm font-medium">{entry.item}</div>
                      <div className="text-sm text-gray-600">to {entry.buyer}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold">₹{entry.price}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        entry.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        entry.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {entry.status}
                      </span>
                    </div>
                  </div>
                ))}

                {analyticsType === 'commission' && commissionBreakdown.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium">{entry.month}</div>
                      <div className="text-sm text-gray-600">{entry.sales} sales</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-purple-600">₹{entry.commission}</span>
                      <span className="text-sm text-gray-500">Rate: {entry.rate}</span>
                    </div>
                  </div>
                ))}

                {analyticsType === 'customers' && customersList.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium">{entry.name}</div>
                      <div className="text-sm text-gray-600">{entry.orders} orders</div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{entry.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-orange-600">₹{entry.totalSpent}</span>
                      <span className="text-sm text-gray-500">Last: {entry.lastOrder}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">EcoSprout Dashboard</h1>
              {user?.role === 'both' && (
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setCurrentMode('buyer')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentMode === 'buyer'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4 inline mr-2" />
                    Buyer Mode
                  </button>
                  <button
                    onClick={() => setCurrentMode('seller')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentMode === 'seller'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Package className="h-4 w-4 inline mr-2" />
                    Seller Mode
                  </button>
                </div>
              )}
              {user?.role !== 'both' && (
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    {user?.role === 'seller' ? (
                      <>
                        <Package className="h-4 w-4 inline mr-2" />
                        Seller Dashboard
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4 inline mr-2" />
                        Buyer Dashboard
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {currentMode === 'buyer' && (
                <>
                  <button
                    onClick={() => navigate('/cart')}
                    className="relative p-2 text-gray-600 hover:text-gray-900"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    {getCartItemCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getCartItemCount()}
                      </span>
                    )}
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <Heart className="h-6 w-6" />
                  </button>
                </>
              )}
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentMode === 'buyer' ? (
          // Buyer Mode Content
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShoppingBag className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Items in Cart</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {getCartItemCount()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Favorites</p>
                    <p className="text-2xl font-semibold text-gray-900">{favorites.length}</p>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-200"
                onClick={() => handleShowScoreHistory('eco')}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Eco Score</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-semibold text-green-600">92</p>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Excellent</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Click to view history</p>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-200"
                onClick={() => handleShowScoreHistory('trust')}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Trust Score</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-semibold text-blue-600">{user?.trustScore || 4.8}</p>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">★★★★★</span>
                      {user?.isVerified && (
                        <div className="flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Click to view history</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {currentMode === 'buyer' ? 'Buyer Dashboard' : 'Seller Dashboard'}
                    </h1>
                    {user?.isVerified && (
                      <div className="flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                        <Shield className="h-4 w-4 mr-1" />
                        Verified {currentMode === 'buyer' ? 'Buyer' : 'Seller'}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">
                    {currentMode === 'buyer' 
                      ? 'Discover eco-friendly products and manage your purchases' 
                      : 'Manage your listings and track your sales performance'
                    }
                  </p>
                  {user?.isVerified && (
                    <p className="text-green-600 text-sm mt-1 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Your account is verified and trusted by the community
                    </p>
                  )}
                </div>
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search eco-friendly products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* Verification Button */}
                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={() => setShowVerification(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    {user?.isVerified ? 'View Verification' : 'Get Verified'}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-6">
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                  
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Favorites Section */}
            {favorites.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="h-5 w-5 text-red-600 mr-2" />
                  Your Favorites ({favorites.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.slice(0, 3).map((item) => (
                    <div key={item._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {item.images && item.images[0] ? (
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                          <p className="text-sm text-gray-600">₹{item.price}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">{item.ecoScore}/100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {favorites.length > 3 && (
                  <div className="mt-4 text-center">
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      View all {favorites.length} favorites →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Items Grid/List */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredItems.map((item) => (
                <div key={item._id} className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'}`}>
                    {item.images && item.images[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className={`w-full object-cover ${
                          viewMode === 'list' ? 'h-32' : 'h-48'
                        } rounded-t-lg`}
                      />
                    ) : (
                      <div className={`w-full bg-gray-200 flex items-center justify-center ${
                        viewMode === 'list' ? 'h-32' : 'h-48'
                      } rounded-t-lg`}>
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                      <button
                        onClick={() => handleToggleFavorites(item)}
                        className="ml-2 p-1 rounded-full hover:bg-gray-100"
                      >
                        <Heart 
                          className={`h-5 w-5 ${
                            isInFavorites(item._id) 
                              ? 'text-red-600 fill-current' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{item.ecoScore}/100</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Seller Mode Content
          <>
            {/* Seller Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div 
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-200"
                onClick={() => handleShowAnalytics('earnings')}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-semibold text-gray-900">₹{totalEarnings}</p>
                    <p className="text-xs text-gray-500 mt-1">Click to view details</p>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-200"
                onClick={() => handleShowAnalytics('items')}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Items Sold</p>
                    <p className="text-2xl font-semibold text-gray-900">{soldItems.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Click to view details</p>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-200"
                onClick={() => handleShowAnalytics('commission')}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Commission Earned</p>
                    <p className="text-2xl font-semibold text-gray-900">₹{totalCommission.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-1">Click to view breakdown</p>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-200"
                onClick={() => handleShowAnalytics('customers')}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Customers</p>
                    <p className="text-2xl font-semibold text-gray-900">{new Set(soldItems.map(item => item.buyer)).size}</p>
                    <p className="text-xs text-gray-500 mt-1">Click to view list</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sold Items */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-medium text-gray-900">Sold Items</h2>
                  {user?.isVerified && (
                    <div className="flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified Seller
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowVerification(true)}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {user?.isVerified ? 'View Verification' : 'Get Verified'}
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {soldItems.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600">Sold to: {item.buyer}</p>
                          <p className="text-sm text-gray-600">Date: {item.soldDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹{item.soldPrice} x {item.quantity}</p>
                        <p className="text-sm text-green-600">Commission: ₹{item.commission}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Listed Items Section */}
            <div className="bg-white rounded-lg shadow mt-8">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-medium text-gray-900">My Listed Items</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {sellerListedItems.length} Active Listings
                  </span>
                </div>
                <button
                  onClick={() => navigate('/create')}
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sellerListedItems.map((item) => (
                    <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.status === 'Active' ? 'bg-green-100 text-green-800' :
                            item.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="absolute top-2 left-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Eco Score: {item.ecoScore}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-semibold text-gray-900">₹{item.price}</span>
                          <span className="text-sm text-gray-500">{item.category}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span>Listed: {item.listedDate}</span>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{item.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{item.likes}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Edit
                          </button>
                          <button className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            View Stats
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location Map Section */}
            <div className="bg-white rounded-lg shadow mt-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">NMIT Bangalore Location</h2>
                <p className="text-sm text-gray-600">Nitte Meenakshi Institute of Technology, Yelahanka</p>
              </div>
              <div className="p-6">
                <LocationMap height="400px" showNMIT={true} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Verification Modal */}
      {showVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <DigiLockerVerification onClose={() => setShowVerification(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedDashboard;
