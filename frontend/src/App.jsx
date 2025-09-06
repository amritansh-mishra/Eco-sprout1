import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from './components/Toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Listing from './pages/Listing';
import CreateItem from './pages/CreateItem';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    <UserProvider>
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
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer toasts={[]} onClose={() => {}} />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;