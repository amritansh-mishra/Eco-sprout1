import apiService from './api.js';

class AuthService {
  // Register user
  async register(userData) {
    const response = await apiService.post('/auth/register', userData);
    
    if (response.success && response.token) {
      apiService.setAuthToken(response.token);
    }
    
    return response;
  }

  // Login user
  async login(credentials) {
    const response = await apiService.post('/auth/login', credentials);
    
    if (response.success && response.token) {
      apiService.setAuthToken(response.token);
      
      // Store user data in localStorage
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }
    
    return response;
  }

  // Logout user
  logout() {
    apiService.removeAuthToken();
  }

  // Get current user
  async getCurrentUser() {
    const token = apiService.getAuthToken();
    if (!token) {
      return { success: false, message: 'No token found' };
    }
    
    const response = await apiService.get('/auth/me');
    return response;
  }

  // Update user profile
  async updateProfile(profileData) {
    const response = await apiService.put('/auth/profile', profileData);
    return response;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!apiService.getAuthToken();
  }
}

export default new AuthService();
