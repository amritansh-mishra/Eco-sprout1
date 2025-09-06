import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  Droplets, 
  Leaf, 
  Recycle, 
  MapPin, 
  Star,
  Shield,
  Search,
  TrendingUp
} from 'lucide-react';
import itemService from '../services/itemService.js';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Home = () => {
  const [co2Saved, setCo2Saved] = useState(0);
  const [waterSaved, setWaterSaved] = useState(0);
  const [itemsRescued, setItemsRescued] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [items, setItems] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  const categories = [
    { id: 'all', name: 'All Items', icon: '🌟' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'furniture', name: 'Furniture', icon: '🪑' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'home', name: 'Home & Garden', icon: '🏠' },
  ];

  const featuredItems = [
    {
      id: 1,
      title: 'Vintage Wooden Bookshelf',
      price: 89,
      location: 'Pitampura, Delhi',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: { name: 'Ujjwal M.', trustScore: 92, isVerified: true },
      ecoScore: 8.5,
      co2Saved: 12.3,
      condition: 'Good',
      category: 'furniture'
    },
    {
      id: 2,
      title: 'iPhone 12 Pro Max',
      price: 599,
      location: 'Bengaluru, Karnataka',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: { name: 'Aryan Rajput.', trustScore: 88, isVerified: true },
      ecoScore: 9.2,
      co2Saved: 45.6,
      condition: 'Excellent',
      category: 'electronics'
    },
    {
      id: 3,
      title: 'Designer Winter Coat',
      price: 125,
      location: 'MG Road, Bengaluru',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: { name: 'Anam Imtiyaz.', trustScore: 95, isVerified: true },
      ecoScore: 7.8,
      co2Saved: 23.1,
      condition: 'Like New',
      category: 'clothing'
    },
    {
      id: 4,
      title: 'Acoustic Guitar',
      price: 180,
      location: 'Chennai, Tamil Nadu',
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: { name: 'Arunima Singh.', trustScore: 87, isVerified: false },
      ecoScore: 6.9,
      co2Saved: 18.4,
      condition: 'Good',
      category: 'sports'
    }
  ];

  const mapItems = [
    { id: 1, position: [40.6782, -73.9442], title: 'Vintage Bookshelf', price: 89 },
    { id: 2, position: [40.7580, -73.9855], title: 'iPhone 12 Pro Max', price: 599 },
    { id: 3, position: [40.7282, -73.7949], title: 'Designer Coat', price: 125 },
    { id: 4, position: [40.8448, -73.8648], title: 'Acoustic Guitar', price: 180 },
  ];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate counters
    const animateCounter = (setter, target, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateCounter(setCo2Saved, 2847);
    animateCounter(setWaterSaved, 15632);
    animateCounter(setItemsRescued, 1893);

    // Fetch items from backend
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await itemService.getItems({
          limit: 8,
          sort: '-createdAt'
        });
        
        if (response.success) {
          setItems(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch items:', err);
        setError(err.message);
        // Fallback to static data if API fails
        setItems(featuredItems);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);


  // Use items from API or fallback to static data
  const displayItems = items.length > 0 ? items : featuredItems;
  
  const filteredItems = displayItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.seller?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20 pb-16">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Discover
                <span className="text-primary-600">
                  {' '}Sustainable{' '}
                </span>
                Treasures
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join our trusted community marketplace where every purchase helps save the planet. 
                Find quality second-hand items from verified sellers.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for sustainable treasures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-400 transition-colors bg-white"
                />
              </div>
            </div>

            {/* Live Eco Counters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="eco-counter">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-primary-600 rounded-full">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary-600">{co2Saved.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">kg CO₂ Saved</div>
                <div className="mt-2 text-xs text-gray-500 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% this month
                </div>
              </div>

              <div className="eco-counter">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-secondary-600 rounded-full">
                    <Droplets className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-secondary-600">{waterSaved.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">L Water Saved</div>
                <div className="mt-2 text-xs text-gray-500 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% this month
                </div>
              </div>

              <div className="eco-counter">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-accent-600 rounded-full">
                    <Recycle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-accent-600">{itemsRescued.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">Items Rescued</div>
                <div className="mt-2 text-xs text-gray-500 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% this month
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Chips */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Items</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover amazing second-hand treasures from our most trusted sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                to={`/listing/${item.id}`}
                className="card-hover group overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 left-3 flex items-center space-x-1 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse-glow">
                    <Leaf className="h-3 w-3" />
                    <span>{item.ecoScore}</span>
                  </div>
                  <div className="absolute top-3 right-3 glass-effect px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {item.condition}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                      <div className="text-sm font-medium text-gray-900 truncate">{item.title}</div>
                      <div className="text-lg font-bold text-primary-600">₹{item.price}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-primary-600">
                      ₹{item.price}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-700">
                          {item.seller.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-xs">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900">{item.seller.name}</span>
                          {item.seller.isVerified && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div className={`inline-flex items-center space-x-1 px-1 py-0.5 rounded-full text-white text-xs ₹{getTrustColor(item.seller.trustScore)}`}>
                          <Shield className="h-2 w-2" />
                          <span>{item.seller.trustScore}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <Leaf className="h-3 w-3 text-primary-600" />
                      <span>{item.co2Saved}kg CO₂ saved</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-trust-500 fill-current" />
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Items Near You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover sustainable treasures in your neighborhood
            </p>
          </div>

          <div className="card p-6">
            <MapContainer
              center={[40.7128, -74.0060]}
              zoom={10}
              className="leaflet-container"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapItems.map((item) => (
                <Marker key={item.id} position={item.position}>
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-primary-600 font-bold">₹{item.price}</p>
                      <Link
                        to={`/listing/₹{item.id}`}
                        className="inline-block mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;