import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';

function App() {
  const [history, setHistory] = useState([
    { id: 'h1', text: 'How to say welcome?' },
    { id: 'h2', text: 'Translate: Good morning' }
  ]);
  const [viewState, setViewState] = useState('welcome');
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleNewChat = () => {
    setViewState('welcome');
    setMessages([]);
  };

  const handleHistoryItemClick = (item) => {
    setViewState('chatting');
    setMessages([
      { id: Date.now(), sender: 'user', text: item.text, mode: 'English to Garhwali' },
      { id: Date.now() + 1, sender: 'bot', text: `Loaded archive context for prompt: "${item.text}"` }
    ]);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0b1229] flex text-slate-100 font-sans antialiased">
      <Sidebar
        isOpen={isSidebarOpen}
        onNewChat={handleNewChat}
        onHistoryItemClick={handleHistoryItemClick}
        history={history}
      />
      <MainPanel 
        viewState={viewState} 
        setViewState={setViewState}
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