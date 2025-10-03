
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import socket from './socket';
import ChatWidget from './components/ChatWidget';


export default function App() {
  useEffect(() => {
    // Example: Listen for admin dashboard events
    socket.on('admin:onlineUsers', (count) => {
      // You can update state/UI for online users here
      console.log('Online users:', count);
    });
    socket.on('admin:activity', (data) => {
      // You can show activity notifications here
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
