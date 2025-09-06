import { useState, useEffect, useCallback } from 'react';
import { useUser } from '../contexts/UserContext';
import itemService from '../services/itemService';
import { verificationService } from '../services/verificationService';
import { Plus, Package, TrendingUp, DollarSign, Users, Shield, Edit, Trash2, Eye } from 'lucide-react';
import DigiLockerVerification from '../components/DigiLockerVerification';

const SellerDashboard = () => {
  const { user } = useUser();
  const [myItems, setMyItems] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalItems: 0,
    totalViews: 0,
    totalRevenue: 0,
    activeListings: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [itemsResult, verificationResult] = await Promise.all([
        itemService.getUserItems(user?.id),
        verificationService.getVerificationStatus()
      ]);

      if (itemsResult.success) {
        const items = itemsResult.data.items || [];
        setMyItems(items);
        
        // Calculate stats
        setStats({
          totalItems: items.length,
          activeListings: items.filter(item => item.status === 'available').length,
          totalViews: items.reduce((sum, item) => sum + (item.views || 0), 0),
          totalRevenue: items.reduce((sum, item) => sum + (item.soldPrice || 0), 0)
        });
      }

      if (verificationResult.success) {
        setVerificationStatus(verificationResult.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

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

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemService.deleteItem(itemId);
        setMyItems(prev => prev.filter(item => item._id !== itemId));
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item');
      }
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your listings and track your sales</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
            <Plus className="h-5 w-5 mr-2" />
            Add New Item
          </button>
        </div>

        {/* Verification Alert */}
        {verificationStatus && !verificationStatus.isVerified && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-yellow-600 mr-3" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800">Seller Verification Required</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Complete DigiLocker verification to start selling and build customer trust.
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

        {/* Seller Profile Setup Alert */}
        {verificationStatus?.isVerified && !user?.sellerProfile?.isApproved && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-600 mr-3" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-blue-800">Complete Seller Profile</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Set up your business details to start selling on EcoSprout.
                </p>
              </div>
              <button
                onClick={() => console.log('Setup Profile clicked')}
                className="ml-4 px-4 py-2 text-sm font-medium text-blue-800 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200"
              >
                Setup Profile
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Items */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">My Listings</h2>
          </div>
          <div className="p-6">
            {myItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No items listed yet</h3>
                <p className="mt-2 text-gray-600">Start by adding your first item to the marketplace.</p>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center mx-auto hover:bg-green-700">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Item
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myItems.map((item) => (
                  <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden">
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
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : item.status === 'sold'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Eye className="h-4 w-4 mr-1" />
                          {item.views || 0}
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center justify-center">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item._id)}
                          className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 flex items-center justify-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DigiLocker Verification Modal */}
      {showVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Seller Verification</h2>
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
    </div>
  );
};

export default SellerDashboard;
