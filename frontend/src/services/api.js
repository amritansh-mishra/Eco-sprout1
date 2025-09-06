const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_URL;
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // Set auth token in localStorage
  setAuthToken(token) {
    localStorage.setItem('token', token);
  }

  // Remove auth token from localStorage
  removeAuthToken() {
    localStorage.removeItem('token');
  }

  // Mock users for demo
  getMockUsers() {
    return [
      {
        id: '1',
        name: 'John Buyer',
        email: 'buyer@test.com',
        password: 'password',
        role: 'buyer',
        trustScore: 85,
        isVerified: true,
        ecoImpact: { carbonSaved: 12.5, waterSaved: 450 }
      },
      {
        id: '2',
        name: 'Sarah Seller',
        email: 'seller@test.com',
        password: 'password',
        role: 'seller',
        trustScore: 92,
        isVerified: true,
        ecoImpact: { carbonSaved: 45.2, waterSaved: 1200 }
      },
      {
        id: '3',
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'password',
        role: 'both',
        trustScore: 98,
        isVerified: true,
        ecoImpact: { carbonSaved: 78.9, waterSaved: 2100 }
      }
    ];
  }

  // Generic request method
  async request(endpoint, options = {}) {
    // Handle mock authentication for demo
    if (endpoint === '/auth/login') {
      return this.mockLogin(JSON.parse(options.body));
    }
    
    if (endpoint === '/auth/me') {
      return this.mockGetCurrentUser();
    }

    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      // Fallback to mock for demo
      if (endpoint === '/auth/login') {
        return this.mockLogin(JSON.parse(options.body));
      }
      throw error;
    }
  }

  // Mock login method
  async mockLogin(credentials) {
    const { email, role } = credentials;
    const users = this.getMockUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }

    // Validate role - user can only login with their assigned role or if they have 'both' role
    if (user.role !== 'both' && user.role !== role) {
      return {
        success: false,
        message: `Access denied. This account is registered as ${user.role}. Please select the correct role or contact support.`
      };
    }

    // Generate mock token
    const token = `mock-token-${user.id}-${Date.now()}`;
    
    return {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        trustScore: user.trustScore,
        isVerified: user.isVerified,
        ecoImpact: user.ecoImpact,
        role: user.role
      }
    };
  }

  // Mock get current user
  async mockGetCurrentUser() {
    const token = this.getAuthToken();
    if (!token) {
      return { success: false, message: 'No token found' };
    }

    // Extract user ID from mock token
    const userId = token.split('-')[2];
    const users = this.getMockUsers();
    const user = users.find(u => u.id === userId);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        trustScore: user.trustScore,
        isVerified: user.isVerified,
        ecoImpact: user.ecoImpact,
        role: user.role
      }
    };
  }

  // GET request
  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  // POST request
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  // PUT request
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

export default new ApiService();
