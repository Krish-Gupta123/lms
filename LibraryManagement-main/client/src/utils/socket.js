import { io } from 'socket.io-client';

// Smart URL detection
const getSocketURL = () => {
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isDevelopment ? "http://localhost:8080" : "https://lms-backend-2s98.onrender.com";
};

let socket = null;

export const initializeSocket = () => {
  if (!socket) {
    const SOCKET_URL = getSocketURL();
    console.log('🔌 Connecting to:', SOCKET_URL);
    
    socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('✅ Connected to server via WebSocket');
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error);
    });
  }
  return socket;
};

export const getSocket = () => {
  return socket;
};