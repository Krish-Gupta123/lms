import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { getSocket, initializeSocket } from './utils/socket';
import ChatWidget from './components/ChatWidget';

// Socket initialize karo
initializeSocket();

export default function App() {
  useEffect(() => {
    const socket = getSocket(); // Yahan se socket lo
    
    // Example: Listen for admin dashboard events
    socket.on('admin:onlineUsers', (count) => {
      console.log('Online users:', count);
    });
    
    socket.on('admin:activity', (data) => {
      console.log('Activity:', data);
    });

    return () => {
      socket.off('admin:onlineUsers');
      socket.off('admin:activity');
    };
  }, []);

  return (
    <ThemeProvider>
      <div><Toaster/></div>
      <ScrollToTop/>
      <Router/>
      <ChatWidget />
    </ThemeProvider>
  );
}