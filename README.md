# EcoSprout 🌱

**A Sustainable Marketplace for the Circular Economy**

*Empowering communities to buy, sell, and trade pre-owned items while building trust and reducing environmental impact.*

---

## 🎯 Vision & Mission

### Vision
To create a trusted, sustainable marketplace that transforms how people interact with pre-owned goods, fostering a circular economy where every transaction contributes to environmental preservation and community building.

### Mission
EcoSprout bridges the gap between sustainability and commerce by providing a secure, trust-based platform where users can:
- **Buy & Sell** pre-owned items with confidence
- **Build Trust** through verified profiles and community ratings
- **Track Impact** with real-time environmental metrics
- **Earn Rewards** through eco-points and achievement badges

---

## 🏆 Hackathon Highlights

### Problem Statement
Traditional marketplaces lack trust mechanisms and environmental awareness, leading to:
- Hesitation in buying pre-owned items
- Lack of transparency in seller credibility
- No visibility into environmental impact
- Limited incentives for sustainable behavior

### Our Solution
EcoSprout addresses these challenges through:
- **DigiLocker Integration** for identity verification
- **Trust Score System** based on transaction history
- **Environmental Impact Tracking** (CO₂ saved, water conserved)
- **Gamification** with eco-points and achievement badges
- **Secure Escrow System** for safe transactions

### Key Innovations
1. **Trust-First Design** - Every feature builds user confidence
2. **Environmental Consciousness** - Real-time impact visualization
3. **Community Gamification** - Rewards for sustainable behavior
4. **Seamless UX** - Modern, intuitive interface with smooth animations

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)


1. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run dev
   ```

2. **Frontend Setup** (new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:5000/api
   - Backend Health: http://localhost:5000/api/health

---

## 🏗️ Architecture & Workflow

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Express Backend │    │   MongoDB       │
│   (Port: 5174)   │◄──►│   (Port: 5000)   │◄──►│   Database      │
│                 │    │                 │    │                 │
│ • User Interface │    │ • REST APIs     │    │ • User Data     │
│ • State Mgmt    │    │ • Authentication│    │ • Items Data    │
│ • Service Layer │    │ • Business Logic│    │ • Transactions  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### User Workflow
1. **Registration/Login** → Identity verification via DigiLocker
2. **Profile Setup** → Build trust score through verification
3. **Browse Marketplace** → Discover items with trust indicators
4. **List Items** → Create listings with environmental impact
5. **Secure Transactions** → Escrow-protected purchases
6. **Build Reputation** → Earn eco-points and badges

### Technical Workflow
1. **Frontend** sends requests via service layer
2. **Backend** validates, processes, and responds
3. **Database** stores user data, items, and transactions
4. **Real-time updates** through optimistic UI updates

---

## 📁 Project Structure

```
EcoSprout-1/
├── 📁 backend/                 # Node.js/Express API Server
│   ├── 📁 controllers/         # Request handlers
│   │   ├── authController.js   # Authentication logic
│   │   ├── itemController.js   # Item management
│   │   └── verificationController.js # DigiLocker integration
│   ├── 📁 middlewares/         # Custom middleware
│   │   ├── auth.js            # JWT authentication
│   │   ├── errorHandler.js    # Error handling
│   │   └── roleAuth.js        # Role-based access
│   ├── 📁 models/             # MongoDB schemas
│   │   ├── User.js            # User model
│   │   ├── Item.js            # Item model
│   │   └── Transaction.js     # Transaction model
│   ├── 📁 routes/             # API routes
│   │   ├── auth.js            # Auth endpoints
│   │   ├── items.js           # Item endpoints
│   │   └── verification.js    # Verification endpoints
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   └── package.json           # Backend dependencies
│
├── 📁 frontend/               # React Application
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable UI components
│   │   │   ├── DigiLockerVerification.jsx
│   │   │   ├── ItemCard.jsx
│   │   │   ├── TrustBadge.jsx
│   │   │   └── ...
│   │   ├── 📁 pages/          # Main application pages
│   │   │   ├── Dashboard.jsx  # User dashboard
│   │   │   ├── Marketplace.jsx # Item browsing
│   │   │   ├── CreateItem.jsx # Item creation
│   │   │   └── ...
│   │   ├── 📁 contexts/       # React Context providers
│   │   │   ├── UserContext.jsx # User state management
│   │   │   └── ItemContext.jsx # Item state management
│   │   ├── 📁 services/       # API service layer
│   │   │   ├── api.js         # HTTP client
│   │   │   ├── authService.js # Authentication API
│   │   │   └── itemService.js # Item management API
│   │   ├── 📁 assets/         # Static assets
│   │   └── App.jsx            # Main app component
│   ├── package.json           # Frontend dependencies
│   └── tailwind.config.js     # Tailwind CSS config
│
├── .gitignore                 # Git ignore rules
├── README.md                  # This documentation
└── INTEGRATION.md             # Technical integration guide
```

---

## 🔧 Key Features

### 🛡️ Trust & Security
- **DigiLocker Integration** - Government-verified identity
- **Trust Score System** - Dynamic reputation based on transactions
- **Secure Escrow** - Protected payment processing
- **JWT Authentication** - Secure session management

### 🌱 Environmental Impact
- **CO₂ Tracking** - Real-time carbon footprint reduction
- **Water Conservation** - Environmental impact visualization
- **Sustainability Metrics** - Personal and community impact

### 🎮 Gamification
- **Eco-Points System** - Rewards for sustainable actions
- **Achievement Badges** - Community recognition
- **Progress Tracking** - Visual goal achievement
- **Leaderboards** - Community engagement

### 💻 Modern UI/UX
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Enhanced user experience
- **Intuitive Navigation** - User-friendly interface
- **Real-time Updates** - Instant feedback and notifications

---

## 🧪 Testing & Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Development Mode
```bash
# Start both servers concurrently
npm run dev:all

