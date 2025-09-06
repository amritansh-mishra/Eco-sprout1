import apiService from './api.js';

class VerificationService {
  // Initiate DigiLocker verification
  async initiateDigiLockerVerification(documentType) {
    return apiService.post('/verification/digilocker/initiate', { documentType });
  }

  // Complete DigiLocker verification
  async completeDigiLockerVerification(code, state) {
    return apiService.post('/verification/digilocker/complete', { code, state });
  }

  // Get verification status
  async getVerificationStatus() {
    return apiService.get('/verification/status');
  }

  // Update seller profile
  async updateSellerProfile(profileData) {
    return apiService.put('/verification/seller-profile', profileData);
  }
}

export const verificationService = new VerificationService();
