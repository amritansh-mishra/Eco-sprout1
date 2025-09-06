import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import confetti from 'canvas-confetti';
import {
  Shield,
  CheckCircle,
  ArrowLeft,
  Lock,
  Leaf,
  QrCode,
  Timer,
  AlertTriangle,
  MapPin
} from 'lucide-react';

const Checkout = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState('details'); // details, escrow, scanning, success
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qrCode, setQrCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    pincode: '',
    phone: ''
  });
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadCart();
  }, [user, navigate, loadCart]);

  useEffect(() => {
    if (step === 'scanning' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const loadCart = useCallback(() => {
    try {
      const savedCart = localStorage.getItem('ecoSprout_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      navigate('/cart');
    }
  }, [navigate]);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const ecoDiscount = subtotal * 0.05; // 5% eco discount
    const shipping = subtotal > 500 ? 0 : 50;
    return {
      subtotal,
      ecoDiscount,
      shipping,
      total: subtotal - ecoDiscount + shipping
    };
  };

  const handleAddressChange = (field, value) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  const proceedToEscrow = () => {
    if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.pincode || !shippingAddress.phone) {
      alert('Please fill in all shipping details');
      return;
    }
    setStep('escrow');
  };

  const fetchQRCode = async () => {
    setIsLoading(true);
    
    try {
      // Mock QR code generation - create a simple QR code placeholder
      const qrData = `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="white"/>
          <rect x="20" y="20" width="160" height="160" fill="black"/>
          <rect x="40" y="40" width="120" height="120" fill="white"/>
          <text x="100" y="105" text-anchor="middle" font-size="12" fill="black">QR Code</text>
          <text x="100" y="120" text-anchor="middle" font-size="8" fill="black">Scan to Pay</text>
        </svg>
      `)}`;
      setQrCode(qrData);
      setStep('scanning');
      setTimeLeft(600); // Reset timer
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateQRScan = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setStep('success');
        // Clear cart after successful purchase
        localStorage.removeItem('ecoSprout_cart');
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 }
        });
      }, 1500);
    }, 2000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
            <p className="text-gray-600">Protected by ecoSprout Escrow</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center space-x-2 ${step === 'details' ? 'text-green-600' : step === 'escrow' || step === 'scanning' || step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'details' ? 'bg-green-600 text-white' : step === 'escrow' || step === 'scanning' || step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <span className="font-medium">Details</span>
          </div>
          <div className="flex-1 h-1 bg-gray-300 mx-4">
            <div 
              className={`h-full transition-all duration-500 ${step === 'escrow' || step === 'scanning' || step === 'success' ? 'bg-green-600 w-full' : 'bg-green-600 w-0'}`}
            ></div>
          </div>
          <div className={`flex items-center space-x-2 ${step === 'escrow' ? 'text-green-600' : step === 'scanning' || step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'escrow' ? 'bg-green-600 text-white' : step === 'scanning' || step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
            <span className="font-medium">Escrow</span>
          </div>
          <div className="flex-1 h-1 bg-gray-300 mx-4">
            <div 
              className={`h-full transition-all duration-500 ${step === 'success' ? 'bg-green-600 w-full' : 'bg-green-600 w-0'}`}
            ></div>
          </div>
          <div className={`flex items-center space-x-2 ${step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              3
            </div>
            <span className="font-medium">Complete</span>
          </div>
        </div>

        {/* Step 1: Purchase Details */}
        {step === 'details' && (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          <Leaf className="h-3 w-3" />
                          <span>Eco Score: {item.ecoScore}</span>
                        </div>
                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        <div className="text-lg font-bold text-green-600">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => handleAddressChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) => handleAddressChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={shippingAddress.pincode}
                      onChange={(e) => handleAddressChange('pincode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Pincode"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => handleAddressChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Escrow Protection */}
            <div className="bg-white rounded-lg shadow p-6 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Protected by Escrow</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Your payment is held securely until you confirm receipt of the item. 
                    If there are any issues, we&apos;ll help resolve them.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Money held securely until delivery</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Full refund if item not as described</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>24/7 dispute resolution support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-white rounded-lg shadow p-6 bg-gradient-to-r from-green-50 to-blue-50">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Leaf className="h-5 w-5 text-green-600 mr-2" />
                Your Environmental Impact
              </h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {cartItems.reduce((total, item) => total + (item.co2Saved || 5) * item.quantity, 0).toFixed(1)}kg
                </div>
                <div className="text-sm text-gray-600">CO₂ saved by choosing second-hand</div>
              </div>
            </div>

            {/* Total */}
            <div className="bg-white rounded-lg shadow p-6">
              {(() => {
                const totals = calculateTotal();
                return (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{totals.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Eco Discount (5%)</span>
                      <span>-₹{totals.ecoDiscount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{totals.shipping === 0 ? 'Free' : `₹${totals.shipping}`}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Amount</span>
                      <span className="text-2xl text-green-600">₹{totals.total.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Protected by escrow • Free shipping on orders over ₹500
                    </p>
                  </div>
                );
              })()}
            </div>

            <button
              onClick={proceedToEscrow}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Lock className="h-4 w-4 mr-2" />
              Proceed to Secure Payment
            </button>
          </div>
        )}

        {/* Step 2: Loading Escrow */}
        {step === 'escrow' && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Setting up Secure Escrow
            </h2>
            <p className="text-gray-600">
              Please wait while we create your secure payment link...
            </p>
            <button
              onClick={fetchQRCode}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Generate QR Code (Demo)
            </button>
          </div>
        )}

        {/* Step 3: QR Code Scanning */}
        {step === 'scanning' && qrCode && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Scan QR Code to Complete Payment
                </h2>
                <p className="text-gray-600">
                  Use your banking app or payment app to scan the QR code below
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 mb-6">
                <img
                  src={qrCode}
                  alt="Payment QR Code"
                  className="mx-auto mb-4 w-48 h-48"
                />
                <p className="text-sm text-gray-500">
                  Amount: <span className="font-semibold text-gray-900">₹{calculateTotal().total.toFixed(2)}</span>
                </p>
              </div>

              {/* Timer */}
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Timer className="h-5 w-5 text-orange-500" />
                <span className="text-lg font-semibold text-orange-600">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-gray-600">remaining</span>
              </div>

              {/* Demo button */}
              <button
                onClick={simulateQRScan}
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors mb-4 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Simulate Successful Scan (Demo)'}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Having trouble? Contact support or try again
                </p>
                <button
                  onClick={() => setStep('details')}
                  className="text-green-600 hover:text-green-700 text-sm"
                >
                  ← Go back
                </button>
              </div>
            </div>

            {/* Security notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-900 mb-1">Security Notice</h3>
                  <p className="text-sm text-yellow-800">
                    Never share this QR code with anyone. Only scan it with your trusted payment app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                🎉 Payment Successful!
              </h2>
              <p className="text-gray-600 mb-4">
                Your purchase is protected by escrow until delivery
              </p>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Escrow Protected</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Secure Transaction</span>
                </div>
              </div>
            </div>

            {/* Order details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-medium">{cartItems.length} item(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-green-600">₹{calculateTotal().total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protection:</span>
                  <span className="font-medium text-green-600">Escrow Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CO₂ Saved:</span>
                  <span className="font-medium text-green-600">
                    {cartItems.reduce((total, item) => total + (item.co2Saved || 5) * item.quantity, 0).toFixed(1)}kg
                  </span>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div className="text-left mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Sellers will be notified of your purchase</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Arrange pickup or delivery with each seller</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Confirm receipt to release payment</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/buyer-dashboard')}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                View in Dashboard
              </button>
              <button
                onClick={() => navigate('/buyer-dashboard')}
                className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;