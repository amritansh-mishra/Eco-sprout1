import { Link } from 'react-router-dom';
import { Leaf, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary-600 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ecoSprout</span>
            </div>
            <p className="text-gray-300">
              Building a sustainable future through trusted second-hand marketplace connections.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Marketplace</h3>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Browse Items
              </Link>
              <Link to="/create" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Sell Item
              </Link>
              <Link to="/categories" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Categories
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Trust & Safety</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Verification Process
              </a>
              <a href="#" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Trust Score System
              </a>
              <a href="#" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Safety Guidelines
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Community
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2025 ecoSprout. Made with <Heart className="h-4 w-4 text-red-500 inline mx-1" /> for the planet.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;