# Or start individually
cd backend && npm run dev
cd frontend && npm run dev
```

### API Testing
Use the included Postman collection or test endpoints directly:
```bash
# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

---

## 🌟 Hackathon Demo Flow

### Demo Scenario: "Sarah's Sustainable Journey"

1. **Registration** (30 seconds)
   - Sarah signs up with email
   - Completes DigiLocker verification
   - Trust score initialized

2. **Profile Setup** (45 seconds)
   - Uploads profile picture
   - Sets sustainability preferences
   - Views environmental impact dashboard

3. **Listing Creation** (60 seconds)
   - Lists vintage leather jacket
   - Sets price and description
   - Views predicted environmental impact

4. **Marketplace Browsing** (45 seconds)
   - Discovers MacBook Pro listing
   - Checks seller's trust score
   - Reviews environmental benefits

5. **Secure Purchase** (90 seconds)
   - Initiates escrow transaction
   - Scans QR code for payment
   - Receives purchase confirmation

6. **Impact Celebration** (30 seconds)
   - Views updated eco-points
   - Unlocks "Eco Warrior" badge
   - Shares environmental impact

**Total Demo Time: 5 minutes**

---

## 🚀 Deployment

### Environment Configuration
```bash
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecosprout
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=production

# Frontend (.env)
VITE_API_URL=https://your-api-domain.com/api
VITE_APP_NAME=EcoSprout
```

### Production Deployment
1. **Backend**: Deploy to Heroku, Railway, or DigitalOcean
2. **Frontend**: Deploy to Vercel, Netlify, or AWS S3
3. **Database**: MongoDB Atlas for cloud database
4. **Domain**: Configure custom domain and SSL

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🏆 Hackathon Team

**EcoSprout Team** - Building a sustainable future, one transaction at a time.

*Made with ❤️ for a greener tomorrow*

---

## 📞 Support

For questions, issues, or demo requests:
- 📧 Email: team@ecosprout.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/ecosprout/issues)
- 💬 Discord: [Join our community](https://discord.gg/ecosprout)

---

**🌱 Every transaction plants a seed for a sustainable future 🌱**
