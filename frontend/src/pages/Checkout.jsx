import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import confetti from 'canvas-confetti';
import {
  Shield,
  QrCode,
  CheckCircle,
  ArrowLeft,
  Loader,
  AlertTriangle,
  Lock,
  Leaf,
  DollarSign,
  MapPin,
  User,
  Timer
} from 'lucide-react';

const Checkout = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState('details'); // details, escrow, scanning, success
  const [qrCode, setQrCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // Mock listing data
  const listing = {
    id: 1,
    title: 'Vintage Wooden Bookshelf',
    price: 89,
    location: 'Brooklyn, NY',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    seller: {
      name: 'Sarah Mitchell',
      trustScore: 92,
      isVerified: true
    },
    ecoScore: 8.5,
    co2Saved: 12.3
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (step === 'scanning' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const fetchQRCode = async () => {
    setIsLoading(true);
    setStep('escrow');
    
    try {
      // In a real implementation, this would call your /escrow endpoint
      // const response = await fetch('/api/escrow', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     itemId: id,
      //     amount: listing.price,
      //     buyerId: user.id,
      //     sellerId: listing.seller.id
      //   })
      // });
      // const { qrCode, escrowId } = await response.json();
      
      // Simulate API call to /escrow endpoint
      setTimeout(() => {
        // Generate a mock QR code URL with escrow data
        const escrowData = {
          escrowId: `escrow_₹{Date.now()}`,
          amount: listing.price,
          itemId: id,
          buyerId: user.id,
          sellerId: listing.seller.id,
          timestamp: new Date().toISOString()
        };
        
        const qrData = encodeURIComponent(JSON.stringify(escrowData));
        setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=₹{qrData}`);
        setStep('scanning');
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error fetching QR code:', error);
      setIsLoading(false);
      // Handle error - show error message to user
    }
  };

  const simulateQRScan = () => {
    setStep('success');
    
    // Enhanced confetti animation with trust-building elements
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    // Initial burst of confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#16a34a', '#15803d', '#eab308', '#ca8a04', '#3b82f6', '#8b5cf6']
    });

    const confettiInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(confettiInterval);
      }

      const particleCount = 30 * (timeLeft / duration);

      // Left side burst
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
        colors: ['#22c55e', '#16a34a', '#15803d', '#eab308', '#ca8a04']
      });
      
      // Right side burst
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
        colors: ['#22c55e', '#16a34a', '#15803d', '#eab308', '#ca8a04']
      });

      // Center burst for trust celebration
      if (Math.random() < 0.3) {
        confetti({
          particleCount: 20,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#22c55e', '#16a34a', '#15803d'],
          shapes: ['star', 'circle'],
          scalar: 1.2
        });
      }
    }, 200);

    // Success sound effect (in a real app, you'd play an actual sound)
    // playSuccessSound();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `₹{minutes}:₹{secs.toString().padStart(2, '0')}`;
  };

  const getTrustColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-trust-500';
    return 'bg-orange-500';
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
            onClick={() => navigate(`/listing/₹{id}`)}
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
          <div className={`flex items-center space-x-2 ₹{step === 'details' ? 'text-primary-600' : step === 'escrow' || step === 'scanning' || step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ₹{step === 'details' ? 'bg-primary-600 text-white' : step === 'escrow' || step === 'scanning' || step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <span className="font-medium">Details</span>
          </div>
          <div className="flex-1 h-1 bg-gray-300 mx-4">
            <div 
              className={`h-full transition-all duration-500 ₹{step === 'escrow' || step === 'scanning' || step === 'success' ? 'bg-green-600 w-full' : 'bg-primary-600 w-0'}`}
            ></div>
          </div>
          <div className={`flex items-center space-x-2 ₹{step === 'escrow' ? 'text-primary-600' : step === 'scanning' || step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ₹{step === 'escrow' ? 'bg-primary-600 text-white' : step === 'scanning' || step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
            <span className="font-medium">Escrow</span>
          </div>
          <div className="flex-1 h-1 bg-gray-300 mx-4">
            <div 
              className={`h-full transition-all duration-500 ₹{step === 'success' ? 'bg-green-600 w-full' : 'bg-primary-600 w-0'}`}
            ></div>
          </div>
          <div className={`flex items-center space-x-2 ₹{step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ₹{step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              3
            </div>
            <span className="font-medium">Complete</span>
          </div>
        </div>

        {/* Step 1: Purchase Details */}
        {step === 'details' && (
          <div className="space-y-6">
            {/* Item Summary */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Item Summary</h2>
              <div className="flex items-center space-x-4">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{listing.title}</h3>
                  <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1 bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                      <Leaf className="h-3 w-3" />
                      <span>Eco Score: {listing.ecoScore}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      ₹{listing.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h2>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{listing.seller.name}</span>
                    {listing.seller.isVerified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-white text-xs ₹{getTrustColor(listing.seller.trustScore)}`}>
                    <Shield className="h-3 w-3" />
                    <span>Trust Score: {listing.seller.trustScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Escrow Protection */}
            <div className="card p-6 bg-gradient-to-r from-green-50 to-primary-50">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Protected by Escrow</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Your payment is held securely until you confirm receipt of the item. 
                    If there are any issues, we'll help resolve them.
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
            <div className="card p-6 bg-gradient-to-r from-primary-50 to-green-50">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Leaf className="h-5 w-5 text-primary-600 mr-2" />
                Your Environmental Impact
              </h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  {listing.co2Saved}kg
                </div>
                <div className="text-sm text-gray-600">CO₂ saved by choosing second-hand</div>
              </div>
            </div>

            {/* Total */}
            <div className="card p-6">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total Amount</span>
                <span className="text-2xl text-primary-600">₹{listing.price}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                No additional fees • Protected by escrow
              </p>
            </div>

            <button
              onClick={fetchQRCode}
              className="w-full btn-primary flex items-center justify-center"
            >
              <Lock className="h-4 w-4 mr-2" />
              Proceed to Secure Payment
            </button>
          </div>
        )}

        {/* Step 2: Loading Escrow */}
        {step === 'escrow' && (
          <div className="card p-8 text-center">
            <div className="mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Setting up Secure Escrow
            </h2>
            <p className="text-gray-600">
              Please wait while we create your secure payment link...
            </p>
          </div>
        )}

        {/* Step 3: QR Code Scanning */}
        {step === 'scanning' && qrCode && (
          <div className="space-y-6">
            <div className="card p-8 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-12 w-12 text-primary-600" />
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
                  className="mx-auto mb-4"
                />
                <p className="text-sm text-gray-500">
                  Amount: <span className="font-semibold text-gray-900">₹{listing.price}</span>
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
                className="w-full btn-primary mb-4"
              >
                Simulate Successful Scan (Demo)
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Having trouble? Contact support or try again
                </p>
                <button
                  onClick={() => setStep('details')}
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  ← Go back
                </button>
              </div>
            </div>

            {/* Security notice */}
            <div className="card p-4 bg-trust-50 border border-trust-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-trust-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-trust-900 mb-1">Security Notice</h3>
                  <p className="text-sm text-trust-800">
                    Never share this QR code with anyone. Only scan it with your trusted payment app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="card p-8 text-center animate-bounce-in">
            <div className="mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-heartbeat">
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
                  <span className="text-sm font-medium text-blue-800">Verified Seller</span>
                </div>
              </div>
            </div>

            {/* Order details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item:</span>
                  <span className="font-medium">{listing.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seller:</span>
                  <span className="font-medium">{listing.seller.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-primary-600">₹{listing.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protection:</span>
                  <span className="font-medium text-green-600">Escrow Active</span>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div className="text-left mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span>Seller will be notified of your purchase</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span>Arrange pickup or delivery with the seller</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span>Confirm receipt to release payment</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full btn-primary"
              >
                View in Dashboard
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full btn-secondary"
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