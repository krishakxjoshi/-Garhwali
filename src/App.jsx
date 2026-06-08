import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [history, setHistory] = useState([
    { id: 'h1', text: 'How to say welcome?' },
    { id: 'h2', text: 'Translate: Good morning' }
  ]);

  const [messages, setMessages] = useState([]); // Must initialize as an empty array, not undefined
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Default state changed to false to load hidden/toggled off out of the box
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem('sidebar_open');
    return savedState !== null ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebar_open', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleHistoryItemClick = (item) => {
    setMessages([
      {
        id: Date.now(),
        sender: 'user',
        text: item.text,
        mode: 'English to Garhwali'
      },
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Loaded archive context for prompt: "${item.text}"`
      }
    ]);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0c0f14] flex text-slate-100 font-sans antialiased relative">
      <AnimatePresence mode="wait">
        <Sidebar
          isOpen={isSidebarOpen}
          onNewChat={handleNewChat}
          onHistoryItemClick={handleHistoryItemClick}
          history={history}
          isLoggedIn={isLoggedIn}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </AnimatePresence>

      <MainPanel
        messages={messages}
        setMessages={setMessages}
        setHistory={setHistory}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
}

export default App;