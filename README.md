# QuickDev - On-Demand Developer Consultation Platform

QuickDev is a web application that connects founders with expert developers for on-demand coding sessions.Founders can connect with there potential tech cofounders and get their help in building their product.

## 🚀 Features

### For Founders
- Browse developers by expertise and ratings
- Manage upcoming and past bookings
- Rate and review developers after sessions


### For Developers
- Comprehensive dashboard with earnings, bookings, and ratings
- Manage your availability status
- Accept instant or scheduled sessions
- Review past sessions and customer history

## 💻 Tech Stack

### Frontend
- **Framework**: Next.js (React)
- **Styling**: TailwindCSS with Radix UI components
- **State Management**: React Hooks
- **Authentication**: JWT
- **API Communication**: Fetch API
- **Form Handling**: React Hook Form with Zod validation
- **Code Editor**: Monaco Editor
- **Notifications**: React Hot Toast
- **Wallet Integration**: Solana Wallet Adapter and Ethers.js

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Real-time Communication**: Socket.io
- **Payment Processing**: Stripe
- **Environment Variables**: dotenv
- **Authentication**: JWT

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation and Setup

#### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   ```

4. Seed the database (optional):
   ```
   npm run seed
   ```

5. Start the development server:
   ```
   npm run dev
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Access the application at `http://localhost:3000`

## 📦 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Developers
- `GET /api/developers` - List all developers
- `GET /api/developers/:id` - Get developer details
- `GET /api/developers/profile` - Get current developer profile
- `PUT /api/developers/profile` - Update developer profile
- `GET /api/developers/stats` - Get developer statistics
- `GET /api/developers/bookings` - Get developer bookings

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/status` - Update booking status

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
