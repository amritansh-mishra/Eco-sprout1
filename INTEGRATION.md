# EcoSprout Frontend-Backend Integration Guide

## Overview
This document outlines the successful integration between the EcoSprout React frontend and Node.js/Express backend, including setup instructions, API endpoints, and testing procedures.

## Architecture

### Backend (Node.js/Express)
- **Port**: 5000
- **Database**: MongoDB (localhost:27017/ecosprout)
- **Authentication**: JWT with bcrypt password hashing
- **Security**: CORS, Rate limiting, Helmet, Input validation

### Frontend (React/Vite)
- **Port**: 5174
- **State Management**: React Context API
- **HTTP Client**: Fetch API with custom service layer
- **Authentication**: JWT token storage in localStorage


## API Integration

### Service Layer Architecture
The frontend uses a service layer pattern with three main services:

1. **API Service** (`src/services/api.js`)
   - Generic HTTP client with token management
   - Automatic token attachment for authenticated requests
   - Error handling and response formatting

2. **Auth Service** (`src/services/authService.js`)
   - User registration and login
   - Profile management
   - Token management

3. **Item Service** (`src/services/itemService.js`)
   - CRUD operations for marketplace items
   - Favorites management
   - Search and filtering

### Authentication Flow
1. User submits login/register form
2. Frontend calls backend API via authService
3. Backend validates credentials and returns JWT token
4. Frontend stores token in localStorage
5. Token automatically included in subsequent API requests
6. UserContext manages global authentication state

### Data Flow
1. Components consume data through React Context
2. Context providers use service layer for API calls
3. Services handle HTTP requests and error management
4. Backend processes requests and returns JSON responses
5. Frontend updates UI based on API responses

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Items
- `GET /api/items` - Get all items (with filtering)
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create new item (authenticated)
- `PUT /api/items/:id` - Update item (authenticated, owner only)
- `DELETE /api/items/:id` - Delete item (authenticated, owner only)
- `POST /api/items/:id/favorite` - Toggle item favorite (authenticated)
- `GET /api/items/user/:userId` - Get user's items

## Security Features

### Backend Security
- **CORS**: Configured for frontend origin (localhost:5174)
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet**: Security headers
- **Input Validation**: express-validator for request validation
- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth

### Frontend Security
- **Token Storage**: localStorage (consider httpOnly cookies for production)
- **Automatic Token Cleanup**: On logout and expired tokens
- **Input Sanitization**: Form validation and error handling

## Testing the Integration

### 1. Start Both Servers
```bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm run dev
```

### 2. Test Authentication
1. Navigate to http://localhost:5174
2. Click "Register" and create a new account
3. Verify successful registration and automatic login
4. Test logout functionality
5. Test login with created credentials

### 3. Test Item Management
1. Navigate to marketplace/browse
2. Verify items load from backend API
3. Test item creation (requires authentication)
4. Test item editing and deletion (owner only)
5. Test favorites functionality

### 4. Verify API Communication
- Check browser Network tab for API calls
- Verify CORS headers in responses
- Check backend console for request logs
- Test error handling (invalid credentials, network errors)

## Deployment Considerations

### Environment Variables
- Update CORS_ORIGIN for production domain
- Use secure JWT_SECRET (32+ characters)
- Configure production MongoDB URI
- Set NODE_ENV=production

### Security Enhancements
- Use httpOnly cookies instead of localStorage for tokens
- Implement refresh token rotation
- Add HTTPS in production
- Configure proper CORS for production domains
- Add request logging and monitoring

### Database
- Ensure MongoDB is properly configured
- Set up database indexes for performance
- Configure backup strategies
- Monitor database connections

## Troubleshooting

### Common Issues
1. **CORS Errors**: Verify CORS_ORIGIN matches frontend URL
2. **Authentication Failures**: Check JWT_SECRET consistency
3. **Database Connection**: Ensure MongoDB is running
4. **Port Conflicts**: Verify ports 5000 and 5174 are available

### Debug Steps
1. Check browser console for frontend errors
2. Check backend console for server errors
3. Verify environment variables are loaded
4. Test API endpoints directly with curl/Postman
5. Check network requests in browser DevTools

## Success Metrics
✅ Frontend and backend servers running successfully
✅ CORS configured for frontend-backend communication
✅ Authentication flow working (register/login/logout)
✅ Item management integrated with backend APIs
✅ Error handling implemented throughout the stack
✅ Environment configuration properly set up
✅ Security measures implemented and tested

The EcoSprout application is now fully integrated with a secure, scalable architecture ready for further development and deployment.
