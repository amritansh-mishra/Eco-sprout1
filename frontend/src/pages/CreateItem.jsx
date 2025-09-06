import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import {
  Camera,
  MapPin,
  Leaf,
  DollarSign,
  Package,
  FileText,
  X,
  Plus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const CreateItem = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    features: [''],
  });

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'furniture', name: 'Furniture', icon: '🪑' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'sports', name: 'Sports & Recreation', icon: '⚽' },
    { id: 'home', name: 'Home & Garden', icon: '🏠' },
    { id: 'toys', name: 'Toys & Games', icon: '🎮' },
    { id: 'automotive', name: 'Automotive', icon: '🚗' },
  ];

  const conditions = [
    { id: 'new', name: 'Like New', description: 'Barely used, no visible wear' },
    { id: 'excellent', name: 'Excellent', description: 'Minor wear, fully functional' },
    { id: 'good', name: 'Good', description: 'Some wear, works perfectly' },
    { id: 'fair', name: 'Fair', description: 'Noticeable wear, works well' },
    { id: 'poor', name: 'Poor', description: 'Heavy wear, may need repair' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
      // Show success message
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you'd upload to a service like Cloudinary
    // For demo, we'll use placeholder URLs
    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      file
    }));
    setImages([...images, ...newImages].slice(0, 5)); // Max 5 images
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures.length ? newFeatures : ['']
    });
  };

  const calculateEcoScore = () => {
    let score = 5; // Base score
    
    // Category bonus
    if (['electronics', 'furniture'].includes(formData.category)) score += 2;
    if (['clothing', 'books'].includes(formData.category)) score += 1.5;
    
    // Condition bonus
    if (formData.condition === 'new') score += 2;
    else if (formData.condition === 'excellent') score += 1.5;
    else if (formData.condition === 'good') score += 1;
    
    return Math.min(score, 10).toFixed(1);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="card p-8">
            <div className="mb-6">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Login Required
              </h2>
              <p className="text-gray-600">
                Please log in to create a listing on our marketplace.
              </p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary w-full"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            List Your Item
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your sustainable treasure with our community. Every item you sell helps build a more circular economy.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Photos (up to 5)
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.url}
                    alt="Upload preview"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {images.length < 5 && (
                <label className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
                  <div className="text-center">
                    <Plus className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs text-gray-500">Add Photo</span>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            {images.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg mt-4">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Upload photos of your item</p>
                <p className="text-sm text-gray-400 mt-1">Good photos help your item sell faster!</p>
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Vintage Leather Jacket, iPhone 12, Wooden Bookshelf"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                    Condition *
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    required
                    value={formData.condition}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select condition</option>
                    {conditions.map((condition) => (
                      <option key={condition.id} value={condition.id}>
                        {condition.name} - {condition.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field resize-none"
                  placeholder="Describe your item in detail. Include condition, age, dimensions, and any special features..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Key Features (Optional)
            </h2>
            
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="input-field flex-1"
                    placeholder={index === 0 ? "e.g., Brand new condition" : "Add another feature"}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              
              {formData.features.length < 5 && (
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add another feature</span>
                </button>
              )}
            </div>
          </div>

          {/* Price and Location */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Price & Location
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="e.g., Brooklyn, NY"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Eco Impact Preview */}
          {formData.category && formData.condition && (
            <div className="card p-6 bg-gradient-to-r from-primary-50 to-green-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-primary-600" />
                Environmental Impact Preview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {calculateEcoScore()}
                  </div>
                  <div className="text-sm text-gray-600">Eco Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    ~{Math.round(Math.random() * 50 + 10)}kg
                  </div>
                  <div className="text-sm text-gray-600">CO₂ Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    ~{Math.round(Math.random() * 2000 + 200)}L
                  </div>
                  <div className="text-sm text-gray-600">Water Saved</div>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="card p-6">
            <div className="flex items-start space-x-3 mb-6">
              <AlertCircle className="h-5 w-5 text-trust-500 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p className="mb-2">By listing this item, you agree to:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Provide accurate descriptions and photos</li>
                  <li>• Respond to buyer inquiries within 24 hours</li>
                  <li>• Complete transactions through our secure platform</li>
                  <li>• Maintain the trust and safety of our community</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    List Item
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;