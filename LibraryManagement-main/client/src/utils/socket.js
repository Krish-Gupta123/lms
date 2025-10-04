import { io } from 'socket.io-client';
import { SOCKET_URL } from '../config';

let socket = null;

export const initializeSocket = () => {
  if (!socket) {
    console.log('🔌 Connecting to Socket:', SOCKET_URL);
    
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