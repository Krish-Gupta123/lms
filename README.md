# 📚 Library Management System (LMS)

A comprehensive **full-stack library management web application** built with the **MERN stack** (MongoDB, Express, React, Node.js) featuring real-time WebSocket communication for AI chatbots, notifications, and live admin dashboards.

🌐 **Live Demo**: [https://lms-cyan-ten.vercel.app](https://lms-cyan-ten.vercel.app)

---

## ✨ Key Features

### 👨‍💼 **Admin Panel**
- 📖 **Book Management** - Add, edit, delete books with metadata (ISBN, publication date, genres, authors)
- 👤 **User Management** - Manage student/member accounts, roles, and permissions
- 👨‍✍️ **Author Management** - Maintain author records
- 📂 **Genre Classification** - Organize books by genres
- 🔄 **Borrowal/Return Management** - Track book borrowings, returns, and due dates
- 📊 **Real-time Dashboard** - Live activity tracking via WebSocket
- 📈 **Analytics** - View borrowing statistics and system usage metrics

### 🎓 **Student Panel**
- 🔍 **Search & Browse** - Discover books by title, author, genre, or ISBN
- 📚 **View Books** - Detailed book information including availability status
- 🔖 **Request Books** - Submit borrowing requests to admin
- 📋 **View Borrowals** - Check personal borrowing history and due dates
- ⭐ **Reviews & Ratings** - Rate and review books (coming soon)
- 💬 **AI Chat Support** - Real-time assistance via AI chatbot

### 🔐 **Authentication & Security**
- 🛡️ **JWT Authentication** - Secure token-based authentication
- 🔒 **Password Encryption** - bcryptjs hashing for secure passwords
- 👥 **Role-Based Access Control (RBAC)** - Admin and Student roles
- 🚪 **Session Management** - Persistent user sessions
- 🔑 **Passport.js Integration** - Flexible authentication strategies

### 💬 **Real-time Communication**
- 🔌 **WebSocket Support** - Socket.io for real-time messaging
- 🤖 **AI Chatbot** - Real-time chat assistance with AI responses
- 📢 **Live Notifications** - Instant notifications for approvals, rejections, and activity
- 👥 **Online Status** - See who's currently online (admin dashboard)
- 📊 **Real-time Activity Feed** - Live updates of system activities

### 🎨 **User Interface**
- 📱 **Responsive Design** - Mobile-friendly interface with Material-UI
- 🎭 **Modern UI/UX** - Clean and intuitive dashboard layouts
- 📊 **Data Visualization** - Charts and graphs for analytics
- ⚡ **Fast Performance** - Optimized rendering and lazy loading

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI library with hooks
- **Material-UI (MUI)** - Component library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Socket.io-client** - Real-time WebSocket communication
- **React Hot Toast** - Toast notifications
- **React Hook Form** - Form management
- **ApexCharts** - Data visualization

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time bidirectional communication
- **JWT** - Token-based authentication
- **Passport.js** - Authentication middleware
- **bcryptjs** - Password hashing
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
lms/
├── LibraryManagement-main/
│   ├── client/                      # React frontend
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   └── assets/
│   │   ├── src/
│   │   │   ├── components/          # Reusable React components
│   │   │   ├── sections/
│   │   │   │   ├── @dashboard/     # Admin dashboard pages
│   │   │   │   │   ├── app/
│   │   │   │   │   ├── author/
│   │   │   │   │   ├── book/
│   │   │   │   │   ├── borrowal/
│   │   │   │   │   ├── genre/
│   │   │   │   │   └── user/
│   │   │   │   └── auth/           # Authentication pages
│   │   │   │       └── login/
│   │   │   ├── hooks/              # Custom React hooks
│   │   │   ├── utils/              # Utility functions
│   │   │   ├── App.jsx             # Main app component
│   │   │   ├── index.js            # React entry point
│   │   │   ├── routes.js           # Route definitions
│   │   │   └── constants.js        # App constants
│   │   ├── package.json
│   │   └── .env.local
│   │
│   ├── server/                      # Express backend
│   │   ├── controllers/             # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── bookController.js
│   │   │   ├── authorController.js
│   │   │   ├── borrowalController.js
│   │   │   ├── genreController.js
│   │   │   ├── userController.js
│   │   │   ├── reviewController.js
│   │   │   └── borrowRequestController.js
│   │   ├── models/                 # Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Book.js
│   │   │   ├── Author.js
│   │   │   ├── Genre.js
│   │   │   ├── Borrowal.js
│   │   │   ├── Review.js
│   │   │   └── BorrowRequest.js
│   │   ├── routes/                 # API routes
│   │   │   ├── authRouter.js
│   │   │   ├── bookRouter.js
│   │   │   ├── authorRouter.js
│   │   │   ├── borrowalRouter.js
│   │   │   ├── genreRouter.js
│   │   │   ├── userRouter.js
│   │   │   ├── reviewRouter.js
│   │   │   └── borrowRequestRouter.js
│   │   ├── middleware/              # Express middleware
│   │   │   ├── jwtAuth.js          # JWT verification
│   │   │   └── errorHandler.js
│   │   ├── index.js                # Express server entry point
│   │   ├── socket.js               # WebSocket setup
│   │   ├── passport-config.js      # Passport authentication
│   │   ├── config.js               # Configuration
│   │   ├── setAdmin.js             # Admin setup script
│   │   └── package.json
│   │
│   ├── package.json                # Root package.json
│   └── README.md
│
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14 or higher
- **npm** or **yarn**
- **MongoDB** Atlas account or local MongoDB instance
- **Git**
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Krish-Gupta123/lms.git
cd lms/LibraryManagement-main
```

#### 2️⃣ Setup Environment Variables

Create `.env` files in both `server` and `client` directories:

**`server/.env`**
```bash
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/library_db

# Server Configuration
PORT=8080
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_key_here

# Passport Configuration
PASSPORT_SECRET=your_passport_secret_key_here

# CORS Origins (for production)
FRONTEND_URL=http://localhost:3000
```

**`client/.env.local`**
```bash
REACT_APP_API_URL=http://localhost:8080
REACT_APP_SOCKET_URL=http://localhost:8080
```

#### 3️⃣ Install Dependencies

```bash
# Install all dependencies for both client and server
npm run install

# Or individually:
cd server && npm install
cd ../client && npm install
```

#### 4️⃣ Start the Application

```bash
# From root directory - starts both server and client
npm start

# Or run separately:
npm run server    # Terminal 1 - Backend runs on port 8080
npm run client    # Terminal 2 - Frontend runs on port 3000
```

#### 5️⃣ Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)
- **Health Check**: [http://localhost:8080/api/health](http://localhost:8080/api/health)

---

## 👤 Demo Accounts

### Admin Account
```
Email: testlibrarian@library.com
Password: librarian123
```

### Student Account
```
Email: testmember@library.com
Password: member123
```

---

## 🔌 WebSocket Events

### Real-time Communication

#### Server → Client Events
```javascript
// Online users count
'admin:onlineUsers' - Receives count of active users

// Activity updates
'admin:activity' - Receives real-time activity logs
  Example: { type: 'book_borrowed', userId, bookId, timestamp }

// Chat messages
'chat:message' - Receives incoming chat messages
  Example: { sender, message, timestamp, userId }
```

#### Client → Server Events
```javascript
// Activity tracking
socket.emit('activity', { type, userId, details })

// Chat messages
socket.emit('chat:message', { message, sender, timestamp })
```

---

## 🔐 Authentication Flow

### JWT Authentication
1. User submits login credentials
2. Server validates credentials and generates JWT token
3. Token stored in localStorage (client-side)
4. Token included in Authorization header for protected routes
5. Server validates token before processing requests

### Protected Routes
All API endpoints except `/api/auth/jwt-login` require:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/jwt-login` - User login
- `GET /api/auth/jwt-protected` - Check protected route

### Books
- `GET /api/book` - Get all books
- `GET /api/book/:id` - Get book details
- `POST /api/book` - Create book (Admin)
- `PUT /api/book/:id` - Update book (Admin)
- `DELETE /api/book/:id` - Delete book (Admin)

### Authors
- `GET /api/author` - Get all authors
- `POST /api/author` - Create author (Admin)
- `PUT /api/author/:id` - Update author (Admin)
- `DELETE /api/author/:id` - Delete author (Admin)

### Genres
- `GET /api/genre` - Get all genres
- `POST /api/genre` - Create genre (Admin)
- `DELETE /api/genre/:id` - Delete genre (Admin)

### Borrowals
- `GET /api/borrowal` - Get all borrowals
- `POST /api/borrowal` - Create borrowal (Admin)
- `PUT /api/borrowal/:id` - Update borrowal (Admin)
- `DELETE /api/borrowal/:id` - Delete borrowal (Admin)

### Users
- `GET /api/user` - Get all users (Admin)
- `GET /api/user/:id` - Get user details
- `PUT /api/user/:id` - Update user
- `DELETE /api/user/:id` - Delete user (Admin)

### Borrow Requests
- `GET /api/borrow-request` - Get all requests (Admin)
- `POST /api/borrow-request` - Create request (Student)
- `PUT /api/borrow-request/:id` - Approve/Reject request (Admin)

### Reviews
- `GET /api/review` - Get all reviews
- `POST /api/review` - Create review (Student)
- `DELETE /api/review/:id` - Delete review

---

## 🧪 Testing

### Test Health Check
```bash
curl http://localhost:8080/api/health
```

### Test JWT Authentication
```bash
# Login
curl -X POST http://localhost:8080/api/auth/jwt-login \
  -H "Content-Type: application/json" \
  -d '{"email":"testlibrarian@library.com","password":"librarian123"}'

# Use token for protected route
curl http://localhost:8080/api/auth/jwt-protected \
  -H "Authorization: Bearer <your_token>"
```

---

## 📦 Build & Deployment

### Build for Production

```bash
# Build frontend
cd client
npm run build

# Production backend
cd ../server
npm run start
```

### Deploy to Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from client directory
cd client
vercel
```

### Deploy to Render (Backend)
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Style
- Use ESLint for JavaScript/JSX
- Follow Prettier formatting
- Add comments for complex logic
- Write meaningful commit messages

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: DB connection error
→ Check MONGO_URI in .env
→ Ensure MongoDB cluster allows your IP
→ Verify username/password credentials
```

### CORS Errors
```
Error: Access to XMLHttpRequest blocked by CORS
→ Check CORS configuration in server/index.js
→ Ensure frontend URL is in allowed origins
→ Verify credentials: true in CORS options
```

### WebSocket Connection Failed
```
Error: WebSocket connection failed
→ Ensure server is running
→ Check socket.io configuration
→ Verify firewall allows WebSocket connections
```

### JWT Token Issues
```
Error: Invalid or expired token
→ Check TOKEN expiration time
→ Ensure token is included in Authorization header
→ Verify JWT_SECRET matches on server
```

---

## 📚 Resources

- [MERN Stack Guide](https://www.mongodb.com/languages/mern-stack)
- [Socket.io Documentation](https://socket.io/docs/v4/)
- [JWT Guide](https://jwt.io/)
- [Material-UI Components](https://mui.com/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.

---

## 👥 Authors

- **Krish Gupta** (Maintainer)
- Originally based on a RAD MERN project

---

## 🙏 Acknowledgments

- **Material-UI** - For the amazing component library
- **Socket.io** - For real-time WebSocket communication
- **MongoDB** - For the scalable database solution
- **Express.js** - For the robust server framework

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/Krish-Gupta123/lms/issues)
- **Email**: Contact via GitHub profile
- **Live Demo**: [https://lms-cyan-ten.vercel.app](https://lms-cyan-ten.vercel.app)

---

## 🔄 Version History

### v1.1.0 (Current)
- ✅ WebSocket integration for real-time chat
- ✅ JWT authentication system
- ✅ Admin and Student role-based access
- ✅ Real-time activity dashboard
- ✅ Book borrowing management
- ✅ User profile management
- ✅ Review system
- ✅ Material-UI responsive design

### v1.0.0
- Initial release with core CRUD operations

---

## 🚀 Roadmap

- [ ] AI Chatbot Integration (GPT-based)
- [ ] Email Notifications
- [ ] Advanced Search Filters
- [ ] Book Recommendation Engine
- [ ] Fine Management System
- [ ] Mobile App (React Native)
- [ ] Analytics Dashboard Export
- [ ] Multi-language Support
- [ ] Dark Mode
- [ ] Payment Integration

---

<div align="center">

**Made with ❤️ by Krish Gupta**

⭐ If you find this project useful, please consider giving it a star!

</div>
