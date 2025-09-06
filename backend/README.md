# EcoSprout Backend API

A secure and scalable Node.js backend for the EcoSprout sustainable marketplace platform.

## 🚀 Features

- **Authentication & Security**: JWT-based authentication with bcrypt password hashing
- **Database**: MongoDB with Mongoose ODM
- **Security Middleware**: Helmet, CORS, Rate limiting
- **Validation**: Express-validator for input validation
- **Error Handling**: Centralized error handling middleware
- **Logging**: Morgan for HTTP request logging
- **Environment Configuration**: dotenv for environment variables

## 📁 Project Structure

```
backend/
├── controllers/           # Route controllers
│   ├── authController.js  # Authentication logic
│   └── itemController.js  # Item management logic
├── middlewares/           # Custom middleware
│   ├── auth.js           # JWT authentication middleware
│   └── errorHandler.js   # Global error handler
├── models/               # Database models
│   ├── User.js          # User schema
│   ├── Item.js          # Item schema
│   └── Transaction.js   # Transaction schema
├── routes/              # API routes
│   ├── auth.js         # Authentication routes
│   └── items.js        # Item routes
├── utils/              # Utility functions
├── app.js             # Express app configuration
├── server.js          # Server startup
├── db.js             # Database connection
└── .env.example      # Environment variables template
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecosprout
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For macOS with Homebrew
brew services start mongodb-community

# For Ubuntu/Debian
sudo systemctl start mongod

# For Windows
net start MongoDB
```

### 4. Run the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "John Smith",
  "phone": "+1234567890",
  "address": {
    "street": "456 Oak Ave",
    "city": "Boston",
    "state": "MA",
    "zipCode": "02101",
    "country": "USA"
  }
}
```

### Item Endpoints

#### Get All Items
```http
GET /api/items?category=electronics&condition=good&minPrice=50&maxPrice=500&city=Delhi&search=iPhone&page=1&limit=12
```

#### Get Single Item
```http
GET /api/items/:id
```

#### Create Item (Protected)
```http
POST /api/items
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "iPhone 12 Pro Max",
  "description": "Excellent condition iPhone with all accessories",
  "price": 599,
  "category": "electronics",
  "condition": "excellent",
  "images": [
    {
      "url": "https://example.com/image1.jpg",
      "publicId": "image1_id"
    }
  ],
  "location": {
    "address": "123 Tech Street",
    "city": "Bengaluru",
    "state": "Karnataka",
    "coordinates": {
      "latitude": 12.9716,
      "longitude": 77.5946
    }
  },
  "tags": ["smartphone", "apple", "ios"]
}
```

#### Update Item (Protected)
```http
PUT /api/items/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated iPhone 12 Pro Max",
  "price": 550
}
```

#### Delete Item (Protected)
```http
DELETE /api/items/:id
Authorization: Bearer <jwt_token>
```

#### Toggle Favorite (Protected)
```http
POST /api/items/:id/favorite
Authorization: Bearer <jwt_token>
```

#### Get My Items (Protected)
```http
GET /api/items/user/my-items?status=available&page=1&limit=10
Authorization: Bearer <jwt_token>
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds for password security
- **Rate Limiting**: Prevents brute force attacks
- **CORS**: Configured for frontend integration
- **Helmet**: Security headers for Express
- **Input Validation**: Comprehensive validation using express-validator
- **Error Handling**: Secure error responses without sensitive data leakage

## 🗄️ Database Models

### User Model
- Personal information (name, email, phone, address)
- Authentication (hashed password)
- Trust score and verification status
- Eco impact tracking (CO₂ saved, water saved, items rescued)
- Transaction history counters

### Item Model
- Product details (title, description, price, condition)
- Location and coordinates
- Eco score calculation
- Image management
- Favorites and views tracking
- Search indexing

### Transaction Model
- Buyer and seller references
- Payment and meeting details
- Rating system
- Eco impact tracking
- Status management

## 🌱 Eco Impact Calculation

The system automatically calculates environmental impact:
- **Eco Score**: Based on item category and condition (0-10 scale)
- **CO₂ Saved**: Estimated carbon footprint reduction
- **Water Saved**: Estimated water conservation
- **Items Rescued**: Count of items diverted from waste

## 🚦 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "count": 10,
  "total": 100,
  "pagination": {
    "page": 1,
    "pages": 10
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

## 🔧 Development

### Available Scripts
```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Run tests (when implemented)
npm test
```

### Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRE`: JWT token expiration time
- `NODE_ENV`: Environment (development/production)

## 🚀 Deployment

### Production Checklist
1. Set strong `JWT_SECRET` in production
2. Use MongoDB Atlas or secure MongoDB instance
3. Set `NODE_ENV=production`
4. Configure proper CORS origins
5. Set up SSL/HTTPS
6. Configure reverse proxy (nginx)
7. Set up monitoring and logging

### Docker Deployment (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy coding! 🌱**
