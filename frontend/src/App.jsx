import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from './components/Toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Listing from './pages/Listing';
import CreateItem from './pages/CreateItem';
import Checkout from './pages/Checkout';
import EnhancedCart from './pages/EnhancedCart';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import RoleBasedDashboard from './components/RoleBasedDashboard';
import './index.css';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/listing/:id" element={<Listing />} />
                <Route path="/create" element={<CreateItem />} />
                <Route path="/checkout/:id" element={<Checkout />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cart" element={<EnhancedCart />} />
                <Route path="/dashboard" element={<RoleBasedDashboard />} />
                <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                <Route path="/seller-dashboard" element={<SellerDashboard />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer toasts={[]} onClose={() => {}} />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;