import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  Package,
  Star,
  CheckCircle,
  CreditCard,
  Truck,
  MapPin,
  Phone,
  User,
  Mail,
  QrCode,
  Clock,
  Shield
} from 'lucide-react';

const EnhancedCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showQRPayment, setShowQRPayment] = useState(false);
  const [paymentTimer, setPaymentTimer] = useState(300); // 5 minutes
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  useEffect(() => {
    loadCart();
  }, []);

  // Timer for QR payment
  useEffect(() => {
    let interval;
    if (showQRPayment && paymentTimer > 0) {
      interval = setInterval(() => {
        setPaymentTimer(prev => prev - 1);
      }, 1000);
    } else if (paymentTimer === 0) {
      setShowQRPayment(false);
      setPaymentTimer(300);
    }
    return () => clearInterval(interval);
  }, [showQRPayment, paymentTimer]);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('ecoSprout_cart') || '[]');
    setCartItems(savedCart);
    setLoading(false);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('ecoSprout_cart', JSON.stringify(updatedCart));
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('ecoSprout_cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('ecoSprout_cart', JSON.stringify([]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    // Start QR payment process
    setShowQRPayment(true);
    setPaymentTimer(300); // Reset timer to 5 minutes
  };

  const handlePaymentSuccess = () => {
    setShowQRPayment(false);
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setOrderPlaced(false);
      navigate('/dashboard');
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const avgEcoScore = cartItems.length > 0 
    ? Math.round(cartItems.reduce((sum, item) => sum + (item.ecoScore || 85), 0) / cartItems.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {totalItems} items
              </span>
            </div>
            
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start shopping to add eco-friendly products to your cart</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items or Checkout Form */}
            <div className="lg:col-span-2">
              {!showCheckout ? (
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Cart Items</h2>
                  </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item._id} className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {item.images && item.images[0] ? (
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Package className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
                              
                              <div className="flex items-center mt-2 space-x-4">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600 ml-1">
                                    Eco Score: {item.ecoScore || 85}/100
                                  </span>
                                </div>
                                {item.seller && (
                                  <span className="text-sm text-gray-600">by {item.seller}</span>
                                )}
                              </div>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item._id)}
                              className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="p-1 rounded-lg border border-gray-300 hover:bg-gray-50"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="p-1 rounded-lg border border-gray-300 hover:bg-gray-50"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                              <p className="text-sm text-gray-600">₹{item.price} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="h-4 w-4 inline mr-1" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={shippingInfo.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="h-4 w-4 inline mr-1" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="h-4 w-4 inline mr-1" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          Pincode
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={shippingInfo.pincode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter pincode"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your complete address"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your city"
                        />
                      </div>
                    </div>
                    
                    {/* Delivery Options */}
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        <Truck className="h-4 w-4 inline mr-1" />
                        Delivery Options
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="radio" name="delivery" className="mr-2" defaultChecked />
                          <span className="text-sm">Standard Delivery (5-7 days) - Free</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="delivery" className="mr-2" />
                          <span className="text-sm">Express Delivery (2-3 days) - ₹99</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow sticky top-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Eco Impact */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">Eco-Friendly Choice</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Average Eco Score: {avgEcoScore}/100
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      You&apos;re making a positive environmental impact!
                    </p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                      <span className="font-medium">₹{subtotal}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${shipping}`
                        )}
                      </span>
                    </div>
                    
                    {subtotal < 1000 && (
                      <p className="text-xs text-blue-600">
                        Add ₹{1000 - subtotal} more for free shipping
                      </p>
                    )}
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold text-green-600">₹{total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    {!showCheckout ? (
                      <>
                        <button
                          onClick={handleProceedToCheckout}
                          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          Proceed to Checkout
                        </button>
                        
                        <button
                          onClick={() => navigate('/dashboard')}
                          className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Continue Shopping
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handlePlaceOrder}
                          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          <CreditCard className="h-5 w-5 inline mr-2" />
                          Place Order
                        </button>
                        
                        <button
                          onClick={() => setShowCheckout(false)}
                          className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Back to Cart
                        </button>
                      </>
                    )}
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center pt-4 text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Secure checkout with escrow protection
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Payment Modal */}
        {showQRPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="mb-6">
                  <QrCode className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Scan to Pay</h3>
                  <p className="text-gray-600">Scan this QR code with your UPI app to complete payment</p>
                </div>

                {/* Mock QR Code */}
                <div className="bg-gray-100 p-8 rounded-lg mb-6">
                  <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <QrCode className="h-24 w-24 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">QR Code</p>
                      <p className="text-xs text-gray-400">₹{total}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-800">Amount to Pay:</span>
                    <span className="font-semibold text-green-900">₹{total}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-green-800">Order ID:</span>
                    <span className="font-mono text-green-900">ECO{Date.now().toString().slice(-6)}</span>
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center justify-center mb-6">
                  <Clock className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="text-orange-600 font-medium">
                    Time remaining: {formatTime(paymentTimer)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handlePaymentSuccess}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <CheckCircle className="h-5 w-5 inline mr-2" />
                    Payment Completed
                  </button>
                  
                  <button
                    onClick={() => setShowQRPayment(false)}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel Payment
                  </button>
                </div>

                {/* Security Notice */}
                <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
                  <Shield className="h-4 w-4 mr-1" />
                  Secure payment with escrow protection
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Success Modal */}
        {orderPlaced && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Placed Successfully!</h3>
                  <p className="text-gray-600">Your eco-friendly order has been confirmed and will be processed shortly.</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-green-800">
                    <p className="font-medium">Order Details:</p>
                    <p>Items: {totalItems}</p>
                    <p>Total: ₹{total}</p>
                    <p>Estimated Delivery: 5-7 business days</p>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p>You will receive a confirmation email shortly.</p>
                  <p>Redirecting to dashboard...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedCart;
