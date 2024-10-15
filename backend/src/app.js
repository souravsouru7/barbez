const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws'); // Make sure to install this package
const WebSocketService = require('./infrastructure/external-services/WebSocketService');

const app = express();
const server = http.createServer(app);

// Initialize WebSocket server
const webSocketService = new WebSocketService(server);
global.webSocketService = webSocketService;
app.set('webSocketService', webSocketService);

// Import routes
const shopkeeperRoutes = require('./interfaces/routes/ShopkeeperRoutes');
const initializeAdmin = require('./infrastructure/db/initializeAdmin');
const adminRoutes = require('./interfaces/routes/adminRoutes');
const shopRoutes = require('./interfaces/routes/ShopRoutes');
const bookingRoutes = require('./interfaces/routes/bookingRoutes');
const paymentRoutes = require('./interfaces/routes/paymentRoutes');
const SlotRoutes = require('./interfaces/routes/slotRoutes');
const UserRoutes = require("./interfaces/routes/UserRoutes");
const createChatRouter = require("./interfaces/routes/chatRoutes");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());

// Database connection
const dbUri = process.env.DB_URI;
mongoose.connect(dbUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', require('./interfaces/routes/authRoutes'));
app.use('/api/shopkeepers', shopkeeperRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/slots', SlotRoutes);
app.use('/api/chat', createChatRouter(webSocketService));
app.use('/api', UserRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));