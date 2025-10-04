// Smart configuration - auto detects environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const API_BASE_URL = isDevelopment 
  ? "http://localhost:8080"  // Local development
  : "https://lms-backend-2s98.onrender.com"; // Production

const SOCKET_URL = isDevelopment 
  ? "http://localhost:8080"  // Local development  
  : "https://lms-backend-2s98.onrender.com"; // Production

export { API_BASE_URL, SOCKET_URL };