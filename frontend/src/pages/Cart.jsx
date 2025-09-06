import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage or API
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('ecoSprout_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCart = (items) => {
    localStorage.setItem('ecoSprout_cart', JSON.stringify(items));
    setCartItems(items);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    const updatedItems = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedItems);
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item._id !== itemId);
    saveCart(updatedItems);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) return;
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/buyer-dashboard')}
            className="mr-4 p-2 rounded-full hover:bg-gray-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some eco-friendly products to get started!</p>
            <button
              onClick={() => navigate('/buyer-dashboard')}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Cart Items ({getTotalItems()})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item._id} className="p-6">
                      <div className="flex items-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                          {item.images && item.images[0] ? (
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                              <ShoppingBag className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          <div className="mt-2 flex items-center">
                            <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                            <span className="ml-2 text-sm text-gray-500">Eco Score: {item.ecoScore}</span>
                          </div>
                        </div>

                        <div className="ml-4 flex items-center space-x-3">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-center min-w-[60px]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-medium">₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eco Discount</span>
                    <span className="font-medium text-green-600">-₹{Math.floor(getTotalPrice() * 0.05)}</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{getTotalPrice() - Math.floor(getTotalPrice() * 0.05)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={proceedToCheckout}
                    disabled={cartItems.length === 0}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!user ? 'Login to Checkout' : 'Proceed to Checkout'}
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate('/buyer-dashboard')}
                    className="text-green-600 hover:text-green-700 text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Eco Benefits */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="text-sm font-medium text-green-900 mb-2">Eco Impact</h3>
                  <div className="text-xs text-green-700 space-y-1">
                    <p>• You&apos;ll earn {Math.floor(getTotalPrice() / 50)} eco points</p>
                    <p>• Carbon footprint reduced by ~2.5kg</p>
                    <p>• Supporting sustainable businesses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
