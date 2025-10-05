// src/components/ChatWidget.js

import { useState, useEffect, useRef } from 'react';
import socket from 'socket.io-client';

const BOT_OPTIONS = [
  { label: 'What can I do here?', value: 'features' },
  { label: 'How to issue/return a book?', value: 'issue' },
  { label: 'How to contact admin?', value: 'contact' },
  { label: 'Show me live stats features', value: 'stats' },
];

function getBotResponse(option) {
  switch (option) {
    case 'features':
      return 'You can search, issue, return, and reserve books, see your borrowals, and get real-time updates!';
    case 'issue':
      return 'To issue or return a book, go to the Books section, select a book, and click Issue or Return. Availability updates instantly.';
    case 'contact':
      return 'You can contact the admin via the Users section or use this chat for quick help.';
    case 'stats':
      return 'The admin dashboard shows live stats: currently issued books, students online, and latest activity.';
    default:
      return "Sorry, I didn't understand. Please choose an option or type your question.";
  }
}


export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { text: 'Hi! I am your Library Assistant. Choose an option or ask a question.', time: new Date().toLocaleTimeString(), bot: true }
  ]);
  const [input, setInput] = useState('');
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('chat:message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off('chat:message');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, minimized]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMsg = { text: input, time: new Date().toLocaleTimeString() };
      socket.emit('chat:message', userMsg);
      // Bot auto-response for known options
      const matched = BOT_OPTIONS.find(opt => input.toLowerCase().includes(opt.value));
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: getBotResponse(matched?.value), time: new Date().toLocaleTimeString(), bot: true }]);
      }, 600);
      setInput('');
    }
  };

  const handleOption = (opt) => {
    const userMsg = { text: opt.label, time: new Date().toLocaleTimeString() };
    socket.emit('chat:message', userMsg);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getBotResponse(opt.value), time: new Date().toLocaleTimeString(), bot: true }]);
    }, 600);
  };

  if (minimized) {
    return (
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
        <button onClick={() => setMinimized(false)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: '50%', width: 48, height: 48, fontSize: 24, cursor: 'pointer', boxShadow: '0 2px 8px #0002' }} title="Open chat">💬</button>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, width: 320, background: '#fff', border: '1px solid #ccc', borderRadius: 8, boxShadow: '0 2px 8px #0002', zIndex: 1000 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
        <span>Library Chat</span>
        <button onClick={() => setMinimized(true)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#888' }} title="Minimize">_</button>
      </div>
      <div style={{ height: 200, overflowY: 'auto', padding: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8, textAlign: msg.bot ? 'left' : 'right' }}>
            <span style={{ color: '#888', fontSize: 12 }}>{msg.time} </span>
            <span style={{ color: msg.bot ? '#1976d2' : '#222' }}>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: 8 }}>
        {BOT_OPTIONS.map(opt => (
          <button key={opt.value} onClick={() => handleOption(opt)} style={{ background: '#f5f5f5', border: '1px solid #ddd', borderRadius: 4, padding: '2px 8px', cursor: 'pointer', fontSize: 12 }}>{opt.label}</button>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', borderTop: '1px solid #eee' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, border: 'none', padding: 8, outline: 'none' }}
        />
        <button type="submit" style={{ border: 'none', background: '#1976d2', color: '#fff', padding: '0 16px', cursor: 'pointer' }}>Send</button>
      </form>
    </div>
  );
}
