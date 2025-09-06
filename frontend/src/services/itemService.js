import apiService from './api.js';

class ItemService {
  // Get all items with filters
  async getItems(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/items?${queryString}` : '/items';
    
    const response = await apiService.get(endpoint);
    return response;
  }

  // Get single item by ID
  async getItem(id) {
    const response = await apiService.get(`/items/${id}`);
    return response;
  }

  // Create new item
  async createItem(itemData) {
    const response = await apiService.post('/items', itemData);
    return response;
  }

  // Update item
  async updateItem(id, itemData) {
    const response = await apiService.put(`/items/${id}`, itemData);
    return response;
  }

  // Delete item
  async deleteItem(id) {
    const response = await apiService.delete(`/items/${id}`);
    return response;
  }

  // Toggle favorite
  async toggleFavorite(id) {
    const response = await apiService.post(`/items/${id}/favorite`);
    return response;
  }

  // Get user's items
  async getUserItems(userId) {
    const response = await apiService.get(`/items/user/${userId}`);
    return response;
  }

  // Search items
  async searchItems(searchQuery, filters = {}) {
    const allFilters = {
      ...filters,
      search: searchQuery
    };
    
    return await this.getItems(allFilters);
  }
}

export default new ItemService();
